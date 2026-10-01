import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { wrapItUp } from "@/data/wrap-it-up";

const description = "Installation help, gameplay FAQs, save-data guidance, and developer support for Wrap It Up!";
export const metadata: Metadata = {
  title: "Wrap It Up! Support",
  description,
  alternates: { canonical: `${wrapItUp.path}/support` },
  openGraph: { title: "Wrap It Up! Support", description, url: `${wrapItUp.path}/support`, images: [wrapItUp.artwork] },
};

export default function WrapItUpSupportPage() {
  return (
    <>
      <div className="project-page-header">
        <span className="eyebrow section-label">WRAP IT UP! / SUPPORT</span>
        <h1>A helping hand.</h1>
        <p>Installation tips, answers to common questions, and a direct way to reach the developer.</p>
      </div>
      <section className="app-copy app-callout" aria-labelledby="support-contact">
        <h2 id="support-contact">Contact support.</h2>
        <p>Wrap It Up! is developed by Jade Laurence Empleo (SyntaxSurge). Include your device model, operating-system version, game version, what happened, and the steps that led to it. A screenshot can help; avoid including passwords or private information.</p>
        <a href={wrapItUp.contactUrl} className="button button-dark">{wrapItUp.contactLabel} <Arrow diagonal /></a>
        <p><a href={wrapItUp.contactUrl}>{wrapItUp.supportEmail}</a></p>
        <p className="app-small-copy">Current beta version: {wrapItUp.version}. You can also send beta feedback through TestFlight.</p>
      </section>
      <section className="app-copy app-faq" aria-labelledby="support-faq">
        <h2 id="support-faq">Frequently asked questions.</h2>
        <details><summary>How do I install the Android beta?</summary><p>Open the <a href={wrapItUp.playTestingUrl} target="_blank" rel="noopener noreferrer">Google Play internal-test enrollment page</a> while signed in with the Google account that was added to the tester list. Opt in, then follow the Google Play installation link. Internal testing is invitation-only; the link does not make every account eligible.</p></details>
        <details><summary>How do I install the iPhone or iPad beta?</summary><p>Install Apple&apos;s TestFlight app, then open the <a href={wrapItUp.testFlightUrl} target="_blank" rel="noopener noreferrer">Wrap It Up! TestFlight invitation</a>. An invitation may be unavailable while a build is being reviewed or if the group is full. TestFlight tells you when a build has expired or an update is available.</p></details>
        <details><summary>Can I play offline?</summary><p>Yes. The wrapping workshop, shop days, and local save work without an internet connection. Installing or updating the game, using store beta services, opening links, and sending feedback require their own connections.</p></details>
        <details><summary>Where is my progress saved?</summary><p>Progress and settings are saved in the app&apos;s private storage on this device. There is no player account or cloud-sync service. Keep the app installed if you want to keep your progress; clearing app data or deleting the app can remove it. We cannot restore a local save from a server.</p></details>
        <details><summary>Are ads or real-money purchases available?</summary><p>Rewarded advertisements and real-money purchases are disabled in the current distributed beta, {wrapItUp.version}. The game remains playable without them. Game currency earned during play is local game progress.</p></details>
        <details><summary>How do I capture a finished gift?</summary><p>Open the in-game menu and choose Capture. The game creates a PNG of your creation. Android can offer the system Share chooser; select the app you want to receive it. Other platforms may keep the PNG locally. Captures do not require access to your photo library.</p></details>
        <details><summary>The game is stuck or a touch action stopped working. What can I try?</summary><p>Close the in-game menu if it is open, return to the game, and try the action again. If needed, close and reopen the app, and check for a beta update. Avoid uninstalling or clearing data during troubleshooting, as your progress is stored locally. If it persists, send the steps and device details to support.</p></details>
        <details><summary>How do I remove my data?</summary><p>Use Android&apos;s app-storage controls to clear app data, or delete the app on iOS. An iOS offload keeps app documents and data, so use Delete App when you want to remove them. Images you shared or saved elsewhere remain with their destination. Contact support if you want help with a message you previously sent.</p></details>
      </section>
      <p className="app-copy"><Link className="text-link" href={`${wrapItUp.path}/privacy`}>Read the privacy policy <Arrow /></Link></p>
    </>
  );
}
