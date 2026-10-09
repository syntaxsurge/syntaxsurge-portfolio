# Business website asset sources

Product covers were collected and visually checked on 25 September 2026; supplied business branding, the founder portrait, certificate, and generated concept assets were checked on 10 October 2026. Images and hero motion are served locally. Supplied JPEGs and the original certificate are preserved unchanged. Project-owned previews retain their provenance; generated hero/clinic concept artwork is labeled and does not depict an actual clinic, staff photograph, or product interface.

| File in `public/images` | Source | Treatment and accurate description |
| --- | --- | --- |
| `syntaxsurge-logo.jpg` | Original logo supplied by the owner | 640 × 640. Blue lightning bolt and black code brackets on a white background. Copied unchanged; used for business navigation, homepage identity, the social preview, and the self-contained SVG favicon. No redraw, recoloring, or background removal. |
| `jade-laurence-empleo.jpg` | Original founder photograph supplied by the owner | 1254 × 1254. Jade Laurence Empleo, founder of Syntax Surge. Copied unchanged; displayed in the team section. |
| `hero-loop-poster.webp` | Higgsfield GPT Image 2.5 job `92406bea-e7b2-49f4-ad1e-f74860e051a5` | 1600 × 905, 62,872 bytes. Generated business/technology concept artwork, optimized from the 2688 × 1520 source PNG by resizing and format conversion. This is the still poster and source image for the local hero loop, not a product screenshot. |
| `mc-dental-feature.webp` | Higgsfield GPT Image 2.5 job `80363250-5439-4665-a3ed-cedb538e9c88` | 1600 × 905, 27,420 bytes. Generated clinic concept artwork with a porcelain tooth and abstract appointment/chat/service cards, optimized from the 2688 × 1520 source PNG. It is not a clinic photograph, staff portrait, screenshot, or clinical outcome claim. |
| `studysoda-cover.webp` | Existing `studyroom/public/media/studysoda-hero.webp`; [StudySoda](https://studysoda.com/) | 1400 × 792. Existing brand artwork: lavender flashcards, a notebook, and a lime soda. Use as a brand cover, not as a screenshot or a claim about product UI. |
| `kaldi-cover.webp` | Existing `kaldi-rewards/public/images/kaldi-hero.jpg`; [Kaldi project](https://kaldi-rewards.syntaxsurge.com/) | 1400 × 792. Existing generated campaign artwork used by the Kaldi project. It is a stylized project cover, not a documentary photograph of the venue or a claim of merchant endorsement. |
| `sipava-cover.webp` | [Sipava official campaign artwork](https://sipava.com/store/campaign/google-play-feature.webp), linked by the [Sipava homepage](https://sipava.com/) | 1536 × 750. Official promotional artwork with app screenshots. Sipava describes its showcased tasks and people as fictional showcase data captured in the real product. |
| `cliplore-cover.webp` | Existing `cliplore-production/public/images/home/video-posters/aurora-liquid-waves-hero.jpg`; [ClipLore.ai](https://cliplore.ai/) | 480 × 270. Abstract blue/teal video-poster artwork from the existing homepage. Suitable as a decorative background; not a UI screenshot. No upscaling applied. |

The StudySoda, Kaldi, Sipava, and ClipLore cover preparation preserves source proportions and uses WebP quality 86. Originals in neighboring project directories were read only. Public downloads used for those imports are staging material under `.local/asset-source`; they are not needed to serve the business website.

The supplied logo has SHA-256 `e0c615c276f97ff1a6cef7f7283d2971ea36655a4fc4474f764652256abd87a0`, and the founder portrait has SHA-256 `9efc402e86751453f163e346a8e38c9c31912d4a9da0f086464f550256a1b3ad`. The favicon embeds the same logo bytes; the generated social card places that logo beside business copy without altering the source image.

## Complete project previews

`src/data/project-media.ts` maps all 19 project cards to local media, labels, summaries, and optional demonstrations. Fourteen entries reuse the authentic project-owned images and matching YouTube demos documented in `docs/AWARD-MEDIA-SOURCES.md`; the other entries use the supplied product/game campaign covers or the labeled MC Dental concept artwork. ClipLore's hackathon preview is labeled separately from its current product artwork. No generic placeholder or newly invented screenshot is substituted for the other project previews.

The 14 homepage demo buttons create a privacy-enhanced `youtube-nocookie.com` iframe only after the visitor selects a demo. Only one demo is active; closing it removes the player and restores focus. Static local previews do not load a third-party video player.

Suggested image descriptions:

- StudySoda: “StudySoda brand artwork with lavender flashcards, an open notebook, and a lime soda.”
- Kaldi: “Kaldi Coffee project artwork with iced coffee and a croissant.”
- Sipava: “Sipava campaign artwork showing its tasks, social feed, and leaderboard screens.”
- ClipLore background: use empty alt text when a nearby project title already identifies the card.
- Business logo: “Syntax Surge blue lightning bolt and black code brackets logo”; use empty alt text when the neighboring business name already identifies the navigation link.
- Founder: “Jade Laurence Empleo, founder of Syntax Surge.”
- MC Dental Station: “AI-generated MC Dental Station artwork with a porcelain tooth and abstract appointment, chat, and service cards.”

## Hero motion

Higgsfield Seedance 2.5 job `1d5b3211-c973-47ca-a4ab-c0718aad532e` generated a silent 1920 × 1080 source. The same hero still from job `92406bea-e7b2-49f4-ad1e-f74860e051a5` was supplied as both the start and end image. The source is retained as `.local/creative-refresh/hero-source.mp4` for authoring provenance, not runtime delivery.

`public/videos/hero-loop.mp4` is the browser-compatible runtime encode: H.264 High profile, 1280 × 720, 24 frames/second, 8.04 seconds, 648,571 bytes, with no audio stream. Faststart metadata precedes media data for progressive playback. Only the final source frame was aligned to the first before encoding; the decoded first/last runtime frames match. `business.heroMotion.src` points to this file and `hero-loop-poster.webp` supplies its local poster. It is concept motion, not a recording of an actual application. Playback is muted, pauses outside the viewport or hidden tab, offers a pause control, and uses the poster when reduced motion is preferred.

## Business registration certificate

The original owner-supplied `BNRS-Certificate_OPQT791819131516_4fa16974-d870-4131-a5e5-1b61dcec90fd.pdf` is copied unchanged to `public/documents/syntax-surge-dti-certificate.pdf`. Its SHA-256 is `db52b08e38761e63dfc8b8ae68a7a8a334de45eedf9e0bbd519bf18ba9a5544c`. `public/images/syntax-surge-dti-certificate.png` is a 778 × 1100 rendering of the complete, single A4 page; it is not a recreated, edited, or replacement certificate. The registration section displays that preview and offers direct PDF view/download actions using `src/data/business.ts`.

The certificate spells the legal name **SYNTAXSURGE SOFTWARE DEVELOPMENT SERVICES**, without a space between Syntax and Surge. The public business brand remains **Syntax Surge**. Document-derived registration facts are recorded in `docs/CONTENT-SOURCES.md`; asset availability does not imply an independently checked ongoing government registration status or a completed live deployment.

## Professional resume

`public/documents/jade-laurence-empleo-resume.pdf` is the two-page A4 resume generated by `scripts/build-resume.py` from canonical site data. It includes the unchanged supplied portrait, full name, three project examples, all 14 dated recognitions, and existing contact links. `business.resumeHref` supplies the public path, and `business.founder.fullName` supplies the certificate-confirmed full name. The complete source/rebuild record is in `docs/RESUME-SOURCES.md`.

## Wrap It Up!

`public/images/wrap-it-up-cover.webp` is a 1024×500 WebP derivative of the approved `docs/store/feature-graphic-1024x500.png` from the owner’s Wrap It Up! repository. It is official promotional artwork, not a gameplay screenshot. The source uses paper/ribbon/gift scenery and excludes the character artwork under the app’s separate release audit. Converted locally at quality 88; no external image service is used at runtime.
