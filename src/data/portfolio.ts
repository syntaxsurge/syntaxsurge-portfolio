import { wrapItUp } from "./wrap-it-up.ts";

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
  focus?: { title: string; description: string }[];
  award?: string;
};

export type Award = {
  projectId: string;
  title: string;
  event: string;
  issuer: string;
  /** Month of recognition, as supplied by Jade. */
  date: string;
  /** Supplied award denomination and historical estimate; never a live conversion. */
  prize?: string;
};

// Content provenance and historical product distinctions: docs/CONTENT-SOURCES.md.
// The homepage collection and Next project navigation follow this order.
export const projects: Project[] = [
  {
    id: "perfume-notebook",
    title: "The Perfume Notebook",
    description:
      "A bilingual perfumery platform that pairs a searchable public fragrance catalog with a private workspace for notes, materials, and formula development.",
    category: "Products",
    year: "Current",
    tags: ["Perfumery", "Arabic and English", "Formula builder"],
    links: [
      { label: "Visit website", href: "https://perfumenotebook.com/" },
    ],
    focus: [
      {
        title: "Explore by scent",
        description:
          "Browse fragrances by note or accord, compare materials, and save references to a private notebook.",
      },
      {
        title: "Develop a formula",
        description:
          "Organize materials by project, calculate weights and dilution, and export a formula as a PDF.",
      },
    ],
  },
  {
    id: "cliplore-ai",
    title: "ClipLore.ai",
    description:
      "An AI creation and video editing product with generation workflows, editable timelines, captions, audio, and export.",
    category: "Products",
    year: "Current",
    tags: ["AI video", "Creator tools", "Timeline editor"],
    links: [{ label: "Visit product", href: "https://cliplore.ai/" }],
  },
  {
    id: "topic-machine",
    title: "TopicMachine",
    description:
      "An AI-assisted editorial workspace for researching topics, refining drafts, and publishing articles to WordPress or a custom website.",
    category: "Products",
    year: "Current",
    tags: ["Editorial automation", "WordPress", "Article-to-video"],
    links: [{ label: "Visit website", href: "https://topicmachine.com/" }],
    focus: [
      {
        title: "Keep the editorial review in the workflow",
        description:
          "Start from a keyword, build an outline from research, and edit the article before scheduling or publishing it.",
      },
      {
        title: "Adapt articles for video",
        description:
          "The optional ClipLore integration turns a completed article into a video for editing or delivery to YouTube.",
      },
    ],
  },
  {
    id: "orderkubo",
    title: "OrderKubo",
    description:
      "A point-of-sale platform that connects checkout, inventory, stores, customers, and staff workflows for small businesses.",
    category: "Products",
    year: "Current",
    tags: ["Point of sale", "Inventory", "Retail operations"],
    links: [{ label: "Visit website", href: "https://orderkubo.com/" }],
    focus: [
      {
        title: "Serve customers at the counter",
        description:
          "Bring product lookup, quantities, discounts, and customer information into the checkout workflow.",
      },
      {
        title: "See how the store runs",
        description:
          "Connect stock, sales activity, and reports so teams can review what happened during the day.",
      },
    ],
  },
  {
    id: "modelcab",
    title: "ModelCab",
    description:
      "A developer console and asynchronous API for text and image generation, with a Playground to test models before integrating them into an application.",
    category: "Products",
    year: "Current",
    tags: ["AI gateway", "Developer tools", "API"],
    links: [{ label: "Visit website", href: "https://modelcab.com/" }],
    focus: [
      {
        title: "Try models in the Playground",
        description:
          "Explore the model catalog, test a prompt, and export an API request from the console.",
      },
      {
        title: "Integrate asynchronous requests",
        description:
          "Submit a job through the API, then retrieve its result using the job ID.",
      },
    ],
  },
  {
    id: "filemaple",
    title: "FileMaple",
    description:
      "A web workspace that connects to S3-compatible storage so teams can organize uploads, share files, and publish download pages.",
    category: "Products",
    year: "Current",
    tags: ["Cloud storage", "File management", "Upload API"],
    links: [{ label: "Visit website", href: "https://filemaple.com/" }],
    focus: [
      {
        title: "Manage files in your own bucket",
        description:
          "Browse folders, organize files, monitor activity, and share files from a connected S3-compatible bucket.",
      },
      {
        title: "Upload from the web or a script",
        description:
          "Drag files into the workspace or use a scoped API key for multipart uploads.",
      },
    ],
  },
  {
    id: "linkmaple",
    title: "LinkMaple",
    description:
      "A link-shortening platform for publishers to share short URLs, track eligible views, and request payouts from monetized links.",
    category: "Products",
    year: "Current",
    tags: ["URL shortening", "Publisher analytics", "Link monetization"],
    links: [{ label: "Visit website", href: "https://linkmaple.com/" }],
    focus: [
      {
        title: "Create links for sharing",
        description:
          "Turn a destination URL into a short link and choose an ad format for monetized publisher links.",
      },
      {
        title: "Track activity and payouts",
        description:
          "Review eligible views and earnings in the publisher dashboard, then request a payout when the balance reaches its minimum.",
      },
    ],
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
    id: "romcamp",
    title: "Romcamp",
    description:
      "A discovery site for classic console games, with a searchable game archive, a personal favorites shelf, and practical emulator setup guides.",
    category: "Products",
    year: "Current",
    tags: ["Game catalog", "Search and discovery", "Field guides"],
    links: [{ label: "Visit website", href: "https://romcamp.com/" }],
    focus: [
      {
        title: "Find a familiar game or a new favorite",
        description:
          "Search the archive, browse by console or genre, and keep a personal collection in your browser.",
      },
      {
        title: "Get oriented with field guides",
        description:
          "Read console profiles, emulator overviews, and step-by-step setup notes.",
      },
    ],
  },
  {
    id: "muslim-everyday",
    title: "Muslim Everyday",
    description:
      "An editorial website with practical guides to Islam, Quran reading, prayer, and everyday Muslim life.",
    category: "Products",
    year: "Current",
    tags: ["Editorial website", "Learning resources", "Content discovery"],
    links: [{ label: "Visit website", href: "https://muslimeveryday.com/" }],
    focus: [
      {
        title: "Start with a guided introduction",
        description:
          "Browse topic guides on core beliefs, reading the Quran, preparing for daily prayer, and observing Ramadan.",
      },
      {
        title: "Explore related articles",
        description:
          "Find recent articles and related guides by topic, with site search for specific questions.",
      },
    ],
  },
  {
    id: "mc-dental-station",
    title: "MC Dental Station",
    description:
      "A dental clinic website that brings service information, appointment requests, and approved FAQ assistance together, with a workspace for the clinic team.",
    category: "Products",
    year: "Current",
    tags: ["Clinic website", "Appointment requests", "Staff workspace"],
    links: [
      { label: "Visit website", href: "https://mc-dental.syntaxsurge.com/" },
    ],
    focus: [
      {
        title: "A clear next step for patients",
        description:
          "Services, clinic hours, contact details, and directions help visitors plan their visit before sending an appointment request.",
      },
      {
        title: "Appointment requests the team can manage",
        description:
          "A form and guided chat collect the preferred service and schedule. Clinic staff confirm the final appointment, with optional email reminders after confirmation.",
      },
      {
        title: "Consistent answers and content",
        description:
          "English and Filipino FAQs use clinic-approved information. The staff workspace brings appointment management, website content, and the knowledge base together.",
      },
    ],
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
      { label: "Visit website", href: "https://kaldi-rewards.syntaxsurge.com/" },
    ],
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
    id: "wrap-it-up",
    title: "Wrap It Up!",
    description:
      "A cozy, offline gift-wrapping shop game. Handcraft presents, meet customers, and find your own rhythm behind Grandma Mimi's counter.",
    category: "Products",
    year: "Current",
    tags: ["Godot", "Mobile game", "Offline play"],
    links: [
      { label: "Android beta", href: wrapItUp.playTestingUrl },
      { label: "TestFlight", href: wrapItUp.testFlightUrl },
    ],
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
    id: "cliplore",
    title: "ClipLore for Story Protocol",
    description:
      "An AI video creation and editing project for Story Protocol, with IP registration, licensing, remixing, and ownership enforcement.",
    category: "AI & Web3",
    year: "2025",
    tags: ["Story Protocol", "IP licensing", "Remixing & enforcement"],
    links: [
      { label: "GitHub", href: "https://github.com/syntaxsurge/cliplore" },
      {
        label: "Watch demo",
        href: "https://www.youtube.com/watch?v=WRJlQDFcxVI",
      },
    ],
    award: "Creative Front-End / UI / UX winner · Story Protocol",
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
    prize: "2,600 USDT",
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
    prize: "~US$2,000",
  },
  {
    projectId: "rivalidate",
    title: "Runner-up · Consumer Track",
    event: "Base Batch 001 · APAC",
    issuer: "Base (Coinbase)",
    date: "2025-06",
    prize: "0.5 ETH (~US$2,000)",
  },
  {
    projectId: "polkastamp",
    title: "Smart Contracts · PAPI DApps · Open Solidity winner",
    event: "Polkadot Scalability Hackathon 2025",
    issuer: "Polkadot",
    date: "2025-06",
    prize: "US$7,650",
  },
  {
    projectId: "hirestamp",
    title: "2nd place · Commerce & Gig Economy",
    event: "(A)I BUIDL Lab Hackathon 2025",
    issuer: "RootstockLabs · thirdweb · Alchemy",
    date: "2025-05",
    prize: "US$1,000",
  },
  {
    projectId: "aipenguild",
    title: "1st place · NFT Category",
    event: "Polkadot Byaheng Pilipinas Hackathon 2025",
    issuer: "OpenGuild · Web3Bulacan",
    date: "2025-03",
    prize: "US$2,000",
  },
];
