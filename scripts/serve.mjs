#!/usr/bin/env node
// Foreground aaPanel entry point. Updates are built separately from the last good release.
import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  renameSync,
  readdirSync,
  statSync,
} from "node:fs";
import { get } from "node:http";
import { createServer } from "node:net";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnvironment();
const state = resolve(
  process.env.PORTFOLIO_DEPLOY_DIR ||
    resolve(root, "..", ".syntaxsurge-portfolio-deploy"),
);
const releases = join(state, "releases");
const lock = join(state, "serve.lock");
const owner = { pid: process.pid, token: randomUUID() };
const port = Number(process.env.PORT || 3101);
const host = "127.0.0.1";
const children = new Set();
let stopping = false;
let locked = false;
const log = (message) => console.log(`[portfolio] ${message}`);
const pause = (ms) => new Promise((done) => setTimeout(done, ms));

function signal(child, name = "SIGTERM") {
  if (!child.pid) return;
  try {
    process.kill(process.platform === "win32" ? child.pid : -child.pid, name);
  } catch {
    /* The child has already stopped. */
  }
}
function stopChildren(name = "SIGTERM") {
  stopping = true;
  for (const child of children) signal(child, name);
  const timer = setTimeout(() => {
    for (const child of children) signal(child, "SIGKILL");
  }, 10_000);
  timer.unref();
}
process.on("SIGTERM", () => stopChildren());
process.on("SIGINT", () => stopChildren("SIGINT"));

function takeLock() {
  mkdirSync(releases, { recursive: true, mode: 0o700 });
  try {
    writeFileSync(lock, JSON.stringify(owner), { flag: "wx", mode: 0o600 });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    let previous;
    try {
      previous = JSON.parse(readFileSync(lock, "utf8"));
    } catch {
      throw new Error(
        `Invalid startup lock; inspect ${lock} before removing it.`,
      );
    }
    if (!Number.isInteger(previous.pid) || previous.pid < 1)
      throw new Error("Invalid startup lock owner.");
    try {
      process.kill(previous.pid, 0);
      throw new Error(
        `A portfolio supervisor is already running (PID ${previous.pid}).`,
      );
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
    // A separate exclusive recovery lock prevents two restarts reclaiming the same stale lock.
    const recovery = `${lock}.recovery`;
    let recoveryHeld = false;
    try {
      writeFileSync(recovery, JSON.stringify(owner), {
        flag: "wx",
        mode: 0o600,
      });
      recoveryHeld = true;
      if (readFileSync(lock, "utf8") !== JSON.stringify(previous))
        throw new Error(
          "Startup lock changed; retry after the other process finishes.",
        );
      rmSync(lock);
      writeFileSync(lock, JSON.stringify(owner), { flag: "wx", mode: 0o600 });
    } finally {
      if (recoveryHeld) rmSync(recovery, { force: true });
    }
    log("Recovered a stale startup lock.");
  }
  locked = true;
}
function releaseLock() {
  if (!locked) return;
  try {
    if (JSON.parse(readFileSync(lock, "utf8")).token === owner.token)
      rmSync(lock);
  } catch {
    /* Do not remove another owner's lock. */
  }
}
process.on("exit", releaseLock);

function launch(command, args, cwd, { capture = false, timeout = 0 } = {}) {
  if (stopping) throw new Error("Shutdown requested.");
  const child = spawn(command, args, {
    cwd,
    env: {
      ...process.env,
      CI: "true",
      NEXT_TELEMETRY_DISABLED: "1",
      GIT_TERMINAL_PROMPT: "0",
      GIT_SSH_COMMAND: "ssh -o BatchMode=yes -o ConnectTimeout=15",
    },
    detached: process.platform !== "win32",
    stdio: capture
      ? ["ignore", "pipe", "inherit"]
      : ["ignore", "inherit", "inherit"],
  });
  children.add(child);
  let output = "";
  child.stdout?.on("data", (data) => {
    output += data.toString();
    if (output.length > 1_000_000) signal(child, "SIGKILL");
  });
  let timedOut = false;
  let killTimer;
  const timer = timeout
    ? setTimeout(() => {
        timedOut = true;
        signal(child);
        killTimer = setTimeout(() => signal(child, "SIGKILL"), 5_000);
      }, timeout)
    : null;
  const done = new Promise((res, rej) => {
    child.once("error", rej);
    child.once("close", (code, sig) => {
      clearTimeout(timer);
      clearTimeout(killTimer);
      children.delete(child);
      if (code === 0 && !timedOut) res(output.trim());
      else
        rej(
          new Error(
            `${command} ${timedOut ? "timed out" : `exited (${sig || code})`}.`,
          ),
        );
    });
  });
  // Errors are still awaited below; this also handles an early server exit during readiness checks.
  done.catch(() => {});
  return { child, done };
}
async function run(label, command, args, cwd = root, timeout = 120_000) {
  log(label);
  return launch(command, args, cwd, { capture: true, timeout }).done;
}
function loadEnvironment() {
  for (const file of [
    ".env.production.local",
    ".env.local",
    ".env.production",
    ".env",
  ]) {
    const path = join(root, file);
    if (existsSync(path)) process.loadEnvFile(path);
  }
  process.env.NODE_ENV = "production";
  process.env.SITE_URL ||= "https://syntaxsurge.com";
}
function releaseKey(sha) {
  const fingerprint = createHash("sha256")
    .update(process.versions.node)
    .update(process.env.SITE_URL);
  for (const [key, value] of Object.entries(process.env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .sort())
    fingerprint.update(`${key}=${value}\n`);
  for (const file of [
    ".env.production.local",
    ".env.local",
    ".env.production",
    ".env",
  ]) {
    if (existsSync(join(root, file)))
      fingerprint.update(file).update(readFileSync(join(root, file)));
  }
  return `${sha}-${fingerprint.digest("hex").slice(0, 12)}`;
}
function usable(key) {
  if (!/^[a-f0-9]{40,64}-[a-f0-9]{12}$/.test(key || "")) return false;
  return [".built", ".next/BUILD_ID", "node_modules/next/dist/bin/next"].every(
    (file) => existsSync(join(releases, key, file)),
  );
}
function history() {
  try {
    const data = JSON.parse(readFileSync(join(state, "releases.json"), "utf8"));
    return Array.isArray(data)
      ? data
          .filter((key) => usable(key) && key === releaseKey(key.split("-")[0]))
          .slice(0, 2)
      : [];
  } catch {
    return [];
  }
}
async function prepareRelease() {
  await run("Fetching the latest origin/main.", "git", [
    "fetch",
    "--no-tags",
    "origin",
    "+refs/heads/main:refs/remotes/origin/main",
  ]);
  const sha = await run("Pinning the release commit.", "git", [
    "rev-parse",
    "--verify",
    "refs/remotes/origin/main^{commit}",
  ]);
  if (!/^[a-f0-9]{40,64}$/.test(sha))
    throw new Error("Git returned an invalid commit.");
  const key = releaseKey(sha);
  if (usable(key)) {
    log(`Reusing completed release ${sha.slice(0, 12)}.`);
    return key;
  }
  const dir = join(releases, key);
  const archive = join(state, `${key}.tar`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { mode: 0o700 });
  try {
    await run("Exporting the pinned commit.", "git", [
      "archive",
      "--format=tar",
      `--output=${archive}`,
      sha,
    ]);
    await run("Preparing a separate release.", "tar", [
      "-xf",
      archive,
      "-C",
      dir,
    ]);
    if (!existsSync(join(dir, "pnpm-lock.yaml")))
      throw new Error("The release must contain pnpm-lock.yaml.");
    for (const file of [
      ".env.production.local",
      ".env.local",
      ".env.production",
      ".env",
    ]) {
      if (existsSync(join(root, file)))
        writeFileSync(join(dir, file), readFileSync(join(root, file)), {
          mode: 0o600,
        });
    }
    // Include build tooling even when aaPanel exports NODE_ENV=production.
    log("Installing locked dependencies.");
    await launch(
      "pnpm",
      ["install", "--frozen-lockfile", "--prod=false"],
      dir,
      { timeout: 600_000 },
    ).done;
    const build = launch("pnpm", ["run", "build"], dir, { timeout: 900_000 });
    log(`Building ${sha.slice(0, 12)}. The previous release stays intact.`);
    await build.done;
    if (!existsSync(join(dir, ".next/BUILD_ID")))
      throw new Error("Build did not produce a Next.js BUILD_ID.");
    writeFileSync(join(dir, ".built"), `${sha}\n`, { mode: 0o600 });
    return key;
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  } finally {
    rmSync(archive, { force: true });
  }
}
async function freePort() {
  await new Promise((res, rej) => {
    const probe = createServer();
    probe.once("error", () =>
      rej(
        new Error(
          `Port ${port} is already occupied; refusing to stop an unrelated service.`,
        ),
      ),
    );
    probe.listen(port, host, () => probe.close(res));
  });
}
function responds() {
  return new Promise((res) => {
    const request = get(
      { host, port, path: "/", timeout: 2_000 },
      (response) => {
        response.resume();
        res(response.statusCode === 200);
      },
    );
    request.on("error", () => res(false));
    request.on("timeout", () => request.destroy());
  });
}
async function start(key) {
  await freePort();
  const dir = join(releases, key);
  const server = launch(
    process.execPath,
    [
      join(dir, "node_modules/next/dist/bin/next"),
      "start",
      "--hostname",
      host,
      "--port",
      String(port),
    ],
    dir,
  );
  try {
    const deadline = Date.now() + 60_000;
    while (
      !stopping &&
      Date.now() < deadline &&
      server.child.exitCode === null &&
      server.child.signalCode === null
    ) {
      if (
        (await responds()) &&
        server.child.exitCode === null &&
        server.child.signalCode === null &&
        !stopping
      )
        return server;
      await pause(250);
    }
    throw new Error(`Release ${key.slice(0, 12)} failed its startup check.`);
  } catch (error) {
    signal(server.child);
    const force = setTimeout(() => signal(server.child, "SIGKILL"), 5_000);
    try {
      await server.done;
    } catch {
      /* Failed startup is reported by the caller. */
    }
    clearTimeout(force);
    throw error;
  }
}
function promote(key, previous) {
  const retained = [...new Set([key, ...previous])].slice(0, 2);
  const temporary = join(state, `releases.${owner.token}.tmp`);
  writeFileSync(temporary, JSON.stringify(retained), { mode: 0o600 });
  renameSync(temporary, join(state, "releases.json"));
  // Keep the current and previous successful releases, never unrelated state-directory contents.
  for (const entry of readdirSync(releases)) {
    if (
      /^[a-f0-9]{40,64}-[a-f0-9]{12}$/.test(entry) &&
      !retained.includes(entry) &&
      statSync(join(releases, entry)).isDirectory()
    )
      rmSync(join(releases, entry), { recursive: true, force: true });
  }
}
async function main() {
  if (!Number.isInteger(port) || port < 1024 || port > 65535)
    throw new Error("PORT must be an integer from 1024 to 65535.");
  takeLock();
  const previous = history();
  let candidate;
  try {
    candidate = await prepareRelease();
  } catch (error) {
    if (stopping) return;
    log(
      `Update failed: ${error.message} Will try the last successful release.`,
    );
  }
  for (const key of [...new Set([candidate, ...previous].filter(Boolean))]) {
    if (stopping) return;
    let server;
    try {
      server = await start(key);
    } catch (error) {
      if (stopping) return;
      log(error.message);
      continue;
    }
    if (stopping) {
      signal(server.child);
      await server.done.catch(() => {});
      return;
    }
    try {
      promote(key, previous);
    } catch (error) {
      log(`Could not save release history: ${error.message}`);
      signal(server.child);
      await server.done.catch(() => {});
      throw error;
    }
    log(
      `${key === candidate ? "Serving" : "DEGRADED: serving the previous release"} ${key.slice(0, 12)} at http://${host}:${port}.`,
    );
    try {
      await server.done;
    } catch (error) {
      if (!stopping) throw error;
    }
    if (!stopping)
      throw new Error(
        "The web server stopped unexpectedly; aaPanel should restart this command.",
      );
    return;
  }
  if (!stopping)
    throw new Error(
      "No healthy release is available. Inspect the update logs and restart after fixing the cause.",
    );
}
main()
  .catch((error) => {
    console.error(`[portfolio] ${error.message}`);
    process.exitCode = 1;
    stopChildren();
  })
  .finally(releaseLock);
