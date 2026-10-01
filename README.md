# Jade · SyntaxSurge

A standalone Next.js portfolio for Jade Laurence Empleo. Contains 17 projects, 14 award entries with authentic project previews and YouTube demos, four featured product covers, project detail pages, a searchable/filterable archive, and LinkedIn/GitHub contact links. Light and dark themes follow the device preference initially and remember an explicit choice.

## Run locally

Requires Node.js 22.21.1+ in the 22.x series, or 24.15.0+ in the 24.x series, and pnpm 10.15.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3001. Port 3001 keeps the existing Kaldi preview separate.

## Verify a release

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm test:startup
```

The homepage and all 17 detail routes are rendered at build time. The project search/filter controls and theme switcher use client state. No database, secrets, login, contact-form provider, or visitor tracking is needed. Images and fonts are served locally. Demo links open YouTube on request; no video players or tracking scripts load on the portfolio. A generated PNG provides the social-sharing preview.

## aaPanel startup and automatic updates

Before the first start, install dependencies in the **source checkout configured as the aaPanel project path**, using the project's selected Node version and runtime user:

```sh
pnpm install --frozen-lockfile --prod=false
```

If aaPanel reports “Project dependency installation is abnormal,” run that installation in a server terminal using the project's configured directory and runtime user. Our startup runner installs dependencies in separate release directories; it cannot repair a panel dependency check that prevents the runner from being launched. The initial source installation and release installations serve different purposes. Keep pnpm 10.15.0 available to the project. Prefer this frozen install over aaPanel's one-click installer, whose current implementation removes dependency lockfiles before installing.

Then use this startup command:

```sh
pnpm deploy:server
```

Use this as the custom startup command for the portfolio's aaPanel Node.js project. `pnpm serve` remains an alias for the same runner. Each start fetches the latest **pushed `origin/main` commit**, forcefully replaces the server's source checkout with that exact commit, installs its locked dependencies, builds a separate release, and starts it on `127.0.0.1:3101`. Repeated starts reuse a completed build when its commit, Node version, and build configuration match.

**The server shortcut discards staged and unstaged source edits, local commits, and nonignored untracked source files.** It preserves untracked `.env*`, `node_modules`, `.next`, and other ignored files. Supported production environment files and generated dependency/build directories must remain untracked. Put changes in GitHub before restarting; keep server settings in aaPanel's environment or ignored environment files.

If fetching, installing, building, or starting the new release fails, the command tries a previously successful complete release and reports the failure in the logs. A failed fetch leaves the source checkout unchanged; an installation or build failure can leave it at the new commit while the previous release serves with its own source, dependencies, and build. The current and previous successful releases are retained. Fallback requires a release built with matching runtime and build configuration; changing Node or environment settings may require a successful fresh build. On the first deployment, there is no previous release to fall back to. A restart stops the old process before preparing the new one, so updates have downtime; this is not a zero-downtime deployment system.

Set these variables in the aaPanel project environment:

```dotenv
SITE_URL=https://syntaxsurge.com
PORT=3101
PORTFOLIO_DEPLOY_DIR=/www/syntaxsurge-portfolio/runtime
```

The recommended source checkout is `/www/syntaxsurge-portfolio/source`, owned by the aaPanel runtime user `www`. The runtime directory must be outside the source checkout and must not contain it, including through symlinks; it is writable by the same user. The runner checks the Git root and occupied port before changing the checkout, and refuses a remote commit that tracks supported production environment files, `node_modules`, or `.next`. Keep the source `.git` directory and use the public HTTPS origin `https://github.com/syntaxsurge/syntaxsurge-portfolio.git`; no GitHub private key is needed for server updates. `pnpm start` remains available for starting an already-built checkout without fetching or rebuilding.

An existing server running the earlier `pnpm serve` implementation needs a one-time source update while stopped, after this change is committed and pushed. Follow the adoption procedure in [the domain deployment guide](docs/DEPLOY-SYNTAXSURGE.md). Subsequent starts update the runner's source automatically; a newly fetched runner implementation takes effect on the following restart because the current process already loaded its code.

The production origin defaults to `https://syntaxsurge.com`. Canonical links, the sitemap, robots metadata, and social-preview URLs use that origin; `SITE_URL` can override it with another HTTP(S) origin. See [the domain deployment guide](docs/DEPLOY-SYNTAXSURGE.md) for the exact aaPanel settings, update limits, logs, and rollback procedure. The staged Nginx configuration preserves `/kaldi-coffee` and replaces only WordPress's root routing. **Deployment preparation is not a completed live cutover.**

## Edit content

- `src/data/portfolio.ts`: projects, real links, and awards.
- `src/data/award-media.ts`: local project previews and verified YouTube demos for all 14 recognitions.
- `src/app/page.tsx`: homepage editorial copy and featured selections.
- `src/components/project-visual.tsx`: product covers and decorative archive artwork.
- `src/app/globals.css`: palette, typography, layout, and responsive styles.
- `src/lib/theme.ts`: stored preference, device preference, cross-tab synchronization, and early theme initialization.
- `docs/CONTENT-SOURCES.md`: content provenance and historical project distinctions.
- `docs/ASSET-SOURCES.md`: visual provenance; campaign imagery is not presented as a product screenshot.
- `docs/AWARD-MEDIA-SOURCES.md`: provenance for recognition previews and demo videos. Project images illustrate the work; they are not award certificates.

Recognition details originate from the owner’s supplied award history. USD and MUSD prizes remain separate. No client counts, revenue, or user statistics are invented. Product and demo links open directly; no nonfunctional contact form or resume download is included.

## Accessibility and verification

The shared sticky navigation links directly to work, all projects, about, recognition, and contact on phones, tablets, and desktop. The full project collection follows selected work and includes visible category/result counts, combined search and filters, one-click reset, and direct project/product/demo/source actions. Project pages include breadcrumbs and an easy return to the collection; missing pages offer clear recovery links and contact options. All recognition entries are visible, with preview highlights and compact cards.

Semantic landmarks, a focusable skip destination, labeled search and theme controls, visible keyboard focus, live filter announcements, focus restoration after reset, alt text, and reduced-motion support are included. Main body copy is 17–18px, with larger headings and touch targets. Validation is recorded in `docs/VALIDATION.md`.
