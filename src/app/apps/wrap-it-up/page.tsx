import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { wrapItUp } from "@/data/wrap-it-up";

const description =
  "A cozy, offline gift-wrapping shop game. Choose paper, fold, tape, decorate, and make each customer's gift your own.";

export const metadata: Metadata = {
  title: "Wrap It Up! — A cozy gift-wrapping game",
  description,
  alternates: { canonical: wrapItUp.path },
  openGraph: {
    title: "Wrap It Up! — Fold. Tape. Ribbon. Delight!",
    description,
    url: wrapItUp.path,
    images: [{ url: wrapItUp.artwork, width: 1024, height: 500, alt: "Wrap It Up! gift-wrapping shop artwork" }],
  },
};

export default function WrapItUpPage() {
  return (
    <>
      <div className="project-page-header">
        <span className="eyebrow section-label">COZY GAME / ANDROID & iOS BETA</span>
        <h1>Wrap It Up!</h1>
        <p>A little paper. A perfect ribbon. A gift made with care.</p>
      </div>
      <figure className="app-artwork">
        <Image src={wrapItUp.artwork} width={1024} height={500} sizes="(max-width: 700px) 100vw, 1100px" preload alt="Two hand-wrapped gifts, ribbons, paper, and scissors on a warm storybook shop counter" />
        <figcaption>Official game artwork. Fold. Tape. Ribbon. Delight!</figcaption>
      </figure>
      <section className="app-copy" aria-labelledby="game-about">
        <h2 id="game-about">Your own cozy wrapping shop.</h2>
        <p>Step behind the counter at Grandma Mimi&apos;s shop. Meet customers, read their orders, and turn everyday objects into thoughtful presents. Choose your supplies, unroll and cut the paper, fold each shape, seal it with tape, and finish with ribbons, bows, cards, and little details.</p>
        <div className="app-feature-grid">
          <article><h3>Make it by hand</h3><p>A touch-first wrapping workshop with boxes, cylinders, and round gifts.</p></article>
          <article><h3>Find your rhythm</h3><p>Play through shop days, discover supplies and customer stories, or relax in Zen mode.</p></article>
          <article><h3>Play wherever you are</h3><p>Core gameplay works offline. No player account, energy bars, or cloud save is required.</p></article>
        </div>
      </section>
      <section className="app-copy app-callout" aria-labelledby="game-beta">
        <span className="eyebrow">TESTING / VERSION {wrapItUp.version}</span>
        <h2 id="game-beta">Join the beta.</h2>
        <p>Wrap It Up! is in testing. These links are beta enrollment pages, and availability depends on your tester access and the store&apos;s current review status.</p>
        <div className="project-links">
          <a className="button button-dark" href={wrapItUp.playTestingUrl} target="_blank" rel="noopener noreferrer">Android internal testing <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
          <a className="button button-outline" href={wrapItUp.testFlightUrl} target="_blank" rel="noopener noreferrer">iPhone & iPad TestFlight <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <p className="app-small-copy">Android requires an allowlisted Google account. TestFlight requires Apple&apos;s TestFlight app and an available invitation. The game is not yet a public App Store or Google Play release.</p>
      </section>
      <section className="app-copy" aria-labelledby="game-help">
        <h2 id="game-help">A helping hand.</h2>
        <p>Need installation help, have a wrapping question, or want to report a bug?</p>
        <Link href={`${wrapItUp.path}/support`} className="text-link">Visit support <Arrow /></Link>
      </section>
    </>
  );
}
