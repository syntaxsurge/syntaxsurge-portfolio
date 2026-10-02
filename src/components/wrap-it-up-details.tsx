import Link from "next/link";
import { Arrow } from "@/components/icons";
import { wrapItUp } from "@/data/wrap-it-up";

export function WrapItUpNavigation({
  current,
}: {
  current: "game" | "support" | "privacy";
}) {
  const links = [
    { key: "game", label: "The game", href: wrapItUp.path },
    { key: "support", label: "Support", href: `${wrapItUp.path}/support` },
    { key: "privacy", label: "Privacy", href: `${wrapItUp.path}/privacy` },
  ];
  return (
    <nav className="app-navigation" aria-label="Wrap It Up! navigation">
      {links.map((link) => (
        <Link key={link.key} href={link.href} aria-current={current === link.key ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function WrapItUpBetaNote() {
  return (
    <div className="detail-note">
      <span className="eyebrow">TESTING / VERSION {wrapItUp.version}</span>
      <h3>Join the beta.</h3>
      <p>The Android and TestFlight actions above open beta enrollment pages. Availability depends on your tester access and the store&apos;s current review status.</p>
      <p>Android requires an allowlisted Google account. TestFlight requires Apple&apos;s TestFlight app and an available invitation. The game is not yet a public App Store or Google Play release.</p>
    </div>
  );
}

export function WrapItUpDetails() {
  return (
    <>
      <section className="app-copy" aria-labelledby="game-about">
        <h2 id="game-about">Your own cozy wrapping shop.</h2>
        <p>A little paper. A perfect ribbon. A gift made with care.</p>
        <p>Step behind the counter at Grandma Mimi&apos;s shop. Meet customers, read their orders, and turn everyday objects into thoughtful presents. Choose your supplies, unroll and cut the paper, fold each shape, seal it with tape, and finish with ribbons, bows, cards, and little details.</p>
        <div className="app-feature-grid">
          <article><h3>Make it by hand</h3><p>A touch-first wrapping workshop with boxes, cylinders, and round gifts.</p></article>
          <article><h3>Find your rhythm</h3><p>Play through shop days, discover supplies and customer stories, or relax in Zen mode.</p></article>
          <article><h3>Play wherever you are</h3><p>Core gameplay works offline. No player account, energy bars, or cloud save is required.</p></article>
        </div>
      </section>
      <section className="app-copy" aria-labelledby="game-help">
        <h2 id="game-help">A helping hand.</h2>
        <p>Need installation help, have a wrapping question, or want to report a bug?</p>
        <Link href={`${wrapItUp.path}/support`} className="text-link">Visit support <Arrow /></Link>
      </section>
    </>
  );
}
