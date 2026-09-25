# Portfolio at syntaxsurge.com

The portfolio is prepared for **https://syntaxsurge.com/**. Its canonical URLs, social previews, robots file, and sitemap use that origin by default. This document and the Nginx snippet are deployment preparation; they do not change the live server.

Keep Kaldi at **https://syntaxsurge.com/kaldi-coffee** on its existing service. Do not add a Next.js `basePath` to this portfolio or reuse Kaldi's process, environment file, database, or port.

| Public route | Application | Private listener |
| --- | --- | --- |
| `/`, `/work/*`, `/_next/*`, `/images/*`, metadata routes | Portfolio | `127.0.0.1:3101` |
| `/kaldi-coffee`, `/kaldi-coffee/*` | Existing Kaldi app | `127.0.0.1:3100` |

## Install the source and runtime

Use the existing aaPanel Node.js manager as the only process supervisor. Its [official guide](https://www.aapanel.com/docs/Function/Node.html) supports a custom startup command, a Node version, and a runtime user. Choose `www`, not `root`. Creating a new domain mapping is unnecessary because the existing Nginx vhost already owns `syntaxsurge.com` and serves Kaldi.

Use these separate directories, outside WordPress's document root:

| Directory | Purpose |
| --- | --- |
| `/www/syntaxsurge-portfolio/source` | Git checkout and stable `pnpm serve` startup entry point |
| `/www/syntaxsurge-portfolio/runtime` | Build releases, startup lock, and last-successful-release history |

Both directories must be owned by the runtime user `www`, with sufficient free disk space for dependency installation and two successful releases plus one build in progress. The user also needs a writable package-manager cache/store. Do not copy local `node_modules`, `.next`, or environment files from another application.

The repository is `https://github.com/syntaxsurge/syntaxsurge-portfolio.git`. Clone it only after the initial `main` commit has been pushed. Keep `.git`: startup uses it to fetch the newest commit. The public HTTPS origin avoids putting a developer's SSH key or GitHub token on the web server.

The earlier server had Node.js at `/www/server/nodejs/v24.15.0/bin`; verify that installation still exists, then select Node 24.15.0 or a later supported 24.x version. The project also supports Node 22.21.1 or later 22.x. Install pnpm **10.15.0** for the selected Node installation and confirm that `node`, `pnpm`, `git`, and `tar` are available to `www` in the project's environment. Do not replace the global Node version used by Kaldi or other applications.

For a Linux terminal opened by the server administrator, the directory setup and checkout are:

```sh
install -d -o www -g www -m 0755 /www/syntaxsurge-portfolio
install -d -o www -g www -m 0700 /www/syntaxsurge-portfolio/runtime
runuser -u www -- git clone https://github.com/syntaxsurge/syntaxsurge-portfolio.git /www/syntaxsurge-portfolio/source
```

Install pnpm using the selected Node installation's package manager if it is not already available. Before configuring the service, verify the selected executables and write permissions while running as `www`. If a checkout was uploaded by an administrator instead of cloned as `www`, correct ownership of this portfolio's directories only. Do not recursively change ownership of `/www` or the WordPress and Kaldi directories.

## Configure the aaPanel Node.js project

Create one Node.js process entry with these settings:

| Setting | Value |
| --- | --- |
| Name | `syntaxsurge-portfolio` |
| Project path / working directory | `/www/syntaxsurge-portfolio/source` |
| Run mode | Custom command |
| Startup command | `pnpm serve` |
| Node.js version | Verified Node 24.15.0+ in the 24.x series |
| Runtime user | `www` |
| Port | `3101` |
| Domain mapping | Leave unused; edit the existing vhost as described below |
| Restart policy | Restart after an unexpected process exit, with a delay |
| Start on boot | Enabled |

Set the following environment variables in the aaPanel project:

```dotenv
NODE_ENV=production
SITE_URL=https://syntaxsurge.com
PORT=3101
PORTFOLIO_DEPLOY_DIR=/www/syntaxsurge-portfolio/runtime
```

The startup entry point fixes the listener to `127.0.0.1`. Confirm port 3101 is free before starting. It refuses to stop another process occupying that port. Do not expose ports 3100 or 3101 in the firewall; Nginx is the public entry point. If the manager cannot find `pnpm`, fix its executable search path for the selected Node installation rather than launching another supervisor.

`SITE_URL` is an origin only: no `/kaldi-coffee`, credentials, query, or fragment. Invalid values fail the build. The portfolio needs no database or secrets. Optional source environment files are loaded in this order: `.env.production.local`, `.env.local`, `.env.production`, `.env`; variables already supplied by aaPanel take priority. Environment files are copied privately into each new release. Keep them untracked and outside the public document root. The aaPanel environment is the recommended place for `PORT` and `PORTFOLIO_DEPLOY_DIR`; source environment files also support them. A separate preview origin should also have access protection or a noindex policy to avoid duplicate indexing.

### What happens on every start

1. The runner takes an exclusive startup lock and fetches `origin/main` without prompting for credentials.
2. It pins that commit and exports it into a separate release directory. It does not reset or overwrite source working files.
3. It installs dependencies from `pnpm-lock.yaml` and builds the release. A matching completed build is reused when the commit, Node version, and relevant environment configuration have not changed.
4. It starts Next.js in the foreground, waits for a successful homepage response, then records the release as successful. It retains the current and previous successful releases.
5. aaPanel supervises the foreground command. On stop, the runner forwards the signal to its child processes and forces their shutdown after 10 seconds if needed.

If fetching, dependency installation, building, or startup fails, the runner logs the cause and attempts the most recent successful release. A fallback is labeled `DEGRADED` in the logs so a stale deployment is not mistaken for a successful update. Fallback requires a release built with matching runtime and build configuration; changing Node or environment settings may require a successful fresh build. If there is no healthy compatible saved release, startup fails visibly. A successful homepage response is a startup check, not a substitute for the wider release checks below.

Allow at least **20 seconds for shutdown**. The runner allows up to 2 minutes per Git/archive step, 10 minutes for installation, 15 minutes for the build, and 1 minute per startup readiness check. The manager must not kill a legitimate build after a short startup timeout; allow at least 40 minutes for a cold start if a configurable startup deadline exists. Build output and the selected commit are written to the Node project's logs. Inspect those logs if aaPanel reports that the port is unavailable while a first build is still running.

This workflow intentionally rebuilds on restart when the pushed commit or build configuration changes. Because aaPanel stops the existing process first, the website is unavailable during that restart and build. A restart with an unchanged successful release is faster, but still has a brief interruption. This setup does not promise zero downtime; do not schedule frequent automatic restarts merely to poll for changes.

### Publishing future updates

Run the local checks, commit the intended files, and push `main` to GitHub. Then restart this portfolio's Node.js project in aaPanel. Only pushed commits are fetched; uncommitted or unpushed local changes do not appear on the server.

```sh
pnpm lint
pnpm build
pnpm test
pnpm test:startup
git push origin main
```

The startup runner itself is the copy in the stable source checkout. Application changes are fetched automatically, but a later change to `scripts/serve.mjs` or its bootstrap command requires an intentional source-checkout update while the project is stopped. After preserving any local configuration and reviewing the incoming change, run `git pull --ff-only origin main` as `www` in the source directory, then restart. Do not use a hard reset that could discard server-specific files.

### Recovery

When an update fails, first read the logged error and check whether the previous release is serving. Fix the cause, push a corrected commit if needed, and restart. Do not delete the runtime directory: it contains the saved builds used for fallback. A lock owned by an exited process is recovered automatically. If startup reports a lock owned by a live process, confirm which portfolio process is already running; do not remove its lock to start a duplicate service.

For a release that starts successfully but later proves incorrect, revert the offending commit in Git, verify the fix locally, push it to `main`, and restart. The next start fetches that corrected history. Do not edit generated files inside a saved release. If the root route must be taken back to WordPress immediately, use the Nginx rollback below; leave Kaldi running throughout.

## Replace only the root routing

Inspect the current effective Nginx configuration and take private backups before editing. aaPanel can put rules in several included files. The earlier installation used:

- Vhost: `/www/server/panel/vhost/nginx/syntaxsurge.com.conf`
- WordPress rewrite include: `/www/server/panel/vhost/rewrite/syntaxsurge.com.conf`
- Kaldi include: `/www/server/panel/vhost/nginx/extension/syntaxsurge.com/kaldi-coffee.conf`
- WordPress files: `/www/wwwroot/syntaxsurge.com`

Verify these paths and contents again. The WordPress homepage returned an error during the earlier Kaldi deployment; that is historical information, not a current health check.

The previous WordPress rewrite include contained a `location /` block with `try_files $uri $uri/ /index.php?$args`. **Remove that one catch-all, then include [nginx-portfolio.conf](../deploy/nginx-portfolio.conf) once inside the existing server; the snippet contains its replacement. Do not keep or add a second `location /`.** Keep the backup outside wildcard include directories so Nginx does not load it. Preserve the WordPress files/database, PHP settings, TLS certificate, HTTP-to-HTTPS behavior, ACME challenge rules, and existing security rules. Do not replace the entire vhost or add another website claiming the same domain.

Retain Kaldi's exact `location = /kaldi-coffee` and `location ^~ /kaldi-coffee/` unchanged. They are more specific than the portfolio's catch-all. The portfolio's `^~ /_next/`, `^~ /work/`, and `^~ /images/` blocks prevent WordPress file-extension regexes from intercepting those routes. Exact blocks handle the portfolio icon, social preview, robots file, and sitemap. Add explicit routing if new public asset directories or metadata routes are introduced later. These selection rules follow the [Nginx location documentation](https://nginx.org/en/docs/http/ngx_http_core_module.html#location).

The proxy preserves the request path, forwards to loopback port 3101, disables shared proxy caching, and overwrites forwarded client/host headers. It does not forward a user-supplied Host to Next. Review existing server-level rewrites, cache directives, and `www` redirects before applying: a rewrite executed before location selection can still alter routing. Do not replace the existing Kaldi header or cache rules with portfolio settings. See [Nginx proxy documentation](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).

Only after the portfolio passes its private listener checks, validate the combined Nginx configuration with the server's existing Nginx executable. Reload only if validation passes. On the earlier aaPanel installation, the executable was `/www/server/nginx/sbin/nginx`; verify the active executable rather than starting a second Nginx instance.

## Confirm the cutover

Check these privately first, then on HTTPS after the reload:

```sh
curl -fsS http://127.0.0.1:3101/ -o /dev/null
curl -fsS http://127.0.0.1:3101/work/cliplore -o /dev/null
curl -fsS http://127.0.0.1:3101/sitemap.xml
curl -fsS https://syntaxsurge.com/ -o /dev/null
curl -fsS https://syntaxsurge.com/work/cliplore -o /dev/null
curl -fsS https://syntaxsurge.com/robots.txt
curl -fsS https://syntaxsurge.com/sitemap.xml
curl -fsS https://syntaxsurge.com/icon.svg -o /dev/null
curl -fsS https://syntaxsurge.com/opengraph-image -o /dev/null
curl -fsS https://syntaxsurge.com/images/cliplore-cover.webp -o /dev/null
curl -fsS https://syntaxsurge.com/kaldi-coffee/api/health
```

Inspect an actual hashed `/_next/static/` script and stylesheet URL from the rendered page and confirm each returns the expected content type. In a browser verify all 17 project pages, both themes and persistence, mobile navigation, filters, award media, keyboard focus, and 200% zoom. Check that the homepage and project pages use their own HTTPS canonical URLs and that the sitemap has 18 portfolio URLs. The portfolio sitemap does not claim or replace Kaldi's internal routing.

Also check that `/.env.local`, `/package.json`, and unknown `/work/` slugs do not expose source files. Confirm Kaldi still loads its own assets, wallet, and sign-in callback. Inspect the aaPanel Node project and Nginx logs for errors. Confirm the logged serving commit is the intended commit and is not marked `DEGRADED`. Keep the runtime release history intact after these checks.

If verification fails, restore only the backed-up root routing and portfolio include changes, validate, and reload Nginx. Do not stop, restart, or change the Kaldi service during a portfolio rollback. Retain WordPress data even after a successful cutover.
