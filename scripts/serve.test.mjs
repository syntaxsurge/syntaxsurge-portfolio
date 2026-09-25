import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  cpSync,
  rmSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { createServer } from "node:net";
import { setTimeout as sleep } from "node:timers/promises";

const script = resolve("scripts/serve.mjs");
const processes = new Set();
const git = (cwd, ...args) =>
  execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const fakeServer = `import {createServer} from 'node:http'; import {readFileSync,writeFileSync} from 'node:fs';
if(readFileSync('version','utf8')==='bad-start') process.exit(1);
const server=createServer((req,res)=>res.end(readFileSync('version','utf8')));
server.listen(Number(process.argv[process.argv.indexOf('--port')+1]),'127.0.0.1');
process.on('SIGTERM',()=>{writeFileSync('stopped','yes');server.close(()=>process.exit(0));});
`;
async function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "portfolio-serve-"));
  const source = join(dir, "source");
  const remote = join(dir, "remote.git");
  const state = join(dir, "runtime");
  const bin = join(dir, "bin");
  mkdirSync(source);
  mkdirSync(bin);
  mkdirSync(join(source, "scripts"));
  cpSync(script, join(source, "scripts/serve.mjs"));
  writeFileSync(
    join(source, "package.json"),
    JSON.stringify({ type: "module" }),
  );
  writeFileSync(join(source, "pnpm-lock.yaml"), "lockfileVersion: 9\n");
  writeFileSync(join(source, "version"), "one");
  writeFileSync(join(source, ".gitignore"), ".env*\n");
  writeFileSync(
    join(source, ".env.local"),
    "SITE_URL=https://syntaxsurge.com\n",
  );
  writeFileSync(join(source, "fake-next.mjs"), fakeServer);
  writeFileSync(
    join(bin, "pnpm"),
    `#!${process.execPath}\nimport {mkdirSync,writeFileSync,readFileSync,copyFileSync,appendFileSync} from 'node:fs';
appendFileSync(process.env.INSTALL_LOG,process.argv.slice(2).join(' ')+'\\n');
const version=readFileSync('version','utf8');
if(process.argv[2]==='install'){
 if(version==='bad-install')process.exit(1);
 mkdirSync('node_modules/next/dist/bin',{recursive:true});
 writeFileSync('node_modules/next/package.json','{"type":"module"}');
 copyFileSync('fake-next.mjs','node_modules/next/dist/bin/next');
}else{
 if(version==='bad-build')process.exit(1);
 mkdirSync('.next',{recursive:true});writeFileSync('.next/BUILD_ID',version);
}
`,
    { mode: 0o755 },
  );
  git(source, "init", "-b", "main");
  git(source, "config", "user.email", "test@example.invalid");
  git(source, "config", "user.name", "Startup test");
  git(source, "add", ".");
  git(source, "commit", "-m", "Initial fixture");
  git(dir, "init", "--bare", remote);
  git(source, "remote", "add", "origin", remote);
  git(source, "push", "origin", "main");
  const port = await new Promise((res, rej) => {
    const probe = createServer();
    probe.on("error", rej);
    probe.listen(0, "127.0.0.1", () => {
      const port = probe.address().port;
      probe.close(() => res(port));
    });
  });
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env.PATH}`,
    PORT: String(port),
    PORTFOLIO_DEPLOY_DIR: state,
    INSTALL_LOG: join(dir, "commands"),
  };
  delete env.SITE_URL;
  t.after(async () => {
    for (const child of processes) await stop(child);
    rmSync(dir, { recursive: true, force: true });
  });
  return {
    dir,
    source,
    state,
    env,
    port,
    update(version) {
      writeFileSync(join(source, "version"), version);
      git(source, "add", "version");
      git(source, "commit", "-m", version);
      git(source, "push", "origin", "main");
    },
    start() {
      return start(source, env);
    },
    history() {
      return JSON.parse(readFileSync(join(state, "releases.json"), "utf8"));
    },
  };
}
function start(source, env) {
  const child = spawn(process.execPath, ["scripts/serve.mjs"], {
    cwd: source,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  processes.add(child);
  child.logs = "";
  child.stdout.on("data", (data) => {
    child.logs += data;
  });
  child.stderr.on("data", (data) => {
    child.logs += data;
  });
  child.done = new Promise((res) =>
    child.on("close", (code) => {
      processes.delete(child);
      res(code);
    }),
  );
  return child;
}
async function waitFor(child, expected) {
  for (let i = 0; i < 300; i++) {
    if (child.logs.includes(expected)) return;
    if (child.exitCode !== null) break;
    await sleep(50);
  }
  assert.fail(`Did not see "${expected}".\n${child.logs}`);
}
async function stop(child) {
  if (child.exitCode !== null || child.signalCode !== null) return child.done;
  child.kill("SIGTERM");
  let timer;
  try {
    return await Promise.race([
      child.done,
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          child.kill("SIGKILL");
          reject(new Error("Supervisor did not stop."));
        }, 15_000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

test("fetches pinned commits, reuses completed builds, promotes only healthy releases, and forwards shutdown", async (t) => {
  const f = await fixture(t);
  let child = f.start();
  await waitFor(child, "Serving");
  const first = f.history()[0];
  assert.equal(
    readFileSync(join(f.state, "releases", first, "version"), "utf8"),
    "one",
  );
  assert.equal(existsSync(join(f.state, "releases", first, ".git")), false);
  assert.match(
    readFileSync(join(f.dir, "commands"), "utf8"),
    /install --frozen-lockfile --prod=false/,
  );
  await stop(child);
  assert.equal(existsSync(join(f.state, "serve.lock")), false);
  assert.equal(
    readFileSync(join(f.state, "releases", first, "stopped"), "utf8"),
    "yes",
  );
  child = f.start();
  await waitFor(child, "Serving");
  assert.match(child.logs, /Reusing completed release/);
  await stop(child);
  f.update("two");
  child = f.start();
  await waitFor(child, "Serving");
  assert.equal(f.history().length, 2);
  assert.equal(f.history()[1], first);
  assert.equal(
    readFileSync(join(f.state, "releases", f.history()[0], "version"), "utf8"),
    "two",
  );
  await stop(child);
  f.update("three");
  child = f.start();
  await waitFor(child, "Serving");
  await stop(child);
  assert.equal(readdirSync(join(f.state, "releases")).length, 2);
});
for (const failure of ["bad-install", "bad-build", "bad-start"]) {
  test(`${failure} preserves the last healthy release`, async (t) => {
    const f = await fixture(t);
    let child = f.start();
    await waitFor(child, "Serving");
    const good = f.history()[0];
    await stop(child);
    f.update(failure);
    child = f.start();
    await waitFor(child, "DEGRADED");
    assert.equal(f.history()[0], good);
    assert.equal(
      readFileSync(join(f.state, "releases", good, "version"), "utf8"),
      "one",
    );
    await stop(child);
  });
}
test("unreachable Git remote falls back without rewriting source or release", async (t) => {
  const f = await fixture(t);
  let child = f.start();
  await waitFor(child, "Serving");
  const good = f.history()[0];
  await stop(child);
  git(f.source, "remote", "set-url", "origin", join(f.dir, "missing.git"));
  writeFileSync(join(f.source, "version"), "local uncommitted changes");
  child = f.start();
  await waitFor(child, "DEGRADED");
  assert.equal(f.history()[0], good);
  assert.equal(
    readFileSync(join(f.source, "version"), "utf8"),
    "local uncommitted changes",
  );
  await stop(child);
});
test("first deployment fails closed when no valid build exists", async (t) => {
  const f = await fixture(t);
  f.update("bad-build");
  const child = f.start();
  assert.equal(await child.done, 1);
  assert.match(child.logs, /No healthy release/);
  assert.equal(existsSync(join(f.state, "releases.json")), false);
});
test("concurrent starts cannot steal the live supervisor lock", async (t) => {
  const f = await fixture(t);
  const first = f.start();
  await waitFor(first, "Serving");
  const second = f.start();
  assert.equal(await second.done, 1);
  assert.match(second.logs, /already running/);
  assert.equal(
    JSON.parse(readFileSync(join(f.state, "serve.lock"), "utf8")).pid,
    first.pid,
  );
  await stop(first);
});
test("stale locks recover but invalid locks fail closed", async (t) => {
  const f = await fixture(t);
  mkdirSync(f.state);
  writeFileSync(
    join(f.state, "serve.lock"),
    JSON.stringify({ pid: 2147483647, token: "stale" }),
  );
  let child = f.start();
  await waitFor(child, "Serving");
  assert.match(child.logs, /Recovered a stale/);
  await stop(child);
  writeFileSync(join(f.state, "serve.lock"), "invalid");
  child = f.start();
  assert.equal(await child.done, 1);
  assert.match(child.logs, /Invalid startup lock/);
});
test("an occupied port fails without terminating the existing listener", async (t) => {
  const f = await fixture(t);
  const unrelated = createServer();
  await new Promise((res) => unrelated.listen(f.port, "127.0.0.1", res));
  try {
    const child = f.start();
    assert.equal(await child.done, 1);
    assert.match(child.logs, /already occupied/);
    assert.equal(unrelated.listening, true);
  } finally {
    await new Promise((res) => unrelated.close(res));
  }
});

test("deployment variables in .env.local are read before choosing runtime and port", async (t) => {
  const f = await fixture(t);
  delete f.env.PORT;
  delete f.env.PORTFOLIO_DEPLOY_DIR;
  writeFileSync(
    join(f.source, ".env.local"),
    `SITE_URL=https://syntaxsurge.com\nPORT=${f.port}\nPORTFOLIO_DEPLOY_DIR=${f.state}\n`,
  );
  const child = f.start();
  await waitFor(child, "Serving");
  assert.match(child.logs, new RegExp(`127\\.0\\.0\\.1:${f.port}`));
  assert.equal(f.history().length, 1);
  await stop(child);
});

test("a failed update cannot fall back to a build with a different environment", async (t) => {
  const f = await fixture(t);
  let child = f.start();
  await waitFor(child, "Serving");
  const good = f.history()[0];
  await stop(child);
  f.update("bad-build");
  writeFileSync(
    join(f.source, ".env.local"),
    "SITE_URL=https://preview.example.invalid\n",
  );
  child = f.start();
  assert.equal(await child.done, 1);
  assert.match(child.logs, /No healthy release/);
  assert.doesNotMatch(child.logs, /DEGRADED/);
  assert.equal(f.history()[0], good);
  assert.equal(existsSync(join(f.state, "releases", good, ".built")), true);
});
