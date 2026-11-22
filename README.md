# SyntaxSurge Software Development Services

A Next.js business website for Syntax Surge, a Philippine software studio building websites, apps and automation for businesses worldwide. The homepage presents illustrated services, the remote collaboration process, 28 searchable projects, leadership profiles for founder and CEO Jade Laurence C. Empleo and CMO Mariy Krishan, Adam Bashar Faleh, business registration, and direct email and LinkedIn contact. The recognition page presents all 14 founder hackathon recognitions. The supplied logo, leadership portraits, and workspace hero photograph are served locally. Light and dark themes follow the device preference initially and remember an explicit choice.

- `/`: business overview, services, the collaboration process, the searchable project collection at `#work`, team, registration, and contact.
- `/work`: permanent redirect to `/#work`.
- `/recognition`: all founder recognitions and their project previews/demos.
- `/work/[slug]`: project details, including [MC Dental Station](https://syntaxsurge.com/work/mc-dental-station) and Wrap It Up!.

The business brand is **Syntax Surge**; its registered legal name is **SyntaxSurge Software Development Services**. The registration section shows National scope, Business Name No. 8161608, and a rendered certificate preview, with view/download actions for the [unchanged original DTI PDF](public/documents/syntax-surge-dti-certificate.pdf). `src/data/business.ts` stores its verified document facts and local asset paths.

Business inquiries open [syntaxsurge@gmail.com](mailto:syntaxsurge@gmail.com) in the visitor's email application; LinkedIn is also available. The site does not send messages or collect inquiries through a form.

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
```

The homepage, recognition page, 28 project detail routes, and two game support/privacy pages are rendered at build time, with 32 unique sitemap URLs. Project search/filter controls, theme selection, and media controls use client state. This business website needs no database, secrets, login, contact-form provider, or analytics integration; linked applications have their own integrations. Images, SVG service illustrations, Space Grotesk headings, and Geist body fonts are served locally. Homepage project demos load in a privacy-enhanced inline player only after an explicit play action, with one active demo, a close control, and focus restoration; detail/recognition pages retain direct external demo links. The homepage uses local decorative video loops and viewport-aware animations, with a shared pause control in the footer. A generated PNG provides the business social-sharing preview.

## Professional resume

The [two-page PDF resume](public/documents/jade-laurence-empleo-resume.pdf) includes the professional name Jade Laurence C. Empleo, supplied profile photograph and business email, three project examples, all 14 dated recognitions, and website/GitHub/LinkedIn links. The hero and CEO profile open a shared preview dialog with a PDF download.

`scripts/build-resume.py` reads canonical site data and generates the PDF with ReportLab; rebuilding requires the supported Node version plus Python 3.9+ and `reportlab`. Python is an authoring dependency, not a deployed website requirement. Sources and rebuild instructions are in [the resume source record](docs/RESUME-SOURCES.md).

## Production deployment

The site runs in Dokploy under **SyntaxSurge / production / Portfolio**. Its Docker Compose build context pins a full GitHub `main` commit. To publish, update the pin to the verified pushed SHA, deploy the existing service, and confirm container health and release content at [syntaxsurge.com](https://syntaxsurge.com). The [deployment guide](docs/DEPLOY-SYNTAXSURGE.md) covers configuration, public checks, and rollback.

## Wrap It Up! app pages

- [Game and project](https://syntaxsurge.com/work/wrap-it-up)
- [Support](https://syntaxsurge.com/work/wrap-it-up/support)
- [Privacy](https://syntaxsurge.com/work/wrap-it-up/privacy)

The game information extends the existing project-detail template, with Support and Privacy beneath that project. These static pages share business navigation, artwork, and theme. The three `/apps/wrap-it-up` addresses are permanent redirects for already installed beta links; they have no separate pages or sitemap entries. `src/data/wrap-it-up.ts` stores version-scoped release facts, territorial age ratings, tester links, closed-test availability, and the verified support address. Update the current build only after the relevant distribution channels are verified. Enable the closed-test enrollment link only after the Alpha release is available; internal testers must leave internal testing before opting into the closed test. Privacy copy follows the app release audit: progress/captures are local, no player account or gameplay backend exists, ads and IAP are disabled, and packaged SDKs are disclosed without a blanket network-free claim. Update the policy alongside any change to runtime data handling.

## Edit content

- `src/data/business.ts`: business identity, illustrated services, leadership profiles and portraits, email/contact links, workspace hero photograph, resume path, and certificate facts/PDF path/preview dimensions.
- `src/data/portfolio.ts`: projects, real links, and awards.
- `src/data/award-media.ts`: local project previews and verified YouTube demos for all 14 recognitions.
- `src/data/project-media.ts`: media, summaries, labels, and optional demos for all 28 project cards, reusing project-owned previews and product artwork.
- `src/app/page.tsx`: business homepage and full searchable project collection.
- `src/app/recognition/page.tsx`: founder recognition record.
- `src/components/project-visual.tsx`: reusable project visuals for detail pages.
- `src/components/leadership-cards.tsx`: shared profile cards, social links and portrait motion.
- `src/app/globals.css`: palette, typography, layout, and responsive styles.
- `src/lib/theme.ts`: stored preference, device preference, cross-tab synchronization, and early theme initialization.
- `docs/CONTENT-SOURCES.md`: content provenance and historical project distinctions.
- `docs/ASSET-SOURCES.md`: visual provenance; campaign imagery is not presented as a product screenshot.
- `docs/AWARD-MEDIA-SOURCES.md`: provenance for recognition previews and demo videos. Project images illustrate the work; they are not award certificates.

Recognition details originate from the founder’s supplied award history and do not imply company client counts or 14 first-place wins. USD and MUSD prizes remain separate. No revenue or user statistics are invented. Website, product, and demo links open directly; project inquiries use the supplied business email or founder's LinkedIn profile.

## Accessibility and verification

The shared sticky navigation leads to homepage Services/Work/Team and the current page's Contact footer on phones, tablets, and desktop. The Work section shows 11 projects at first, with a control to reveal all 28, search across the full collection, category/result counts, one-click reset and direct details/website/demo actions. Project pages include breadcrumbs and an easy return to `/#work`; missing pages offer clear recovery links and contact options. All recognition entries are visible on `/recognition`, with preview highlights and compact cards. The footer also links to recognition and business registration. Demo players and decorative motion controls support keyboard interaction and visible focus.

Semantic landmarks, a focusable skip destination, labeled search and theme controls, visible keyboard focus, live filter announcements, focus restoration after reset, alt text, and reduced-motion support are included. Main body copy is 17–18px, with larger headings and touch targets. Validation is recorded in `docs/VALIDATION.md`.
