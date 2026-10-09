import { awardMedia, type AwardMedia } from "./award-media.ts";

export type ProjectPreview = {
  image: AwardMedia["image"];
  artwork?: AwardMedia["image"];
  label: string;
  summary: string;
  demo?: AwardMedia["video"];
};

/** Collection previews reuse project-owned media; labels identify artwork and historical demos. */
export const projectPreviews: Record<string, ProjectPreview> = {
  "mc-dental-station": {
    image: {
      src: "/images/mc-dental-feature.webp",
      alt: "AI-generated MC Dental Station artwork with a porcelain tooth and abstract appointment, chat, and service cards",
      width: 1600,
      height: 905,
    },
    label: "AI-generated artwork",
    summary:
      "Clinic services, appointment requests, and approved FAQ help in one place.",
  },
  cliplore: {
    image: awardMedia.cliplore.image,
    artwork: {
      src: "/images/cliplore-cover.webp",
      alt: "",
      width: 480,
      height: 270,
    },
    demo: awardMedia.cliplore.video,
    label: "Hackathon demo",
    summary:
      "An AI video studio for scripts, scenes, captions, and editable timelines.",
  },
  studysoda: {
    image: {
      src: "/images/studysoda-cover.webp",
      alt: "StudySoda brand artwork with lavender flashcards, a notebook, and a lime soda",
      width: 1400,
      height: 792,
    },
    label: "Brand artwork",
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
    label: "Product campaign",
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
    label: "Project artwork",
    summary:
      "NFC customer pages with café reviews, loyalty points, and vouchers.",
  },
  "wrap-it-up": {
    image: {
      src: "/images/wrap-it-up-cover.webp",
      alt: "Wrap It Up! game artwork with paper, ribbon, scissors, and two wrapped gifts in a cozy shop",
      width: 1024,
      height: 500,
    },
    label: "Official game artwork",
    summary:
      "An offline gift-wrapping shop game built around a cozy daily rhythm.",
  },
  croignite: {
    image: awardMedia.croignite.image,
    demo: awardMedia.croignite.video,
    label: "Project demo",
    summary:
      "Creator sponsorships and tokenized invoice receipts on Cronos testnet.",
  },
  ping402: {
    image: awardMedia.ping402.image,
    demo: awardMedia.ping402.video,
    label: "Project demo",
    summary:
      "A paid creator inbox with priority messages and verifiable receipts.",
  },
  field2fridge: {
    image: awardMedia.field2fridge.image,
    demo: awardMedia.field2fridge.video,
    label: "Project demo",
    summary:
      "Farm signals and grocery planning connected through AI and Web3 agents.",
  },
  packtrace: {
    image: awardMedia.packtrace.image,
    demo: awardMedia.packtrace.video,
    label: "Project demo",
    summary:
      "Medicine traceability with supply-chain monitoring and blockchain records.",
  },
  sentinelx: {
    image: awardMedia.sentinelx.image,
    demo: awardMedia.sentinelx.video,
    label: "Project demo",
    summary: "Oracle monitoring, AI triage, and verifiable operator controls.",
  },
  creatorbank: {
    image: awardMedia.creatorbank.image,
    demo: awardMedia.creatorbank.video,
    label: "Project demo",
    summary: "Payment links, invoices, memberships, and split payouts on Mezo.",
  },
  lexlink: {
    image: awardMedia.lexlink.image,
    demo: awardMedia.lexlink.video,
    label: "Project demo",
    summary:
      "IP registration and licensing with checkout and evidence records.",
  },
  escrowzy: {
    image: awardMedia.escrowzy.image,
    demo: awardMedia.escrowzy.video,
    label: "Project demo",
    summary:
      "A DeFi trading prototype with PvP battles and fee-discount progression.",
  },
  viskify: {
    image: awardMedia.viskify.image,
    demo: awardMedia.viskify.video,
    label: "Project demo",
    summary:
      "Talent verification with digital credentials and private data insights.",
  },
  rivalidate: {
    image: awardMedia.rivalidate.image,
    demo: awardMedia.rivalidate.video,
    label: "Project demo",
    summary: "On-chain hiring with credential checks and stablecoin payments.",
  },
  polkastamp: {
    image: awardMedia.polkastamp.image,
    demo: awardMedia.polkastamp.video,
    label: "Project demo",
    summary:
      "Verifiable credentials, subscriptions, and smart contracts on Polkadot.",
  },
  hirestamp: {
    image: awardMedia.hirestamp.image,
    demo: awardMedia.hirestamp.video,
    label: "Project demo",
    summary:
      "Talent credentials, digital identity, and subscription payments on Rootstock.",
  },
  aipenguild: {
    image: awardMedia.aipenguild.image,
    demo: awardMedia.aipenguild.video,
    label: "Project screenshot",
    summary:
      "AI-driven NFTs with a marketplace, staking, and cross-game progression.",
  },
};
