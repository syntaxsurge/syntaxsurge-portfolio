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

aaPanel deployment is blocked by the browser tool's administrator-enforced policy-check service being unavailable. The aaPanel project and Nginx changes remain unapplied; these local tests are not live server verification.
