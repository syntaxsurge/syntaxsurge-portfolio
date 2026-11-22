import Link from "next/link";
import { business } from "@/data/business";
import { Arrow, Github } from "./icons";
import { SectionReveal } from "./section-reveal";
import { MotionToggle } from "./motion-toggle";

export function Footer() {
  return (
    <footer id="contact" className="footer" aria-labelledby="contact-title">
      <div className="shell">
        <SectionReveal variant="rise" className="contact-heading">
          <h2 id="contact-title" className="contact-title">
            Let’s talk about your project
          </h2>
        </SectionReveal>
        <div className="contact-actions">
          <p className="contact-copy">
            Tell us what you’d like to build, who it’s for and when you hope to
            launch. Jade will help you work out the next step.
          </p>
          <div className="contact-links">
            <a
              className="button button-lime contact-email"
              href={business.links.email}
            >
              {business.email} <Arrow diagonal />
            </a>
            <a
              className="text-link footer-linkedin"
              href={business.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Or connect on LinkedIn <Arrow diagonal />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <Link
            className="footer-brand"
            href="/#top"
            aria-label={`${business.name} — home`}
          >
            {business.legalName}
            <span>© {new Date().getFullYear()}</span>
          </Link>
          <div>
            <MotionToggle />
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
            <a href="/#work">All projects</a>
            <Link href="/recognition#top">Recognition</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
            <a href="/#registration">DTI registration</a>
            <a
              href={business.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> GitHub <Arrow diagonal />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
