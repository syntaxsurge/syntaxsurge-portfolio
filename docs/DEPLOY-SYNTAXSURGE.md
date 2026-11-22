# Deploy Syntax Surge

The website runs as **SyntaxSurge / production / Portfolio**. Its raw Docker Compose configuration defines a single `portfolio` service that builds from the public GitHub repository at an explicit commit. [Dokploy panel](https://onshore-dokploy.syntaxsurge.com/)

```yaml
services:
  portfolio:
    build:
      context: https://github.com/syntaxsurge/syntaxsurge-portfolio.git#<full-main-commit>
```

The inline Dockerfile uses `node:24-bookworm-slim` with pnpm 10.15.0, installs from the frozen lockfile, and runs `pnpm build`. The container runs as `node` and starts Next.js on `0.0.0.0:3000`. A container health check requests `http://127.0.0.1:3000/` every 15 seconds. The production environment sets `SITE_URL=https://syntaxsurge.com` for canonical metadata. The portfolio runs without a database, app secrets, or data volumes.

Cloudflare proxies `syntaxsurge.com` and `www.syntaxsurge.com` to the Dokploy origin. Both HTTPS domains map to `portfolio` port 3000 on path `/`. The origin TLS certificate covers both hostnames. Linked products and subdomains use their own deployment settings.

## Publish a release

1. Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test`. Push the verified commit to GitHub `main` and confirm its full SHA with `git ls-remote origin refs/heads/main`.
2. Open the existing **Portfolio** Compose service and record its current commit pin for rollback. Change the Git context fragment to the new full SHA and save the Compose configuration.
3. Select **Deploy** in the same service. Wait for the specific deployment to succeed, verify the pinned commit in the build output, and confirm that the `portfolio` container reports healthy.
4. Verify the public site using the checks below.

For an API deployment, use `compose.one` to read the raw configuration, `compose.update` to save the updated `composeFile`, and `compose.deploy` to queue the release. Use `deployment.allByCompose` to track the new deployment and `deployment.readLogs` to inspect its build. Include the Dokploy API key in the `x-api-key` header and keep it out of shell history, logs, and source control. [Compose API](https://docs.dokploy.com/docs/api/compose) · [Deployment API](https://docs.dokploy.com/docs/api/deployment)

## Verify the public release

```sh
curl -fsS https://syntaxsurge.com/ -o /dev/null
curl -fsS https://www.syntaxsurge.com/ -o /dev/null
curl -fsS https://syntaxsurge.com/sitemap.xml
curl -fsS https://syntaxsurge.com/recognition -o /dev/null
curl -fsS https://syntaxsurge.com/work/wrap-it-up/support -o /dev/null
curl -fsS https://syntaxsurge.com/work/wrap-it-up/privacy -o /dev/null
curl -sS -D - https://syntaxsurge.com/work -o /dev/null
```

Confirm that the public HTML shows content specific to the release. Check the changed project routes and media, a hashed Next.js stylesheet or script from the homepage, and the expected sitemap entries. The sitemap contains the homepage, recognition page, all project pages, and the Wrap It Up! support and privacy pages. `/work` redirects to `/#work` with status 308. Each of the three `/apps/wrap-it-up` addresses redirects to its corresponding `/work/wrap-it-up` address with status 308.

Use a desktop and a phone-sized viewport for changed interactive behavior. Verify clear keyboard focus, sticky navigation, project search and filters, motion controls, and theme support where relevant. Check the résumé and business registration downloads when their paths or presentation change.

## Recover a release

Check the deployment output first if an install or build fails. Verify the status of the running portfolio container before attempting another deployment. For a site regression, save the prior full commit in the build context and deploy the same Compose service again. Verify container health and the restored public content. Scope release and rollback operations to Portfolio.

For a public gateway error, inspect the Portfolio container health and logs, then confirm that the two domain mappings route to `portfolio:3000`. Compare the Cloudflare response with a direct HTTPS request to the configured origin using `curl --resolve`, the domain hostname, and the official Cloudflare Origin CA root with `--cacert`. A successful origin response with a failing public response directs investigation to the Cloudflare origin routing and TLS configuration. [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
