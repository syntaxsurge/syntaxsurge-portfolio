import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import { siteUrl } from "@/lib/site";
import { business } from "@/data/business";
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
const display = localFont({
  src: "../../public/fonts/space-grotesk-variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: business.legalName,
    template: `%s — ${business.name}`,
  },
  description: business.description,
  applicationName: business.name,
  authors: [{ name: business.legalName, url: siteUrl.toString() }],
  creator: business.name,
  publisher: business.legalName,
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title: business.legalName,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: business.legalName,
    description: business.description,
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
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body id="top">
        {/* Run before visible content, outside the head where extensions inject scripts. */}
        <script
          id="syntaxsurge-theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
