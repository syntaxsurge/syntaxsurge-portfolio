# SyntaxSurge Software Development Services

A Next.js business website for Syntax Surge: business websites, custom software, and practical AI/automation services. The homepage presents services, three selected projects, founder Jade Laurence Empleo, business registration, and direct contact. Dedicated work and recognition pages provide 19 projects and 14 founder hackathon recognitions. The supplied logo and founder portrait are preserved, and project artwork is served locally. Light and dark themes follow the device preference initially and remember an explicit choice.

- `/`: business overview, services, selected work, team, registration, and contact.
- `/work`: searchable project collection with category filters and direct website/demo/source links.
- `/recognition`: all founder recognitions and their project previews/demos.
- `/work/[slug]`: project details, including [MC Dental Station](https://syntaxsurge.com/work/mc-dental-station) and Wrap It Up!.

The business brand is **Syntax Surge**; its registered legal name is **SyntaxSurge Software Development Services**. The registration section shows National scope, Business Name No. 8161608, and a rendered certificate preview, with view/download actions for the [unchanged original DTI PDF](public/documents/syntax-surge-dti-certificate.pdf). `src/data/business.ts` stores its verified document facts and local asset paths.

## Run locally

Requires Node.js 22.21.1+ in the 22.x series, or 24.15.0+ in the 24.x series, and pnpm 10.15.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3001](http://localhost:3001).

## Verify a release

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm test:startup
```

The homepage, work collection, recognition page, 19 project detail routes, and two game support/privacy pages are rendered at build time, with 24 unique sitemap URLs. The project search/filter controls and theme switcher use client state. This business website needs no database, secrets, login, contact-form provider, or visitor tracking; linked applications have their own integrations. Images and fonts are served locally. Demo links open YouTube on request; no video players or tracking scripts load on the business website. A generated PNG provides the business social-sharing preview.

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

Use this as the custom startup command for the business website's aaPanel Node.js project. `pnpm serve` remains an alias for the same runner. Each start fetches the latest **pushed `origin/main` commit**, forcefully replaces the server's source checkout with that exact commit, installs its locked dependencies, builds a separate release, and starts it on `127.0.0.1:3101`. Repeated starts reuse a completed build when its commit, Node version, and build configuration match.

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

The production origin defaults to `https://syntaxsurge.com`. Canonical links, the sitemap, robots metadata, and social-preview URLs use that origin; `SITE_URL` can override it with another HTTP(S) origin. See [the domain deployment guide](docs/DEPLOY-SYNTAXSURGE.md) for the exact aaPanel settings, update limits, logs, and rollback procedure. The staged Nginx configuration applies only to this business website's vhost. Kaldi (`https://kaldi-rewards.syntaxsurge.com/`) and MC Dental Station (`https://mc-dental.syntaxsurge.com/`) are independent applications with their own domain routing. **Local implementation and deployment preparation do not publish a live update.**

## Wrap It Up! app pages

- [Game and project](https://syntaxsurge.com/work/wrap-it-up)
- [Support](https://syntaxsurge.com/work/wrap-it-up/support)
- [Privacy](https://syntaxsurge.com/work/wrap-it-up/privacy)

The game information extends the existing project-detail template, with Support and Privacy beneath that project. These static pages share business navigation, artwork, and theme. The three `/apps/wrap-it-up` addresses are permanent redirects for already installed beta links; they have no separate pages or sitemap entries. `src/data/wrap-it-up.ts` stores version-scoped release facts, territorial age ratings, tester links, closed-test availability, and the verified support address. Update the current build only after the relevant distribution channels are verified. Enable the closed-test enrollment link only after the Alpha release is available; internal testers must leave internal testing before opting into the closed test. Privacy copy follows the app release audit: progress/captures are local, no player account or gameplay backend exists, ads and IAP are disabled, and packaged SDKs are disclosed without a blanket network-free claim. Update the policy alongside any change to runtime data handling.

## Edit content

- `src/data/business.ts`: business identity, services, founder portrait, contact links, and certificate facts/PDF path/preview dimensions.
- `src/data/portfolio.ts`: projects, real links, and awards.
- `src/data/award-media.ts`: local project previews and verified YouTube demos for all 14 recognitions.
- `src/app/page.tsx`: business homepage and three selected project examples.
- `src/app/work/page.tsx`: full searchable project collection.
- `src/app/recognition/page.tsx`: founder recognition record.
- `src/components/project-visual.tsx`: product covers and decorative archive artwork.
- `src/app/globals.css`: palette, typography, layout, and responsive styles.
- `src/lib/theme.ts`: stored preference, device preference, cross-tab synchronization, and early theme initialization.
- `docs/CONTENT-SOURCES.md`: content provenance and historical project distinctions.
- `docs/ASSET-SOURCES.md`: visual provenance; campaign imagery is not presented as a product screenshot.
- `docs/AWARD-MEDIA-SOURCES.md`: provenance for recognition previews and demo videos. Project images illustrate the work; they are not award certificates.

Recognition details originate from the founder’s supplied award history and do not imply company client counts or 14 first-place wins. USD and MUSD prizes remain separate. No revenue or user statistics are invented. Website, product, and demo links open directly; project inquiries open the founder's existing LinkedIn profile without an invented business email or nonfunctional contact form.

## Accessibility and verification

The shared sticky navigation leads to homepage Services/Team, the `/work` collection, and the current page's Contact footer on phones, tablets, and desktop. The homepage's “Explore our work” action reaches its selected examples; other links lead directly to the full `/work` collection and `/recognition` record. The collection includes visible category/result counts, combined search and filters, one-click reset, and direct project/product/demo/source actions. Project pages include breadcrumbs and an easy return to the collection; missing pages offer clear recovery links and contact options. All recognition entries are visible, with preview highlights and compact cards. The footer also links to recognition and business registration.

Semantic landmarks, a focusable skip destination, labeled search and theme controls, visible keyboard focus, live filter announcements, focus restoration after reset, alt text, and reduced-motion support are included. Main body copy is 17–18px, with larger headings and touch targets. Validation is recorded in `docs/VALIDATION.md`.
