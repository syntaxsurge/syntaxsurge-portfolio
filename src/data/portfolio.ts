export type ProjectCategory = "Products" | "AI & Web3" | "Tools";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year: string;
  tags: string[];
  links: ProjectLink[];
  award?: string;
};

export type Award = {
  projectId: string;
  title: string;
  event: string;
  issuer: string;
  /** Month of recognition, as supplied by Jade. */
  date: string;
  /** Original award currency. Do not combine USD and MUSD. */
  prize?: string;
};

// Content provenance and historical product distinctions: docs/CONTENT-SOURCES.md.
export const projects: Project[] = [
  {
    id: "cliplore",
    title: "ClipLore",
    description:
      "An AI video studio that takes an idea from script to an editable timeline, with control over every scene, caption, and sound.",
    category: "Products",
    year: "Current",
    tags: ["AI video", "Creator tools", "Timeline editor"],
    links: [
      { label: "Visit product", href: "https://cliplore.ai/" },
      {
        label: "Award-winning demo",
        href: "https://www.youtube.com/watch?v=WRJlQDFcxVI",
      },
      {
        label: "Hackathon source",
        href: "https://github.com/syntaxsurge/cliplore",
      },
    ],
    award: "Creative Front-End / UI / UX winner · Story Protocol",
  },
  {
    id: "studysoda",
    title: "StudySoda",
    description:
      "Turn notes and documents into reviewers, flashcards, and practice exams. A calmer place to study, edit, and share what you learn.",
    category: "Products",
    year: "Current",
    tags: ["Learning", "AI study tools", "Knowledge sharing"],
    links: [{ label: "Visit product", href: "https://studysoda.com/" }],
  },
  {
    id: "sipava",
    title: "Sipava",
    description:
      "A daily accountability app that connects clear plans, intentional alarms, and progress shared with a buddy.",
    category: "Products",
    year: "Current",
    tags: ["Habits", "Accountability", "Productivity"],
    links: [{ label: "Visit product", href: "https://sipava.com/" }],
  },
  {
    id: "kaldi",
    title: "Kaldi Circle",
    description:
      "An NFC café experience with a simple customer page, reviews, loyalty points, and a voucher wallet.",
    category: "Products",
    year: "Current",
    tags: ["NFC", "Customer loyalty", "Next.js"],
    links: [
      { label: "Visit website", href: "https://syntaxsurge.com/kaldi-coffee" },
    ],
  },
  {
    id: "croignite",
    title: "CroIgnite",
    description:
      "A short-video platform where creator sponsorships become tokenized invoice receipts, settled through x402 on Cronos EVM Testnet.",
    category: "AI & Web3",
    year: "2026",
    tags: ["Cronos", "x402", "Creator payments"],
    links: [
      { label: "Live demo", href: "https://croignite.vercel.app/" },
      { label: "Watch demo", href: "https://croignite.vercel.app/demo-video" },
      { label: "GitHub", href: "https://github.com/syntaxsurge/croignite" },
      {
        label: "Contracts",
        href: "https://croignite.vercel.app/contract-addresses",
      },
    ],
    award: "3rd place · Cronos x402 PayTech Hackathon",
  },
  {
    id: "ping402",
    title: "Ping402",
    description:
      "A paid inbox for creators. Send a priority message with x402 and Solana USDC, then track delivery with a verifiable receipt.",
    category: "AI & Web3",
    year: "2026",
    tags: ["Solana", "x402", "Paid messaging"],
    links: [
      { label: "Live demo", href: "https://pingx402.vercel.app/" },
      { label: "Watch demo", href: "https://pingx402.vercel.app/demo-video" },
      { label: "GitHub", href: "https://github.com/syntaxsurge/ping402" },
    ],
    award: "Best x402 App · Solana Winter Build Challenge",
  },
  {
    id: "field2fridge",
    title: "Field2Fridge",
    description:
      "A BNB Chain agent network connecting farm-risk signals and on-chain checks to household grocery carts, with a ChainGPT copilot.",
    category: "AI & Web3",
    year: "2025",
    tags: ["AI agents", "BNB Chain", "Agriculture"],
    links: [
      { label: "Live demo", href: "https://field2-fridge.vercel.app/" },
      {
        label: "Watch demo",
        href: "https://www.youtube.com/watch?v=IV46gxrNJew",
      },
      { label: "GitHub", href: "https://github.com/syntaxsurge/Field2Fridge" },
    ],
    award: "SpaceAgri & Akedo bounty winner · UK AI Agent Hackathon",
  },
  {
    id: "packtrace",
    title: "PackTrace",
    description:
      "Medicine traceability for African supply chains, combining industrial IoT, real-time operations data, and blockchain provenance.",
    category: "Tools",
    year: "2025",
    tags: ["Industrial IoT", "Supply chains", "Hedera"],
    links: [
      {
        label: "Watch demo",
        href: "https://www.youtube.com/watch?v=hJAu5NF_61I",
      },
      { label: "GitHub", href: "https://github.com/syntaxsurge/pack-trace" },
      {
        label: "Pitch deck",
        href: "https://www.canva.com/design/DAG5oi7Oh8E/SIrLnkFLTiG0i1bJYmP_sw/edit",
      },
    ],
    award: "2nd place · supOS Global Hackathon",
  },
  {
    id: "sentinelx",
    title: "SentinelX",
    description:
      "An AI reliability layer for Somnia oracles that watches on-chain signals, flags problems, and supports verifiable operator actions.",
    category: "Tools",
    year: "2025",
    tags: ["AI monitoring", "Somnia", "Oracle reliability"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/syntaxsurge/sentinelx-somnia",
      },
    ],
    award: "3rd place, Open Track · Somnia AI Hackathon",
  },
  {
    id: "creatorbank",
    title: "CreatorBank",
    description:
      "A Mezo-native toolkit for MUSD payment links, invoices, memberships, marketplace listings, and split payouts.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Mezo", "MUSD", "Creator finance"],
    links: [
      { label: "Testnet demo", href: "https://creator-bank.vercel.app/" },
      {
        label: "Watch demo",
        href: "https://creator-bank.vercel.app/demo-video",
      },
      { label: "GitHub", href: "https://github.com/syntaxsurge/creator-bank" },
      {
        label: "Pitch deck",
        href: "https://creator-bank.vercel.app/pitch-deck",
      },
    ],
    award: "Community Choice · Mezo Hackathon",
  },
  {
    id: "lexlink",
    title: "LexLink",
    description:
      "An IP licensing workflow connecting Story registration, ICP / ckBTC checkout, and Constellation evidence records.",
    category: "AI & Web3",
    year: "2025",
    tags: ["IP licensing", "Story Protocol", "ICP"],
    links: [
      { label: "GitHub", href: "https://github.com/syntaxsurge/lexlink" },
    ],
    award: "Story Protocol bounty winner · LegalHack",
  },
  {
    id: "escrowzy",
    title: "Escrowzy",
    description:
      "A gamified DeFi trading experience where PvP battles, achievements, and progression unlock trading-fee discounts.",
    category: "AI & Web3",
    year: "2025",
    tags: ["DeFi", "Game mechanics", "P2P trading"],
    links: [
      { label: "Watch demo", href: "https://youtu.be/ZJdJATkRHgg" },
      { label: "GitHub", href: "https://github.com/syntaxsurge/escrowzy-okx" },
    ],
    award: "Special recognition · OKX ETHCC Hackathon",
  },
  {
    id: "viskify",
    title: "Viskify",
    description:
      "AI-assisted talent verification that combines cheqd credentials with insights from private, user-owned data through Verida.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Verifiable credentials", "cheqd", "Verida"],
    links: [
      { label: "GitHub", href: "https://github.com/syntaxsurge/viskify-cheqd" },
    ],
    award: "1st place & Verida bounty · Verifiable AI Hackathon",
  },
  {
    id: "rivalidate",
    title: "Rivalidate",
    description:
      "An on-chain hiring platform combining verifiable credentials, AI-assisted candidate review, Coinbase Smart Wallets, and stablecoin payments.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Base", "Hiring", "Smart wallets"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/syntaxsurge/rivalidate-base",
      },
    ],
    award: "Consumer Track runner-up · Base Batch 001 APAC",
  },
  {
    id: "polkastamp",
    title: "PolkaStamp",
    description:
      "A Polkadot application exploring verifiable credentials, on-chain subscriptions, PolkaVM smart contracts, and the PAPI toolkit.",
    category: "Tools",
    year: "2025",
    tags: ["Polkadot", "PolkaVM", "PAPI"],
    links: [
      { label: "GitHub", href: "https://github.com/syntaxsurge/PolkaStamp" },
    ],
    award: "Three-category winner · Polkadot Scalability Hackathon",
  },
  {
    id: "hirestamp",
    title: "HireStamp",
    description:
      "An AI-assisted talent platform using Rootstock verifiable credentials, decentralized identity, and RBTC subscription payments.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Rootstock", "Identity", "Talent verification"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/syntaxsurge/hirestamp-rootstock",
      },
    ],
    award: "2nd place, Commerce & Gig Economy · (A)I BUIDL Lab",
  },
  {
    id: "aipenguild",
    title: "AIPenGuild",
    description:
      "An AI-driven NFT ecosystem with a marketplace, staking, and XP progression designed to carry game attributes across experiences.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Polkadot", "NFTs", "Game interoperability"],
    links: [
      { label: "GitHub", href: "https://github.com/syntaxsurge/AIPenGuild" },
    ],
    award: "NFT category winner · Polkadot Byaheng Pilipinas",
  },
];

export const awards: Award[] = [
  {
    projectId: "croignite",
    title: "3rd place",
    event: "Cronos x402 PayTech Hackathon",
    issuer: "Cronos",
    date: "2026-02",
    prize: "US$2,000",
  },
  {
    projectId: "ping402",
    title: "Best x402 App",
    event: "Solana Winter Build Challenge",
    issuer: "Encode Club · Solana Foundation",
    date: "2026-01",
    prize: "US$2,000",
  },
  {
    projectId: "cliplore",
    title: "Creative Front-End / UI / UX winner",
    event: "Surreal World Assets Buildathon 2",
    issuer: "Encode Club · Story Protocol",
    date: "2025-12",
    prize: "US$5,000",
  },
  {
    projectId: "field2fridge",
    title: "SpaceAgri 2nd place · Akedo 6th place",
    event: "UK AI Agent Hackathon",
    issuer: "SpaceAgri · Akedo",
    date: "2025-12",
    prize: "US$2,600",
  },
  {
    projectId: "packtrace",
    title: "2nd place",
    event: "supOS Global Hackathon",
    issuer: "FREEZONEX · supOS / tier0",
    date: "2025-11",
    prize: "US$2,000",
  },
  {
    projectId: "sentinelx",
    title: "3rd place · Open Track",
    event: "Somnia AI Hackathon",
    issuer: "Somnia Network",
    date: "2025-11",
    prize: "US$1,000",
  },
  {
    projectId: "creatorbank",
    title: "Community Choice · Financial Access & Mass Adoption",
    event: "Mezo Hackathon",
    issuer: "Supernormal Foundation · Mezo · Encode Club",
    date: "2025-11",
    prize: "2,000 MUSD",
  },
  {
    projectId: "lexlink",
    title: "Story Protocol bounty winner",
    event: "LegalHack 2025",
    issuer: "Constellation · ICP · Story · The Blockchain Legal Institute",
    date: "2025-11",
    prize: "US$2,000",
  },
  {
    projectId: "escrowzy",
    title: "Special recognition",
    event: "OKX ETHCC Hackathon",
    issuer: "OKX",
    date: "2025-08",
  },
  {
    projectId: "viskify",
    title: "1st place & Verida bounty winner",
    event: "Verifiable AI Hackathon 2025",
    issuer: "Verida · cheqd · DoraHacks · SPRITE+",
    date: "2025-06",
  },
  {
    projectId: "rivalidate",
    title: "Runner-up · Consumer Track",
    event: "Base Batch 001 · APAC",
    issuer: "Base (Coinbase)",
    date: "2025-06",
  },
  {
    projectId: "polkastamp",
    title: "Smart Contracts · PAPI DApps · Open Solidity winner",
    event: "Polkadot Scalability Hackathon 2025",
    issuer: "Polkadot",
    date: "2025-06",
  },
  {
    projectId: "hirestamp",
    title: "2nd place · Commerce & Gig Economy",
    event: "(A)I BUIDL Lab Hackathon 2025",
    issuer: "RootstockLabs · thirdweb · Alchemy",
    date: "2025-05",
  },
  {
    projectId: "aipenguild",
    title: "1st place · NFT Category",
    event: "Polkadot Byaheng Pilipinas Hackathon 2025",
    issuer: "OpenGuild · Web3Bulacan",
    date: "2025-03",
  },
];
