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
