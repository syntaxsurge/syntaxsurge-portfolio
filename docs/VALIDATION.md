# Validation — 25 September 2026

Passed on Node.js 22.21.1 with Next.js 16.3.6 and React 19.2.8:

- `npm run lint`
- `npm run build` (homepage, 17 project detail pages, metadata image, icon, custom 404, robots.txt, sitemap.xml)
- `npm test` — 12 theme behavior checks and 26 generated-artifact/content checks
- Dependency audit: zero reported vulnerabilities at installation/lockfile verification time
- Content audit: 17 projects and 14 recognition entries, unique slugs, valid award associations, HTTPS links, original prize currencies
- Independent public HTTP check of 14 product/demo/contracts/deck destinations: returned 200 after normal redirects
- Local product artwork and generated Open Graph PNG visually inspected
- All 14 recognition entries have a local WebP preview and a matching YouTube demo. The 14 video destinations returned successful YouTube oEmbed responses with matching titles and Jade Laurence Empleo as author. The preview contact sheet was visually inspected.
- Light/dark preference tests cover first paint, persisted selections, device changes, blocked storage, cross-tab updates, and server rendering.
- All 18 combinations of normal text tokens (ink, muted, accent) on primary content surfaces (paper, surface, elevated) meet 4.5:1 contrast across both themes. Footer focus has a separate high-contrast outline.
- Root and all 17 project canonical URLs, sitemap entries, and robots metadata use the configured production origin, defaulting to https://syntaxsurge.com.

Build checks inspect generated HTML for complete project routes, headings, metadata, navigation targets, source links, local media, PNG generation, and responsive/reduced-motion CSS. Theme behavior tests use controlled storage and device-preference mocks. They do not execute the browser’s interaction or layout engines.

Automated browser verification could not run: the browser tool’s administrator-enforced security-policy check was unavailable when opening the local preview. No alternate browser or automation path was used to bypass the check. Desktop/mobile visual layout, browser theme/hydration behavior, client-side filter interaction, native disclosure behavior, and browser console verification remain to be checked in a browser when that policy service is available.

The local preview runs separately on port 3001. The staged domain guide and Nginx configuration target portfolio port 3101 and preserve Kaldi routing. They have not been applied to a remote server. Existing Kaldi, WordPress, other projects, and Google Cloud settings were not modified by this portfolio task.

## Restart update runner — 25 September 2026

- `pnpm lint`, `pnpm build`, and the existing 38 checks pass using pnpm 10.15.0.
- `pnpm test:startup`: 11 integration tests pass using real temporary Git repositories and controlled install/build/server fixtures. They cover new commits, cached builds, release retention, install/build/start failures, an unavailable Git remote, incompatible fallback configuration, first-deployment failure, concurrent starts, stale/invalid locks, occupied ports, environment loading, and graceful shutdown.
- The pnpm lockfile passes a frozen-lockfile check. It is the sole dependency lockfile.
- Staged files passed a credential-pattern scan; environment files, local research, build artifacts, and deployment state are excluded from Git.
- A real `pnpm serve` run fetched the first published GitHub commit, installed its frozen dependencies into a separate release, completed a fresh production build, and served it on temporary loopback port 3102. The homepage, security header, 19 page/metadata/static-asset URLs, and three private/unknown-path 404 responses passed HTTP checks. A second run reused that completed release. Both validation processes shut down cleanly; the existing development preview was untouched.
- The real-run release was nested under ignored `.local/` solely for this check, which produced a Next.js workspace-root warning. The documented production runtime is a sibling of the source checkout. An unknown static project slug returned the expected 404 while Next.js also logged `NoFallbackError`; no route returned an unexpected HTTP status during these checks.

aaPanel deployment is blocked by the browser tool's administrator-enforced policy-check service being unavailable. The aaPanel project and Nginx changes remain unapplied; these local tests are not live server verification.

## Extension-related hydration fix — 25 September 2026

The theme initializer now runs as the first body child instead of a React-owned inline script in the head. It still executes before visible content. This avoids React confusing it with the non-async extension script in the reported trace; no script-level warning suppression was added.

An isolated DOM regression using the application's React/ReactDOM 19.2.8 and actual theme initializer reproduced one hydration attribute warning with the original head placement. With the same extension script prepended to the head and the initializer first in the body, it produced zero warnings and zero recoverable errors. Saved dark mode, color scheme, page content, and the injected extension node remained intact. The fixture and its temporary DOM dependency remain under ignored `.local/hydration-regression`; no runtime dependency was added. This is a DOM regression test, not a visual browser test or protection against arbitrary extension changes elsewhere in the document.

`pnpm lint`, `pnpm build`, and all 38 existing theme/artifact checks pass. The build check now verifies the initializer is outside the head and before visible body content. Local diagnostic files and copied deployment releases are excluded from lint and TypeScript compilation.

## Force-sync server shortcut — 1 October 2026

- `pnpm deploy:server` and `pnpm serve` use the same foreground runner. A successful fetch now resets the source checkout to the pinned `origin/main` commit and cleans untracked source before preparing or reusing an isolated release.
- `pnpm lint`, `pnpm build`, and all 38 theme/artifact checks passed with Node.js 22.21.1 and pnpm 10.15.0. The existing dependency versions and lockfile remain unchanged.
- `pnpm test:startup` passed all 25 tests/subtests across 17 scenarios. New coverage verifies local commits, staged/unstaged edits, untracked cleanup, configuration preservation even when upstream ignore rules change, cached-release synchronization, force-pushed remote history, tracked operational-file rejection, Git-root validation, and runtime overlap through symlinks. Existing update-failure fallback, locks, occupied-port, environment compatibility, and shutdown checks remain covered.
- A real `pnpm deploy:server` run in temporary server/publisher checkouts fetched from a local bare origin, installed 354 locked packages including build tooling under production mode, built Next.js 16.3.6, and served on a temporary loopback port. The home, ClipLore detail, sitemap, robots, and WebP image routes returned 200; a missing route and direct environment/source-file requests returned 404. All eight responses carried the expected security headers and omitted `X-Powered-By`.
- Both real starts replaced staged/unstaged source changes and removed untracked source while preserving `.env.production.local`. The second start reused the completed release and its build ID. Both graceful shutdowns exited successfully, removed the lock, freed the port, and left no orphan process. Temporary checkouts and runtime files were removed; the development checkout was never force-reset.

These checks ran locally on macOS. The change has not been committed, pushed, or installed on the production server. aaPanel/Linux, remote GitHub access, Nginx, and TLS were not reverified by this change. Existing servers need the one-time source update documented in [the deployment guide](DEPLOY-SYNTAXSURGE.md) after the change is pushed.

## Portfolio usability — 1 October 2026

- `pnpm typecheck`, `pnpm lint`, `pnpm build`, and all 38 theme/artifact checks passed using supported Node.js 24.19.0 and pnpm 10.15.0. Dependency versions and the lockfile are unchanged.
- Generated HTML checks verify direct navigation to all five homepage sections, the full collection before about, all 14 recognition cards visible without disclosure, and breadcrumbs/collection navigation on all 17 project pages.
- The local production preview returned 200 for the homepage and all 17 project routes, and 404 for a missing page and an unknown project slug.
- Browser verification covered all 17 production project pages at 320px: each rendered the expected title, five navigation links, direct project actions, breadcrumbs, and contact, with no horizontal page overflow.
- Responsive navigation and representative layouts were checked at 320px, 390px, 391px, 768px, and 1440px. Section navigation lands below the sticky header; mobile contact has an explicit LinkedIn action.
- Browser interaction checks covered combined category/search filtering, empty results, reset to all 17 projects, long unbroken queries, focus restoration to search, the keyboard skip link, dark-theme persistence across navigation/reload, and recovery from the missing-page screen.
- No console warnings or errors were observed for the normal production-preview routes. Existing artifact checks confirm text-token contrast across both themes and reduced-motion/focus CSS; these checks are not a complete accessibility certification.
- Desktop/mobile screenshots are saved under ignored `.local/ux-review/`. The reviewed local production preview uses loopback port 3005. No server deployment is part of this UI task.

## Wrap It Up! public app pages — 2 October 2026

- `pnpm typecheck`, `pnpm lint`, `pnpm build`, and 40 theme/generated-artifact checks pass on Node 22.21.1 and pnpm 10.15.0. No dependency or startup-runner changes are needed.
- All 18 project detail routes and the three app pages render statically. The sitemap contains 22 URLs, and each app page has one H1, shared navigation, its own HTTPS canonical URL, description, and social metadata.
- Support uses the verified publisher address `ejadelaurence@icloud.com`; FAQs explain beta enrollment, offline gameplay, local-save limits, capture sharing, disabled monetization, and data removal.
- Privacy distinguishes earlier Android build 4’s packaged SDK startup from the distributed beta 1.0.1 (5)’s verified startup-blocking configuration, and describes platform beta services, local data, voluntary support messages, and website hosting logs. All app pages identify build 5 as the current beta. No blanket no-data or zero-network guarantee is made.
- The local production preview was visually checked on desktop and at 390px/320px phone widths in dark and light themes. Support FAQs expand correctly and their beta links are exposed as real links.
- Production deployment used commit `48fbceefb693cbdda21e4144b7fcd51defb4c891`, pushed to `main` and served by the existing `syntaxsurge_portfolio` aaPanel project on loopback port 3101. Only that service was restarted; its existing Node 24.15.0 configuration, domain routing, permissions, and other services were preserved.
- Public HTTPS requests returned 200 for all three app pages, the homepage, the Wrap It Up! project detail, local artwork, robots file, and sitemap. The three pages expose correct individual canonical, description, and Open Graph metadata, cross-links, beta enrollment destinations, and publisher contact where applicable. The public sitemap includes all three app URLs among its 22 entries. The published game page was also checked in the browser.

## Wrap It Up! project consolidation — 2 October 2026

- `pnpm build`, `pnpm typecheck`, `pnpm lint`, and all 41 theme/generated-artifact checks pass on Node 22.21.1 and pnpm 10.15.0. Building first refreshed Next.js route types after moving the pages. No dependency or startup-runner changes are needed.
- The existing `/work/[slug]` project template now contains Wrap It Up!'s game overview, official artwork, beta actions, project details, and support navigation. Support and Privacy live beneath `/work/wrap-it-up`; the separate `/apps` implementation is removed.
- Local production requests return 200 for the three canonical routes and 308 for the three previous `/apps` addresses. Redirects preserve query strings. Unknown project slugs return 404. The sitemap contains 21 unique URLs: home, 18 projects, and the two Wrap It Up! help pages, with no `/apps` entries.
- Browser checks cover the merged project on desktop and at 320px, mobile support with an expanded installation FAQ at 320px, and privacy at 390px. Light and dark themes render readable, unclipped content and canonical cross-links. The current distributed version remains 1.0.1 (5) until the next uploads are confirmed.
- Production serves commit `48aadff9631876c76f12f5e89e6b390214f33f25`, verified in the existing aaPanel project log after restarting only `syntaxsurge_portfolio`. The production build completed on the existing Node 24.15.0 configuration and serves loopback port 3101.
- Public HTTPS checks return 200 for the three canonical routes, homepage, artwork, robots file, and sitemap. Each page carries its correct canonical URL, title, description, Open Graph metadata, one H1, and one main landmark. The live sitemap has 21 unique URLs and no `/apps` entries. All three old addresses return 308 to their matching new route while preserving a test query string.
- Live browser verification follows the old game URL to the merged project, checks its desktop and 320px layout, expands the Support installation FAQ at 320px in light mode, and visits Privacy at 390px in dark mode. Canonical navigation and the unchanged beta enrollment and publisher email links work. DNS, routing, permissions, Kaldi, and other services were not changed.

## Wrap It Up! distributed build 6 — 2 October 2026

- The release owner confirmed Google Play internal build 6 completed with matching local/server bundle hashes and TestFlight build 6 approved and available in Public Beta before updating the central website version to 1.0.1 (6).
- The game, Support, and Privacy pages inherit that one version value. The historical Android build 4 SDK-startup warning remains; ads and real-money purchases remain disabled. Canonical routes and beta enrollment links are unchanged.
- `pnpm build`, `pnpm typecheck`, `pnpm lint`, and all 41 theme/generated-artifact checks pass. This refresh changes version copy only; the previously verified responsive layout is unchanged.
- The existing portfolio service serves commit `d66da8c1b49e420289f68ac7328325d875a56b07`, verified in its aaPanel log after restarting only that project. Public HTTPS requests return 200 for all three canonical routes and show 1.0.1 (6), with no current build 5 labels. Privacy retains the earlier build 4 guidance. All three old `/apps` addresses still return permanent 308 redirects to their matching canonical routes.
