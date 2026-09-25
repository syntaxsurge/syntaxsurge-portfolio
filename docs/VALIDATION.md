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
