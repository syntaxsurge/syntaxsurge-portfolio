import { awardMedia, type AwardMedia } from "./award-media.ts";

export type ProjectPreview = {
  image: AwardMedia["image"];
  summary: string;
  demo?: AwardMedia["video"];
};

/** Collection previews reuse project-owned media with plain-language summaries. */
export const projectPreviews: Record<string, ProjectPreview> = {
  "mc-dental-station": {
    image: {
      src: "/images/mc-dental-feature.webp",
      alt: "MC Dental Station project artwork with a porcelain tooth and abstract appointment, chat, and service cards",
      width: 1600,
      height: 905,
    },
    summary:
      "A clinic website with service information and appointment requests.",
  },
  "cliplore-ai": {
    image: {
      src: "/images/cliplore-ai-preview.webp",
      alt: "ClipLore.ai homepage preview with a video canvas and layered timeline",
      width: 1070,
      height: 561,
    },
    summary:
      "A studio for AI generation, timeline editing, captions, and sound.",
  },
  "perfume-notebook": {
    image: {
      src: "/images/perfume-notebook-cover.webp",
      alt: "The Perfume Notebook homepage with a fragrance catalog introduction and perfume still life",
      width: 1280,
      height: 720,
    },
    summary: "A fragrance catalog and bilingual notebook for building formulas.",
  },
  orderkubo: {
    image: {
      src: "/images/orderkubo-cover.webp",
      alt: "OrderKubo homepage with a point-of-sale overview and a dashboard preview",
      width: 1280,
      height: 720,
    },
    summary: "Point of sale, inventory, and store operations in one workspace.",
  },
  "topic-machine": {
    image: {
      src: "/images/topic-machine-cover.webp",
      alt: "TopicMachine homepage with an article publishing illustration against a dark backdrop",
      width: 1280,
      height: 720,
    },
    summary: "AI-assisted article research, editing, and publishing.",
  },
  romcamp: {
    image: {
      src: "/images/romcamp-cover.webp",
      alt: "Romcamp homepage with a game search box and a featured Game Boy Advance title",
      width: 1280,
      height: 720,
    },
    summary: "A classic game archive with console profiles and setup guides.",
  },
  modelcab: {
    image: {
      src: "/images/modelcab-cover.webp",
      alt: "ModelCab homepage diagram showing an app request routed through the gateway to a selected AI model",
      width: 1280,
      height: 720,
    },
    summary: "An AI gateway and Playground for testing and integrating models.",
  },
  filemaple: {
    image: {
      src: "/images/filemaple-cover.webp",
      alt: "FileMaple homepage showing a laptop with a cloud storage file workspace open",
      width: 1280,
      height: 720,
    },
    summary: "Organize, upload, and share files from S3-compatible storage.",
  },
  linkmaple: {
    image: {
      src: "/images/linkmaple-cover.webp",
      alt: "LinkMaple homepage with a URL input and an example of a shortened link",
      width: 1280,
      height: 720,
    },
    summary: "Short links with publisher analytics and payout tracking.",
  },
  "muslim-everyday": {
    image: {
      src: "/images/muslim-everyday-cover.webp",
      alt: "Muslim Everyday homepage with a reading nook illustration and links to beginner guides",
      width: 1280,
      height: 720,
    },
    summary: "Practical guides to Islam, the Quran, and daily Muslim life.",
  },
  studysoda: {
    image: {
      src: "/images/studysoda-cover.webp",
      alt: "StudySoda brand artwork with lavender flashcards, a notebook, and a lime soda",
      width: 1400,
      height: 792,
    },
    summary:
      "Notes and documents turned into flashcards, reviewers, and practice exams.",
  },
  sipava: {
    image: {
      src: "/images/sipava-cover.webp",
      alt: "Sipava campaign artwork showing its task, accountability feed, and streak screens with showcase data",
      width: 1536,
      height: 750,
    },
    summary:
      "Daily plans, intentional alarms, and accountability with a buddy.",
  },
  kaldi: {
    image: {
      src: "/images/kaldi-cover.webp",
      alt: "Kaldi Coffee project artwork with iced coffee and a croissant",
      width: 1400,
      height: 792,
    },
    summary: "Tap-to-open café pages with loyalty rewards and vouchers.",
  },
  "wrap-it-up": {
    image: {
      src: "/images/wrap-it-up-cover.webp",
      alt: "Wrap It Up! game artwork with paper, ribbon, scissors, and two wrapped gifts in a cozy shop",
      width: 1024,
      height: 500,
    },
    summary:
      "An offline gift-wrapping shop game built around a cozy daily rhythm.",
  },
  croignite: {
    image: awardMedia.croignite.image,
    demo: awardMedia.croignite.video,
    summary: "A video platform for creator sponsorships and payments.",
  },
  ping402: {
    image: awardMedia.ping402.image,
    demo: awardMedia.ping402.video,
    summary: "A creator inbox where paid messages get priority.",
  },
  cliplore: {
    image: awardMedia.cliplore.image,
    demo: awardMedia.cliplore.video,
    summary:
      "Video creation with licensing, remixing, and ownership tools on Story Protocol.",
  },
  field2fridge: {
    image: awardMedia.field2fridge.image,
    demo: awardMedia.field2fridge.video,
    summary: "Connects farm data with household grocery planning.",
  },
  packtrace: {
    image: awardMedia.packtrace.image,
    demo: awardMedia.packtrace.video,
    summary: "Tracks medicine from supplier to shelf.",
  },
  sentinelx: {
    image: awardMedia.sentinelx.image,
    demo: awardMedia.sentinelx.video,
    summary: "Monitors blockchain data and flags problems for operators.",
  },
  creatorbank: {
    image: awardMedia.creatorbank.image,
    demo: awardMedia.creatorbank.video,
    summary: "Payment links, invoices, and shared payouts for creators.",
  },
  lexlink: {
    image: awardMedia.lexlink.image,
    demo: awardMedia.lexlink.video,
    summary: "Registers creative work and helps owners manage licensing.",
  },
  escrowzy: {
    image: awardMedia.escrowzy.image,
    demo: awardMedia.escrowzy.video,
    summary: "A trading prototype with game challenges and fee discounts.",
  },
  viskify: {
    image: awardMedia.viskify.image,
    demo: awardMedia.viskify.video,
    summary: "Helps verify skills using credentials and private data.",
  },
  rivalidate: {
    image: awardMedia.rivalidate.image,
    demo: awardMedia.rivalidate.video,
    summary: "A hiring platform with credential checks and digital payments.",
  },
  polkastamp: {
    image: awardMedia.polkastamp.image,
    demo: awardMedia.polkastamp.video,
    summary: "Digital credentials and subscriptions built on Polkadot.",
  },
  hirestamp: {
    image: awardMedia.hirestamp.image,
    demo: awardMedia.hirestamp.video,
    summary: "A talent platform for credentials, identity, and subscriptions.",
  },
  aipenguild: {
    image: awardMedia.aipenguild.image,
    demo: awardMedia.aipenguild.video,
    summary: "A marketplace for digital game items and shared progression.",
  },
};
