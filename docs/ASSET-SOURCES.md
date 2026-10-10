# Business website asset sources

Product covers were collected and visually checked on 25 September 2026; supplied business branding, photographs, certificate, and project artwork were checked on 10 October 2026. Images and fonts are served locally. Supplied logo/profile JPEGs and the original certificate are preserved unchanged. Project-owned previews retain their provenance; the MC Dental concept artwork is not a clinic photograph or product-interface capture.

| File in `public/images` | Source | Treatment and accurate description |
| --- | --- | --- |
| `syntaxsurge-logo.jpg` | Original logo supplied by the owner | 640 × 640. Blue lightning bolt and black code brackets on a white background. Copied unchanged; used for business navigation, homepage identity, the social preview, and the self-contained SVG favicon. No redraw, recoloring, or background removal. |
| `jade-laurence-empleo.jpg` | Original founder photograph supplied by the owner | 1254 × 1254. Jade Laurence Empleo, founder of Syntax Surge. Copied unchanged; displayed in the team section. |
| `syntax-surge-workspace.webp` | Workspace photograph supplied by the owner | 1200 × 1600, 277,516 bytes. Local WebP derivative showing a software planning session, whiteboard, and laptops. Used as the hero photograph; no staff identities or client engagement are inferred from the scene. |
| `mc-dental-feature.webp` | Higgsfield GPT Image 2.5 job `80363250-5439-4665-a3ed-cedb538e9c88` | 1600 × 905, 27,420 bytes. Generated clinic concept artwork with a porcelain tooth and abstract appointment/chat/service cards, optimized from the 2688 × 1520 source PNG. It is not a clinic photograph, staff portrait, screenshot, or clinical outcome claim. |
| `studysoda-cover.webp` | Existing `studyroom/public/media/studysoda-hero.webp`; [StudySoda](https://studysoda.com/) | 1400 × 792. Existing brand artwork: lavender flashcards, a notebook, and a lime soda. Use as a brand cover, not as a screenshot or a claim about product UI. |
| `kaldi-cover.webp` | Existing `kaldi-rewards/public/images/kaldi-hero.jpg`; [Kaldi project](https://kaldi-rewards.syntaxsurge.com/) | 1400 × 792. Existing generated campaign artwork used by the Kaldi project. It is a stylized project cover, not a documentary photograph of the venue or a claim of merchant endorsement. |
| `sipava-cover.webp` | [Sipava official campaign artwork](https://sipava.com/store/campaign/google-play-feature.webp), linked by the [Sipava homepage](https://sipava.com/) | 1536 × 750. Official promotional artwork with app screenshots. Sipava describes its showcased tasks and people as fictional showcase data captured in the real product. |
| `cliplore-cover.webp` | Existing `cliplore-production/public/images/home/video-posters/aurora-liquid-waves-hero.jpg`; [ClipLore.ai](https://cliplore.ai/) | 480 × 270. Abstract blue/teal video-poster artwork from the existing homepage. Suitable as a decorative background; not a UI screenshot. No upscaling applied. |

The StudySoda, Kaldi, Sipava, and ClipLore cover preparation preserves source proportions and uses WebP quality 86. Originals in neighboring project directories were read only. Public downloads used for those imports are staging material under `.local/asset-source`; they are not needed to serve the business website.

The supplied logo has SHA-256 `e0c615c276f97ff1a6cef7f7283d2971ea36655a4fc4474f764652256abd87a0`, the founder portrait has SHA-256 `9efc402e86751453f163e346a8e38c9c31912d4a9da0f086464f550256a1b3ad`, and the workspace WebP has SHA-256 `13eac44bf977c51acb620117050b6bc4d6aada56863f8af6047346ef7e1ad34e`. The favicon embeds the same logo bytes; the generated social card places that logo beside business copy without altering the source image.

## Complete project previews

`src/data/project-media.ts` maps all 19 project cards to local media, labels, summaries, and optional demonstrations. Fourteen entries reuse the authentic project-owned images and matching YouTube demos documented in `docs/AWARD-MEDIA-SOURCES.md`; the other entries use the supplied product/game campaign covers or MC Dental concept artwork. ClipLore's hackathon preview is labeled separately from its current product artwork. MC Dental's public label is “Project artwork”; the generation job and source are recorded above. No generic placeholder or newly invented screenshot is substituted for the other project previews.

The 14 homepage demo buttons create a privacy-enhanced `youtube-nocookie.com` iframe only after the visitor selects a demo. Only one demo is active; closing it removes the player and restores focus. Static local previews do not load a third-party video player.

Suggested image descriptions:

- StudySoda: “StudySoda brand artwork with lavender flashcards, an open notebook, and a lime soda.”
- Kaldi: “Kaldi Coffee project artwork with iced coffee and a croissant.”
- Sipava: “Sipava campaign artwork showing its tasks, social feed, and leaderboard screens.”
- ClipLore background: use empty alt text when a nearby project title already identifies the card.
- Business logo: “Syntax Surge blue lightning bolt and black code brackets logo”; use empty alt text when the neighboring business name already identifies the navigation link.
- Founder: “Jade Laurence Empleo, founder of Syntax Surge.”
- MC Dental Station: “MC Dental Station project artwork with a porcelain tooth and abstract appointment, chat, and service cards.”

## Hero photograph and service illustrations

`business.heroPortrait` supplies the local workspace photograph and intrinsic dimensions. `HeroPortrait` adds decorative CSS particles without altering the photo file. Particles respect reduced-motion preference, pause outside the viewport or a hidden tab, and have a user-controlled pause action. The photograph remains visible independently of animation.

The three original, code-native SVG illustrations are `public/images/service-websites.svg`, `public/images/service-software.svg`, and `public/images/service-automation.svg`. `business.services[].image` selects each local asset. These are illustrations of service concepts, not screenshots of customer applications or evidence of measured business outcomes.

## Fonts

The heading font is [Space Grotesk from its official source repository](https://github.com/floriankarsten/space-grotesk), stored locally as `public/fonts/space-grotesk-variable.woff2` with its SIL Open Font License in `public/fonts/OFL.txt`. Next's local-font loader includes the font in the site's generated static assets. Geist body text and Geist Mono use Next's self-hosted font delivery; the visitor does not fetch a third-party font stylesheet. Typography settings live in the layout and shared stylesheet.

## Business registration certificate

The original owner-supplied `BNRS-Certificate_OPQT791819131516_4fa16974-d870-4131-a5e5-1b61dcec90fd.pdf` is copied unchanged to `public/documents/syntax-surge-dti-certificate.pdf`. Its SHA-256 is `db52b08e38761e63dfc8b8ae68a7a8a334de45eedf9e0bbd519bf18ba9a5544c`. `public/images/syntax-surge-dti-certificate.png` is a 778 × 1100 rendering of the complete, single A4 page; it is not a recreated, edited, or replacement certificate. The registration section displays that preview and offers direct PDF view/download actions using `src/data/business.ts`.

The certificate spells the legal name **SYNTAXSURGE SOFTWARE DEVELOPMENT SERVICES**, without a space between Syntax and Surge. The public business brand remains **Syntax Surge**. Document-derived registration facts are recorded in `docs/CONTENT-SOURCES.md`; asset availability does not imply an independently checked ongoing government registration status or a completed live deployment.

## Professional resume

`public/documents/jade-laurence-empleo-resume.pdf` is the two-page A4 resume generated by `scripts/build-resume.py` from canonical site data. It includes the unchanged supplied portrait, full name, business email, three project examples, all 14 dated recognitions, and website/profile links. `business.resumeHref` supplies the public path, and `business.founder.fullName` supplies the certificate-confirmed full name. Header, hero, and team downloads use the same PDF. The complete source/rebuild record is in `docs/RESUME-SOURCES.md`.

## Wrap It Up!

`public/images/wrap-it-up-cover.webp` is a 1024×500 WebP derivative of the approved `docs/store/feature-graphic-1024x500.png` from the owner’s Wrap It Up! repository. It is official promotional artwork, not a gameplay screenshot. The source uses paper/ribbon/gift scenery and excludes the character artwork under the app’s separate release audit. Converted locally at quality 88; no external image service is used at runtime.
