import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import { siteUrl } from "@/lib/site";
const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Jade Laurence Empleo — Developer & Product Builder",
    template: "%s — Jade Laurence Empleo",
  },
  description:
    "The selected work of Jade Laurence Empleo, also known as SyntaxSurge. Thoughtful products, AI tools, and award-winning Web3 applications.",
  applicationName: "Jade · SyntaxSurge",
  authors: [
    { name: "Jade Laurence Empleo", url: "https://github.com/syntaxsurge" },
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Jade Laurence Empleo — Ideas into things people use.",
    description:
      "Explore products and award-winning experiments by SyntaxSurge.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade Laurence Empleo — Developer & Product Builder",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
