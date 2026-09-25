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
  },
};
