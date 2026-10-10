/** Authentic project media. Provenance: docs/AWARD-MEDIA-SOURCES.md. */
export type AwardMedia = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  video: {
    href: string;
    label: string;
  };
  source: {
    href: string;
    label: string;
  };
  recognitionScreenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

/** Videos demonstrate the projects; they are not substitutes for award certificates. */
export const awardMedia: Record<string, AwardMedia> = {
  croignite: {
    image: {
      src: "/images/awards/croignite.webp",
      alt: "CroIgnite creator sponsorship interface in the project demo.",
      width: 1280,
      height: 705,
    },
    video: {
      href: "https://www.youtube.com/watch?v=t6yjLzKioTY",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/croignite",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/croignite.webp",
      alt: "CroIgnite's Cronos x402 PayTech Hackathon announcement showing third place and a $2,000 prize.",
      width: 1170,
      height: 1230,
    },
  },
  ping402: {
    image: {
      src: "/images/awards/ping402.webp",
      alt: "Ping402 paid inbox homepage in the project demo.",
      width: 1280,
      height: 716,
    },
    video: {
      href: "https://www.youtube.com/watch?v=qmlRDo72k9w",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/ping402",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/ping402.webp",
      alt: "Ping402's Solana Winter Build Challenge winner dashboard and Best x402 announcement showing a $2,000 prize.",
      width: 1200,
      height: 1282,
    },
  },
  cliplore: {
    image: {
      src: "/images/awards/cliplore.webp",
      alt: "ClipLore video IP studio homepage in the hackathon demo.",
      width: 1280,
      height: 712,
    },
    video: {
      href: "https://www.youtube.com/watch?v=WRJlQDFcxVI",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/cliplore",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/cliplore.webp",
      alt: "ClipLore's Surreal World Assets Buildathon 2 Creative Front-End winner slide showing a $5,000 prize.",
      width: 1200,
      height: 673,
    },
  },
  field2fridge: {
    image: {
      src: "/images/awards/field2fridge.webp",
      alt: "Field2Fridge farm-to-household workflow in the project demo.",
      width: 992,
      height: 544,
    },
    video: {
      href: "https://www.youtube.com/watch?v=IV46gxrNJew",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/Field2Fridge",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/field2fridge.webp",
      alt: "Field2Fridge's UK AI Agent Hackathon bounty lists showing 1,200 USDT from Akedo and 1,400 USDT from SpaceAgri.",
      width: 1200,
      height: 1099,
    },
  },
  packtrace: {
    image: {
      src: "/images/awards/packtrace.webp",
      alt: "PackTrace medicine traceability homepage in the project demo.",
      width: 1280,
      height: 710,
    },
    video: {
      href: "https://www.youtube.com/watch?v=hJAu5NF_61I",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/pack-trace",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/packtrace.webp",
      alt: "PackTrace's 2025 supOS Global Hackathon winner announcement showing second place and a $2,000 prize.",
      width: 1200,
      height: 1882,
    },
  },
  sentinelx: {
    image: {
      src: "/images/awards/sentinelx.webp",
      alt: "SentinelX operations dashboard in the project demo.",
      width: 480,
      height: 360,
    },
    video: {
      href: "https://www.youtube.com/watch?v=w3V9QJQPVlI",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/sentinelx-somnia",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/sentinelx.webp",
      alt: "SentinelX's Somnia AI Hackathon highlight with the owner's caption recording third place and a $1,000 prize.",
      width: 1200,
      height: 1882,
    },
  },
  creatorbank: {
    image: {
      src: "/images/awards/creatorbank.webp",
      alt: "CreatorBank payments and memberships homepage in the project demo.",
      width: 1280,
      height: 715,
    },
    video: {
      href: "https://www.youtube.com/watch?v=_4w0iCNmg_g",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/creator-bank",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/creatorbank.webp",
      alt: "CreatorBank's Mezo Hackathon winner slide showing a 2,000 MUSD award in Mass Adoption.",
      width: 1200,
      height: 1809,
    },
  },
  lexlink: {
    image: {
      src: "/images/awards/lexlink.webp",
      alt: "LexLink IP licensing homepage in the project demo.",
      width: 1280,
      height: 705,
    },
    video: {
      href: "https://www.youtube.com/watch?v=gs01pInUGZ0",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/lexlink",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/lexlink.webp",
      alt: "LexLink's LegalHack 2025 highlight with the owner's $2,000 Story Protocol bounty caption and finalist slide.",
      width: 1200,
      height: 1895,
    },
  },
  escrowzy: {
    image: {
      src: "/images/awards/escrowzy.webp",
      alt: "Escrowzy Arena trading and game interface in the project demo.",
      width: 1280,
      height: 720,
    },
    video: {
      href: "https://www.youtube.com/watch?v=ZJdJATkRHgg",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/escrowzy-okx",
      label: "Project source",
    },
  },
  viskify: {
    image: {
      src: "/images/awards/viskify.webp",
      alt: "Viskify talent verification homepage in the project demo.",
      width: 1280,
      height: 700,
    },
    video: {
      href: "https://www.youtube.com/watch?v=hiay-fuhmuk",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/viskify-cheqd",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/viskify.webp",
      alt: "Viskify's Verifiable AI Hackathon winner post and owner's caption recording first place, the Verida bounty, and approximately $2,000.",
      width: 1200,
      height: 1882,
    },
  },
  rivalidate: {
    image: {
      src: "/images/awards/rivalidate.webp",
      alt: "Rivalidate on-chain hiring homepage in the project demo.",
      width: 1280,
      height: 749,
    },
    video: {
      href: "https://www.youtube.com/watch?v=M5uMfI2lVjM",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/rivalidate-base",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/rivalidate.webp",
      alt: "Rivalidate's Base Batch 001 APAC runner-up announcement and owner's caption recording 0.5 ETH, estimated at about $2,000.",
      width: 1200,
      height: 1759,
    },
  },
  polkastamp: {
    image: {
      src: "/images/awards/polkastamp.webp",
      alt: "PolkaStamp verifiable credentials homepage in the project demo.",
      width: 1280,
      height: 715,
    },
    video: {
      href: "https://www.youtube.com/watch?v=B-0lPOdbbsw",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/PolkaStamp",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/polkastamp.webp",
      alt: "PolkaStamp's Polkadot Scalability Hackathon prize slides and owner's caption recording a $7,650 total.",
      width: 1200,
      height: 1227,
    },
  },
  hirestamp: {
    image: {
      src: "/images/awards/hirestamp.webp",
      alt: "HireStamp Rootstock hiring homepage in the project demo.",
      width: 1280,
      height: 704,
    },
    video: {
      href: "https://www.youtube.com/watch?v=f11PnUgLKno",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/hirestamp-rootstock",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/hirestamp.webp",
      alt: "HireStamp's AI BUIDL Lab winners graphic and owner's caption recording second place in Commerce and Gig Economy and a $1,000 prize.",
      width: 1200,
      height: 1882,
    },
  },
  aipenguild: {
    image: {
      src: "/images/awards/aipenguild.webp",
      alt: "AIPenGuild homepage with its NFT character artwork.",
      width: 1280,
      height: 672,
    },
    video: {
      href: "https://www.youtube.com/watch?v=gvjl6qbt35s",
      label: "Watch demo",
    },
    source: {
      href: "https://github.com/syntaxsurge/AIPenGuild",
      label: "Project source",
    },
    recognitionScreenshot: {
      src: "/images/recognition-screenshots/aipenguild.webp",
      alt: "AIPenGuild's Polkadot Byaheng Pilipinas NFT winner graphic showing a $2,000 prize, with the winners' meetup photograph.",
      width: 1200,
      height: 1609,
    },
  },
};
