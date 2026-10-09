After you finish each task, please provide a one-line GitHub commit message that I can use to manually commit the changes you made. Keep the message focused only on your changes from my latest prompt and your response, since I’ll be working on this repository with multiple AI agents. When creating the commit message, don’t rely on git diff or porcelain commands; instead, rely on my latest prompt and your latest response to create the best commit message.
Write one Git commit message using Conventional Commits: <type>(<scope>): <imperative summary>. Keep it under 72 characters, describe what changed and why, use lowercase type, and no period at the end.

# Agent Playbook (Living Document)

This file is the authoritative reference for platform architecture and agent expectations. It must always describe the current, production-ready state of the system—never legacy behavior. Update this file alongside any material feature change. Only capture structural, user-visible, or integration-impacting details; omit trivia. When we remove/replace something, like a feature, I DO NOT want you to document the removal or replacement here, but instead, if that feature is documented here currently, I want you to just remove it if we done removal and replace it with teh new feature if we did replacement. The reason is that I only want to support latest versions of my application here without documenting the previous iterations, this file should serve as the current machination explanation of my codebase and not for changelogs. If any previous version explanation is present here, then it should be removed. Do not also imply that we just implemented a certain feature here, by using words like "we now have this X feature" since I only want to imply that the features we have iin our application was in here already initially, without any implications of the new changes we made.

## Documentation Expectations

- Update this document whenever routes, flows, data contracts, or integration requirements change.
- Describe the latest behavior succinctly; avoid references to prior implementations.
- Skip minor cosmetic tweaks—limit entries to structural or behavioral updates that affect future engineering work.

## Engineering Principles

1. **Import cleanly, delete legacy.** Never add re‑exports or preserve legacy APIs. Always import from canonical sources and remove unused branches, empty blocks, or deprecated files during every change.

2. **Extend before you create.** Before writing new functions, components, or libraries, analyze existing ones in `src/lib`, shared UI, and feature modules. Check related files for possible extension points—props, return types, or configuration options. Prefer enhancing them by adding parameters or return variants rather than duplicating logic. Only build something new when there’s *no existing code* that can be extended without harm.

3. **Simplify through reuse.** If you or the AI analysis discover that a piece of code can be simplified by calling an existing component, function, or library instead of re‑implementing logic, refactor it. Merge redundant utilities or components when their behavior overlaps and eliminate unnecessary abstractions. The codebase should always converge toward fewer, more capable building blocks.

4. **Be minimal and accessible.** All new pages and components should follow the modern, minimal UI style—clean, responsive, and accessible (ARIA labels, focus states, keyboard navigation, color contrast). Avoid over‑engineering or speculative flexibility.

5. **Type‑sound and consistent.** Run `pnpm typecheck` before merging. Maintain consistent naming, small API surfaces, and clear defaults. Remove unused files and ensure new or extended helpers live in canonical locations to encourage immediate reuse.

### Examples

* Instead of creating `formatDate2`, extend `formatDate` with `options: { locale?: string; format?: string }`.
* Replace custom loaders with an existing `Spinner` component configured via props rather than duplicating markup.
* If two button variants differ only in color and spacing, merge them into one component with configurable variants.
* When adding a new fetch utility, inspect existing APIs—if a related `fetchData` exists, add optional parameters or expand return types instead of building another function.

### Guiding Mindset

Analyze → Extend → Simplify → Delete. Every change should either improve clarity, reduce duplication, or enable reuse. Only create new code when absolutely necessary and back it with clear reasoning in the PR description.

**KEEP THE HEADINGS CONTENTS BELOW UPDATED:**


# Platform Summary

A Next.js App Router business website for SyntaxSurge Software Development Services, branded as Syntax Surge. It presents business websites, custom software, and AI/automation services, with 19 projects and 14 hackathon recognitions earned by founder Jade Laurence Empleo. Supplied business branding, founder photography, and project artwork are served locally. Pages support light and dark themes and responsive, keyboard-accessible navigation.

## Pages

- `/`: business overview, services (`#services`), three selected projects (`#work`), founder/team (`#team`), business registration (`#registration`), and contact (`#contact`). The shared sticky header links to homepage Services/Team, `/work`, and the current page's contact footer on every screen size. The homepage's work action reaches selected examples; separate links lead to the full collection and recognition pages.
- `/work`: the searchable collection of 19 projects, with All projects, Products, AI & Web3, and Tools filters, category/result counts, combined search and filtering, one-click reset with search focus restoration, and direct project/product/demo/source actions.
- `/recognition`: all 14 founder hackathon recognitions, with four preview highlights and compact cards for the remaining entries. Awards are individual project achievements, not a count of business clients or first-place wins.
- `/work/[slug]`: statically generated project details with breadcrumbs, product/demo/source actions, project focus, recognition, and links to the next project and full collection. `/work/wrap-it-up` combines these project details with the game overview, gameplay features, artwork, beta-install actions, and shared Support/Privacy navigation.
- `/work/mc-dental-station`: clinic website project details covering staff-confirmed appointment requests, approved English/Filipino FAQ assistance, and the staff workspace; the live website is `https://mc-dental.syntaxsurge.com/`.
- `/work/wrap-it-up/support` and `/work/wrap-it-up/privacy`: statically generated beta-install/support and version-scoped privacy pages beneath the game’s project. `src/data/wrap-it-up.ts` owns the canonical project path, internal/closed beta links, verified closed-test availability, current disclosed build, territorial store ratings, approved local artwork, and verified publisher support email. Shared game-detail components present the same ratings and closed-test enrollment guidance across the game, support and privacy pages. Android testing is allowlist-only; closed enrollment appears only after release availability is verified, and internal testers must leave that track before joining a closed test. TestFlight availability follows Apple review and group access. `next.config.ts` permanently redirects the three `/apps/wrap-it-up` addresses to their matching project routes so installed beta links remain usable; they have no separate pages, navigation links, or sitemap entries.
- Missing routes display a recovery page with links to the full collection and homepage, plus shared contact options.
- Contact opens the founder's existing LinkedIn profile directly; GitHub, full collection, recognition, and registration links are available in the footer. The registration section presents the certificate's exact legal business name, SyntaxSurge Software Development Services, National scope, and Business Name No. 8161608, with a local certificate preview plus view/download actions for the unchanged original PDF at `/documents/syntax-surge-dti-certificate.pdf`.

## API endpoints

There are no application API endpoints, database, authentication, contact form, or visitor tracking integrations. `/sitemap.xml`, `/robots.txt`, and `/opengraph-image` provide generated search and social metadata.

## Architecture Overview

- `src/data/business.ts` is the canonical source for the business brand/legal name, service descriptions, supplied logo, founder identity/portrait, existing contact links, and registration certificate facts/assets. `certificate.href` points to the original local PDF; `certificate.preview` supplies the rendered image's `src`, `width`, and `height`.
- `src/data/portfolio.ts` is the canonical project, link, optional project-focus, and award data source; `src/data/award-media.ts` maps recognitions to local previews and YouTube demos. Homepage selected work features MC Dental Station, Kaldi, and ClipLore.
- Shared components provide business navigation/contact, project artwork, award cards, demo previews, search/filter controls, and theme controls. `AwardCard` supports preview and compact layouts. Business metadata, the social preview, and the favicon use Syntax Surge branding; the supplied logo is preserved.
- Search/filter state lives in `ProjectArchive`. `src/lib/theme.ts` manages device preference, persisted selections, cross-tab updates, and initialization before visible content.
- `src/app/globals.css` defines shared theme tokens, typography, layouts, focus states, responsive rules, and reduced-motion support. Images and fonts are served locally; videos open externally on request.
- `src/lib/site.ts` supplies the canonical HTTP(S) origin from `SITE_URL`, defaulting to `https://syntaxsurge.com`. The sitemap has 24 unique business-site URLs: homepage, work collection, recognition, 19 project details, and two game support/privacy pages.
- `scripts/serve.mjs` synchronizes a server checkout to pushed `origin/main`, prepares isolated production releases, reuses matching builds, and supports fallback to a compatible successful release. Runtime files stay outside the source checkout. Configuration and deployment requirements are in `docs/DEPLOY-SYNTAXSURGE.md`.
- Production routing requires the `syntaxsurge.com` Nginx vhost to proxy business-site requests over HTTP to `127.0.0.1:3101`. Linked projects such as Kaldi (`https://kaldi-rewards.syntaxsurge.com/`) and MC Dental Station (`https://mc-dental.syntaxsurge.com/`) use independent domain routing and deployment configuration. Startup readiness checks the private business-site listener; public routing and ongoing service health are verified separately using the deployment guide's gateway diagnostics.

## Core Commands

- `pnpm dev`: development preview on port 3001.
- `pnpm typecheck`: TypeScript verification without emitting files.
- `pnpm lint`: ESLint verification.
- `pnpm build`: production build and static page generation.
- `pnpm test`: theme behavior and generated route/content/accessibility checks; requires a completed build.
- `pnpm test:startup`: isolated server-runner integration tests.
- `pnpm start`: serve an existing production build.
- `pnpm deploy:server` / `pnpm serve`: server update runner; force-syncs the source checkout and discards local source changes. Use only for configured server deployments.
- Supported tooling is Node.js 22.21.1+ in the 22.x series or 24.15.0+ in the 24.x series, with pnpm 10.15.0.
