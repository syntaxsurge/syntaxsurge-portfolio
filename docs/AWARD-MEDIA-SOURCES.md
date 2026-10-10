# Hackathon project media sources

Collected and verified on 25 September 2026. Each of the 14 recognitions has a real project image and an associated YouTube demo. All 14 video URLs returned HTTP 200 from YouTube oEmbed, with the author **Jade Laurence Empleo** and a matching project title. This validates the video association and availability at the time of checking; the award descriptions themselves remain based on Jade’s supplied recognition history.

These are **project demo previews**, not award certificates, photographs of award ceremonies, or independent proof of winning. No imagery, video IDs, credentials, or prize amounts were invented. No generic repository OpenGraph fallback was necessary.

| Project ID | Original project visual | YouTube demo | Discovery source |
| --- | --- | --- | --- |
| `croignite` | [Image](https://raw.githubusercontent.com/syntaxsurge/croignite/main/public/images/croignite-demo.png) | [Watch demo](https://www.youtube.com/watch?v=t6yjLzKioTY) | [Project README](https://github.com/syntaxsurge/croignite#readme) |
| `ping402` | [Image](https://raw.githubusercontent.com/syntaxsurge/ping402/main/public/images/ping402-demo.png) | [Watch demo](https://www.youtube.com/watch?v=qmlRDo72k9w) | [Project README](https://github.com/syntaxsurge/ping402#readme) |
| `cliplore` | [Image](https://raw.githubusercontent.com/syntaxsurge/cliplore/main/public/images/cliplore-demo.png) | [Watch demo](https://www.youtube.com/watch?v=WRJlQDFcxVI) | [Project README](https://github.com/syntaxsurge/cliplore#readme) |
| `field2fridge` | [Image](https://raw.githubusercontent.com/syntaxsurge/Field2Fridge/main/public/images/Field2Fridge-demo.png) | [Watch demo](https://www.youtube.com/watch?v=IV46gxrNJew) | [Project README](https://github.com/syntaxsurge/Field2Fridge#readme) |
| `packtrace` | [Image](https://raw.githubusercontent.com/syntaxsurge/pack-trace/main/public/images/pack-trace-demo.png) | [Watch demo](https://www.youtube.com/watch?v=hJAu5NF_61I) | [Project README](https://github.com/syntaxsurge/pack-trace#readme) |
| `sentinelx` | [Image](https://i.ytimg.com/vi/w3V9QJQPVlI/hqdefault.jpg) | [Watch demo](https://www.youtube.com/watch?v=w3V9QJQPVlI) | [Project README](https://github.com/syntaxsurge/sentinelx-somnia#readme) |
| `creatorbank` | [Image](https://raw.githubusercontent.com/syntaxsurge/creator-bank/main/public/images/creator-bank-demo.png) | [Watch demo](https://www.youtube.com/watch?v=_4w0iCNmg_g) | [Project README](https://github.com/syntaxsurge/creator-bank#readme) |
| `lexlink` | [Image](https://raw.githubusercontent.com/syntaxsurge/lexlink/main/public/images/lexlink-demo.png) | [Watch demo](https://www.youtube.com/watch?v=gs01pInUGZ0) | [Project README](https://github.com/syntaxsurge/lexlink#readme) |
| `escrowzy` | [Image](https://raw.githubusercontent.com/syntaxsurge/escrowzy-okx/main/public/images/escrowzy-demo.png) | [Watch demo](https://www.youtube.com/watch?v=ZJdJATkRHgg) | [Project README](https://github.com/syntaxsurge/escrowzy-okx#readme) |
| `viskify` | [Image](https://raw.githubusercontent.com/syntaxsurge/viskify-cheqd/main/public/images/viskify-demo.png) | [Watch demo](https://www.youtube.com/watch?v=hiay-fuhmuk) | [Project README](https://github.com/syntaxsurge/viskify-cheqd#readme) |
| `rivalidate` | [Image](https://raw.githubusercontent.com/syntaxsurge/rivalidate-base/main/public/images/rivalidate-demo.png) | [Watch demo](https://www.youtube.com/watch?v=M5uMfI2lVjM) | [Project README](https://github.com/syntaxsurge/rivalidate-base#readme) |
| `polkastamp` | [Image](https://raw.githubusercontent.com/syntaxsurge/PolkaStamp/main/public/images/polkastamp-demo.png) | [Watch demo](https://www.youtube.com/watch?v=B-0lPOdbbsw) | [Project README](https://github.com/syntaxsurge/PolkaStamp#readme) |
| `hirestamp` | [Image](https://raw.githubusercontent.com/syntaxsurge/hirestamp-rootstock/main/public/images/hirestamp-demo.png) | [Watch demo](https://www.youtube.com/watch?v=f11PnUgLKno) | [Project README](https://github.com/syntaxsurge/hirestamp-rootstock#readme) |
| `aipenguild` | [Image](https://raw.githubusercontent.com/syntaxsurge/AIPenGuild/main/public/images/screenshots/homepage-overview.png) | [Watch demo](https://www.youtube.com/watch?v=gvjl6qbt35s) | [Project README](https://github.com/syntaxsurge/AIPenGuild#readme) |

## Discovery and treatment

- CroIgnite, Ping402, and CreatorBank’s public `/demo-video` routes resolve to their listed YouTube videos. Other video links are directly present in the public project READMEs; several were also supplied by Jade in the request.
- Twelve previews come from the project-owned `public/images/*-demo.png` assets referenced in their READMEs. These are screenshots of the project’s video player and retain the visible YouTube controls and branding.
- AIPenGuild uses the actual homepage screenshot at `public/images/screenshots/homepage-overview.png`, linked in its README.
- SentinelX uses the thumbnail published for its own demo video. The available source is 480 × 360 and is not upscaled.
- Output files are local, metadata-stripped WebP images in `public/images/awards`. They retain original proportions, with a maximum width of 1280 pixels, no upscaling, and quality 85. The set totals approximately 632 KiB. Browser display does not depend on remote thumbnail servers.
- Raw download and verification records remain ignored under `.local/award-media` for provenance. They are not required for deployment.

Use each preview with its corresponding demo link. Avoid autoplaying videos or loading third-party YouTube embeds before the visitor chooses to watch.

## Owner-supplied recognition screenshots

Jade supplied 13 phone screenshots on 10 October 2026 and authorized publishing cropped versions on the matching project pages. Each original was read individually to match its project, award, prize and currency. These story collages combine organizer announcements, winner slides, event photographs and Jade's annotations; the annotations remain owner-supplied claims rather than independent payout records. Escrowzy has no screenshot in this set and no supplied prize amount.

The published files live in `public/images/recognition-screenshots`. Crop coordinates below use the original 1320 × 2868 image, with `x,y,width,height` measured from its top-left corner. Deterministic ImageMagick crops remove phone time/battery/status indicators, story progress and controls, the reply overlay, and the Activity/Facebook/Browse/Send footer. They preserve the selected screenshot content without regenerating, redrawing, retouching or changing award text. Conversion strips metadata and saves quality-90 WebP at a maximum width of 1200 pixels with no upscaling. Source files remain unchanged; local copies and crop records are retained under ignored `.local/recognition-screenshots` for reproducibility.

| Project / published filename | Supplied clipboard PNG | Crop `x,y,width,height` | Published dimensions | Prize reading and retained context |
| --- | --- | --- | --- | --- |
| `cliplore.webp` | `codex-clipboard-022ff2a1-e512-473a-9292-549923dba278.png` | `0,1670,1320,740` | 1200 × 673 | Winner slide: Creative Front-End, ClipLore, $5,000. This belongs to ClipLore for Story Protocol. |
| `field2fridge.webp` | `codex-clipboard-0435d136-a02f-4b23-9a39-b3416120e146.png` | `32,980,1256,1150` | 1200 × 1099 | Akedo lists Field2Fridge at 1,200 USDT; SpaceAgri lists Fridge2Field at 1,400 USDT. Jade's same collage totals these as $2,600 and names Field2Fridge. The displayed combined prize retains the explicit USDT denomination. |
| `ping402.webp` | `codex-clipboard-ccdb892e-26e5-4572-9763-ff7c25e439ed.png` | `0,340,1320,1410` | 1200 × 1282 | Winner dashboard shows Best Use of x402 with Solana and $2,000; organizer graphic names Ping402 for Best x402. |
| `croignite.webp` | `codex-clipboard-b4840473-ca48-4b39-a72d-dff13a7b803b.png` | `78,1190,1170,1230` | 1170 × 1230 | Owner caption and announcement both show CroIgnite, third place, $2,000. |
| `aipenguild.webp` | `codex-clipboard-802fe040-9b61-42ec-bcfc-677e5cda91ee.png` | `0,650,1320,1770` | 1200 × 1609 | Organizer graphic shows AIPenGuild (NFT), $2,000; owner caption gives first place in the NFT category. Meetup photo retained. The graphic's “winner #2” identifies an announcement entry, not second place. |
| `hirestamp.webp` | `codex-clipboard-f029a6fd-bf66-4861-99a2-84165f6d2676.png` | `0,350,1320,2070` | 1200 × 1882 | Owner caption gives HireStamp, Commerce & Gig Economy, second place, $1,000; winners graphic shows HireStamp beneath the silver medal. USD 15,000 is the event prize pool, not Jade's prize. |
| `polkastamp.webp` | `codex-clipboard-2c612364-27cb-4895-812a-1f4207af90dc.png` | `0,1070,1320,1350` | 1200 × 1227 | Owner caption gives a total of $7,650. Visible PolkaStamp slides show $5,000 for Smart Contracts and $2,500 for PAPI DApps. The Open Solidity slide names Syntax Surge but shows no amount; no $150 breakdown is inferred. |
| `rivalidate.webp` | `codex-clipboard-a37bdf3b-a016-481a-849d-dfabe4653043.png` | `0,335,1320,1935` | 1200 × 1759 | Base's Consumer runner-up entry names Rivalidate. Owner caption gives 0.5 ETH with a historical approximately $2,000 valuation. Keep 0.5 ETH as the prize and label the dollar estimate as approximate; it is not a current exchange-rate conversion. |
| `viskify.webp` | `codex-clipboard-ee2eacaa-af7f-41a7-be13-d360a403056c.png` | `0,350,1320,2070` | 1200 × 1882 | Verida post names Viskify first place. Owner caption gives first place plus Verida bounty and approximately $2,000 combined; retain the approximation without inventing component amounts. |
| `lexlink.webp` | `codex-clipboard-3f661254-cf74-4038-887d-90b322e1856b.png` | `0,335,1320,2085` | 1200 × 1895 | Owner caption gives LexLink, Story Protocol bounty, $2,000; presentation names LexLink as Story finalist. Caption says December 2025, while Jade's earlier recognition history specifies November 2025; the canonical award date retains that earlier record. |
| `creatorbank.webp` | `codex-clipboard-9e5e3ae0-2730-4148-aafd-7d1c9a20d642.png` | `0,430,1320,1990` | 1200 × 1809 | Award slide gives Creator Bank, Mass Adoption, 2,000 MUSD. Owner's caption shortens this to $2,000; retain MUSD as the awarded currency. |
| `sentinelx.webp` | `codex-clipboard-aafa007f-53a8-446b-8b80-ea43bc715efe.png` | `0,350,1320,2070` | 1200 × 1882 | Owner caption gives SentinelX, third place, $1,000. The Somnia poster's $20,000 is the event prize pool, not Jade's prize. |
| `packtrace.webp` | `codex-clipboard-9099a728-c841-49be-b957-bbabb118ec0f.png` | `0,350,1320,2070` | 1200 × 1882 | Winner graphic and announcement name PackTrace and Jade Laurence Empleo for second prize, $2,000. |

Project pages display these recognition screenshots separately from the authentic product demo covers. Full-image links use the same local cropped asset, so phone interface chrome is absent from both the inline preview and the opened image.
