# Business website asset sources

Product covers were collected and visually checked on 25 September 2026; supplied business branding, the founder portrait, and approved MC Dental Station media were checked on 10 October 2026. All images are served locally. Supplied JPEGs and the approved clinic WebP are preserved unchanged; other project covers use local WebP derivatives. No product screenshots, people, or registration documents were fabricated.

| File in `public/images` | Source | Treatment and accurate description |
| --- | --- | --- |
| `syntaxsurge-logo.jpg` | Original logo supplied by the owner | 640 × 640. Blue lightning bolt and black code brackets on a white background. Copied unchanged; used for business navigation, homepage identity, the social preview, and the self-contained SVG favicon. No redraw, recoloring, or background removal. |
| `jade-laurence-empleo.jpg` | Original founder photograph supplied by the owner | 1254 × 1254. Jade Laurence Empleo, founder of Syntax Surge. Copied unchanged; displayed in the team section. |
| `mc-dental-cover.webp` | Owner's `mc-dental-station/deployment/approved-media/c0052d1d-f898-49be-89bd-853a1333cde6.webp`; clinic `docs/PHOTO_SOURCES.md` links the [first-party team post](https://www.instagram.com/mcdentalstation/p/Dd_C3AFs2FF/) | 1080 × 1382. Already-approved clinic team photograph, copied byte-for-byte from the verified deployment payload. It depicts MC Dental Station staff, not the Syntax Surge team, and is not a website screenshot. |
| `studysoda-cover.webp` | Existing `studyroom/public/media/studysoda-hero.webp`; [StudySoda](https://studysoda.com/) | 1400 × 792. Existing brand artwork: lavender flashcards, a notebook, and a lime soda. Use as a brand cover, not as a screenshot or a claim about product UI. |
| `kaldi-cover.webp` | Existing `kaldi-rewards/public/images/kaldi-hero.jpg`; [Kaldi project](https://kaldi-rewards.syntaxsurge.com/) | 1400 × 792. Existing generated campaign artwork used by the Kaldi project. It is a stylized project cover, not a documentary photograph of the venue or a claim of merchant endorsement. |
| `sipava-cover.webp` | [Sipava official campaign artwork](https://sipava.com/store/campaign/google-play-feature.webp), linked by the [Sipava homepage](https://sipava.com/) | 1536 × 750. Official promotional artwork with app screenshots. Sipava describes its showcased tasks and people as fictional showcase data captured in the real product. |
| `cliplore-cover.webp` | Existing `cliplore-production/public/images/home/video-posters/aurora-liquid-waves-hero.jpg`; [ClipLore.ai](https://cliplore.ai/) | 480 × 270. Abstract blue/teal video-poster artwork from the existing homepage. Suitable as a decorative background; not a UI screenshot. No upscaling applied. |

The StudySoda, Kaldi, Sipava, and ClipLore cover preparation preserves source proportions and uses WebP quality 86. Originals in neighboring project directories were read only. Public downloads used for those imports are staging material under `.local/asset-source`; they are not needed to serve the business website.

The approved clinic manifest and the copied cover both have SHA-256 `80c022b0e27135055bf4c300bded17995790ba377a559a30c00aee7432497420`. The supplied logo has SHA-256 `e0c615c276f97ff1a6cef7f7283d2971ea36655a4fc4474f764652256abd87a0`, and the founder portrait has SHA-256 `9efc402e86751453f163e346a8e38c9c31912d4a9da0f086464f550256a1b3ad`. The favicon embeds the same logo bytes; the generated social card places that logo beside business copy without altering the source image.

Suggested image descriptions:

- StudySoda: “StudySoda brand artwork with lavender flashcards, an open notebook, and a lime soda.”
- Kaldi: “Kaldi Coffee project artwork with iced coffee and a croissant.”
- Sipava: “Sipava campaign artwork showing its tasks, social feed, and leaderboard screens.”
- ClipLore background: use empty alt text when a nearby project title already identifies the card.
- Business logo: “Syntax Surge blue lightning bolt and black code brackets logo”; use empty alt text when the neighboring business name already identifies the navigation link.
- Founder: “Jade Laurence Empleo, founder of Syntax Surge.”
- MC Dental Station: “MC Dental Station clinic team.”

## Business registration certificate

The original owner-supplied `BNRS-Certificate_OPQT791819131516_4fa16974-d870-4131-a5e5-1b61dcec90fd.pdf` is copied unchanged to `public/documents/syntax-surge-dti-certificate.pdf`. Its SHA-256 is `db52b08e38761e63dfc8b8ae68a7a8a334de45eedf9e0bbd519bf18ba9a5544c`. `public/images/syntax-surge-dti-certificate.png` is a 778 × 1100 rendering of the complete, single A4 page; it is not a recreated, edited, or replacement certificate. The registration section displays that preview and offers direct PDF view/download actions using `src/data/business.ts`.

The certificate spells the legal name **SYNTAXSURGE SOFTWARE DEVELOPMENT SERVICES**, without a space between Syntax and Surge. The public business brand remains **Syntax Surge**. Document-derived registration facts are recorded in `docs/CONTENT-SOURCES.md`; asset availability does not imply an independently checked ongoing government registration status or a completed live deployment.

## Wrap It Up!

`public/images/wrap-it-up-cover.webp` is a 1024×500 WebP derivative of the approved `docs/store/feature-graphic-1024x500.png` from the owner’s Wrap It Up! repository. It is official promotional artwork, not a gameplay screenshot. The source uses paper/ribbon/gift scenery and excludes the character artwork under the app’s separate release audit. Converted locally at quality 88; no external image service is used at runtime.
