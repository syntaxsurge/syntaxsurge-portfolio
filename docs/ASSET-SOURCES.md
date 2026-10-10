# Business website asset sources

Product covers were collected and visually checked on 25 September 2026; supplied business branding, photographs, certificate, and project artwork were checked on 10 October 2026. Images and fonts are served locally. Supplied logo/profile JPEGs and the original certificate are preserved unchanged. Project-owned previews retain their provenance; the MC Dental concept artwork is not a clinic photograph or product-interface capture.

| File in `public/images` | Source | Treatment and accurate description |
| --- | --- | --- |
| `syntaxsurge-logo.jpg` | Original logo supplied by the owner | 640 × 640. Blue lightning bolt and black code brackets on a white background. Copied unchanged; used for business navigation, homepage identity, the social preview, and the self-contained SVG favicon. No redraw, recoloring, or background removal. |
| `jade-laurence-empleo.jpg` | Original founder photograph supplied by the owner | 1254 × 1254. Jade Laurence C. Empleo, founder of SyntaxSurge Software Development Services. Copied unchanged; displayed in the team section. |
| `syntax-surge-workspace.webp` | Working-session photograph supplied by the owner | 1200 × 1600, 277,516 bytes. The unchanged local WebP derivative shows the whiteboard, laptops and two people working together. Displayed beside the hero copy on desktop and beneath it on phones, above the video background. A 4:3 crop at 50% 25% retains both people and the desk. |
| `mc-dental-feature.webp` | Higgsfield GPT Image 2.5 job `80363250-5439-4665-a3ed-cedb538e9c88` | 1600 × 905, 27,420 bytes. Generated clinic concept artwork with a porcelain tooth and abstract appointment/chat/service cards, optimized from the 2688 × 1520 source PNG. It is not a clinic photograph, staff portrait, screenshot, or clinical outcome claim. |
| `studysoda-cover.webp` | Existing `studyroom/public/media/studysoda-hero.webp`; [StudySoda](https://studysoda.com/) | 1400 × 792. Existing brand artwork: lavender flashcards, a notebook, and a lime soda. Use as a brand cover, not as a screenshot or a claim about product UI. |
| `kaldi-cover.webp` | Existing `kaldi-rewards/public/images/kaldi-hero.jpg`; [Kaldi project](https://kaldi-rewards.syntaxsurge.com/) | 1400 × 792. Existing generated campaign artwork used by the Kaldi project. It is a stylized project cover, not a documentary photograph of the venue or a claim of merchant endorsement. |
| `sipava-cover.webp` | [Sipava official campaign artwork](https://sipava.com/store/campaign/google-play-feature.webp), linked by the [Sipava homepage](https://sipava.com/) | 1536 × 750. Official promotional artwork with app screenshots. Sipava describes its showcased tasks and people as fictional showcase data captured in the real product. |
| `cliplore-ai-preview.webp` | Native browser capture of the public workflow preview at [ClipLore.ai](https://cliplore.ai/#showcase), 10 October 2026 | 1070 × 561, 58,842 bytes. The homepage's official product illustration shows its video canvas and four timeline tracks. Cropped from the visible page and converted to WebP at quality 86 without upscaling or redrawing. It is a public product presentation, not a capture of a private project or the native editor. |

The StudySoda, Kaldi, and Sipava cover preparation preserves source proportions and uses WebP quality 86. Originals in neighboring project directories were read only. Public downloads used for those imports are staging material under `.local/asset-source`; they are not needed to serve the business website. The ClipLore.ai source capture is staged under `.local/cliplore-split/` and is not required at runtime.

The supplied logo has SHA-256 `e0c615c276f97ff1a6cef7f7283d2971ea36655a4fc4474f764652256abd87a0`, the founder portrait has SHA-256 `9efc402e86751453f163e346a8e38c9c31912d4a9da0f086464f550256a1b3ad`. The favicon embeds the same logo bytes; the generated social card places that logo beside business copy without altering the source image.

## Complete project previews

`src/data/project-media.ts` maps all 20 project cards to local media, plain-language summaries, and optional demonstrations. Fourteen entries reuse the authentic project-owned images and matching YouTube demos documented in `docs/AWARD-MEDIA-SOURCES.md`; the other entries use official product previews, supplied product/game campaign covers, or MC Dental concept artwork. ClipLore for Story Protocol uses its own authentic preview and demo at `/images/awards/cliplore.webp`; ClipLore.ai uses the public workflow preview and its live product link. Project cards and detail covers share the same canonical image without repeated media captions; descriptive alt text and this source record preserve their context.

The 14 homepage demo buttons create a privacy-enhanced `youtube-nocookie.com` iframe only after the visitor selects a demo. Only one demo is active; closing it removes the player and restores focus. Static local previews do not load a third-party video player.

Suggested image descriptions:

- StudySoda: “StudySoda brand artwork with lavender flashcards, an open notebook, and a lime soda.”
- Kaldi: “Kaldi Coffee project artwork with iced coffee and a croissant.”
- Sipava: “Sipava campaign artwork showing its tasks, social feed, and leaderboard screens.”
- ClipLore.ai: “ClipLore.ai homepage preview with a video canvas and layered timeline.”
- ClipLore for Story Protocol: “ClipLore video IP studio homepage in the hackathon demo.”
- Business logo: “Syntax Surge blue lightning bolt and black code brackets logo”; use empty alt text when the neighboring business name already identifies the navigation link.
- Founder: “Jade Laurence C. Empleo, founder of SyntaxSurge Software Development Services.”
- MC Dental Station: “MC Dental Station project artwork with a porcelain tooth and abstract appointment, chat, and service cards.”

## Hero photograph, loop and service illustrations

`business.workspacePhoto` supplies the original working-session image and intrinsic dimensions. Its preserved WebP has SHA-256 `13eac44bf977c51acb620117050b6bc4d6aada56863f8af6047346ef7e1ad34e`. The hero uses natural content height, with compact phone padding beneath the photograph.

`business.heroMotion` selects `public/images/hero-systems.webp` and `public/videos/hero-systems.mp4`. The blue-glass ribbon and connected modules are decorative software-inspired artwork generated with Higgsfield GPT Image 2.5 job `89fd0ddf-a009-4c66-8e63-c85c109b75b8`. Seedance 2.5 job `6261216a-a07f-4ec8-b55c-3ec285cb5d79` uses that exact completed image for both its `start_image` and `end_image` references, with a locked camera, gentle floating/light-flow motion and no generated audio. No staff, customer product screens, client work or logo are depicted.

The 2688 × 1520 source is optimized to a 1600 × 905 local WebP poster (82,480 bytes). The 8.04-second local video export is a 1280 × 720 H.264 MP4 at 24fps, 398,091 bytes, with no audio and fast-start metadata. It runs as the full-width hero background through the shared `BackgroundVideo` component. The poster is preloaded; the video loads only when visible and playing. Theme overlays keep the heading and actions readable. The global animation selection, offscreen/hidden pause, still fallback and independently named autoplay retry apply to both hero and Work. The sampled optimized first/last frames have a mean absolute RGB difference of 2.6/255; the contact sheet and boundary frames were inspected. No Higgsfield call occurs at website runtime.

The six original, code-native SVG illustrations are `service-websites.svg`, `service-software.svg`, `service-automation.svg`, `service-stores.svg`, `service-booking.svg`, and `service-interactive.svg`, all beneath `public/images/`. `business.services[].image` selects each local asset. They illustrate websites, team tools, connected workflows, catalog/checkout, appointments/reminders, and games/quizzes; they are not customer screenshots or evidence of measured business outcomes.

## Work sculpture and section interactions

`business.workMotion` selects `public/images/work-sculpture.webp` and `public/videos/work-sculpture.mp4`. The 1344 × 752 still was generated with Higgsfield GPT Image 2.5, job `10be034f-a0e5-4d6b-9a3b-35737afe6993`. Seedance 2.5 job `11cda3e5-c60d-4543-af10-a43a31e5a0ea` uses that same completed image as both `start_image` and `end_image`, with a locked camera, gentle orbital motion, eight-second duration, and no generated audio. The sculpture is decorative abstract artwork, not a product screen, logo, or evidence of customer work.

The local WebP poster is 39,422 bytes. The eight-second loop is optimized to a 960 × 540 H.264 MP4 at 24fps, 180,815 bytes, with no audio and fast-start metadata. It is delivered locally, with no Higgsfield request at runtime. Sampled first/last frame mean absolute RGB difference is 1.4/255 after optimization; the contact sheet was visually inspected. The media forms a full-width Work-section background, with a viewport-bounded sticky plane and theme-aware gradient tint behind readable headings, solid controls, and opaque project cards. The poster remains visible until native video playback starts. The video source is assigned only after the container enters view while motion is permitted; offscreen/hidden states pause playback. The site defaults to playing independently of device motion preference; the footer’s persistent Pause animations / Play animations action controls all decorative loops. A rejected autoplay attempt leaves a manual retry, while fatal media errors retain the poster.

The founder’s bracket companion, registration shield, wireframe cube, service layers, and section entrances are original code-native SVG/CSS artwork. The companion waves and floats continuously, the cube rotates on phones and desktops, and service layers float and orbit while visible. Section entrances run once. All follow the shared site motion selection, with still media when paused. The supplied founder photograph and original certificate remain unchanged; project inquiries use the visible email or LinkedIn links.

## Fonts

The heading font is [Space Grotesk from its official source repository](https://github.com/floriankarsten/space-grotesk), stored locally as `public/fonts/space-grotesk-variable.woff2` with its SIL Open Font License in `public/fonts/OFL.txt`. Next's local-font loader includes the font in the site's generated static assets. Geist body text and Geist Mono use Next's self-hosted font delivery; the visitor does not fetch a third-party font stylesheet. Typography settings live in the layout and shared stylesheet.

## Business registration certificate

The original owner-supplied `BNRS-Certificate_OPQT791819131516_4fa16974-d870-4131-a5e5-1b61dcec90fd.pdf` is copied unchanged to `public/documents/syntax-surge-dti-certificate.pdf`. Its SHA-256 is `db52b08e38761e63dfc8b8ae68a7a8a334de45eedf9e0bbd519bf18ba9a5544c`. `public/images/syntax-surge-dti-certificate.png` is a 778 × 1100 rendering of the complete, single A4 page; it is not a recreated, edited, or replacement certificate. The registration section displays that preview and offers direct PDF view/download actions using `src/data/business.ts`.

The certificate spells the legal name **SYNTAXSURGE SOFTWARE DEVELOPMENT SERVICES**, without a space between Syntax and Surge. The public business brand remains **Syntax Surge**. Document-derived registration facts are recorded in `docs/CONTENT-SOURCES.md`; asset availability does not imply an independently checked ongoing government registration status or a completed live deployment.

## Professional resume

`public/documents/jade-laurence-empleo-resume.pdf` is the two-page A4 resume generated by `scripts/build-resume.py` from canonical site data. It includes the unchanged supplied portrait, preferred display name with a middle initial, complete DTI-registered business name, business email, three project examples, all 14 dated recognitions with supplied prize amounts, and website/profile links. `business.resumeHref` supplies the public path, and `business.founder.name` supplies Jade Laurence C. Empleo; the certificate-confirmed full name remains internal source data. Hero and team View résumé buttons open a shared dialog with a direct download of that PDF. `public/images/resume-page-1.webp` and `resume-page-2.webp` are 1200 × 1698 Poppler renderings of its two pages, optimized as WebP without editing document content. They are 136,574 and 116,486 bytes respectively. The generator stages and verifies all three outputs before publishing them together, so a rendering failure leaves the public documents intact. Preview pages load only when the dialog is open; the application needs no PDF plugin or external document service. The complete source/rebuild record is in `docs/RESUME-SOURCES.md`.

## Wrap It Up!

`public/images/wrap-it-up-cover.webp` is a 1024×500 WebP derivative of the approved `docs/store/feature-graphic-1024x500.png` from the owner’s Wrap It Up! repository. It is official promotional artwork, not a gameplay screenshot. The source uses paper/ribbon/gift scenery and excludes the character artwork under the app’s separate release audit. Converted locally at quality 88; no external image service is used at runtime.
