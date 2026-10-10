import Image from "next/image";
import { business } from "@/data/business";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
        <a
          href="/#top"
          className="wordmark"
          aria-label={`${business.name} — home`}
        >
          <span className="brand-symbol">
            <Image
              src={business.logo.src}
              alt=""
              width={44}
              height={44}
              sizes="44px"
              preload
            />
          </span>
          <span>{business.name}</span>
        </a>
        <nav className="primary-navigation" aria-label="Main navigation">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
          <a href="/#services">Services</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
          <a href="/#work">Work</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
          <a href="/#team">Team</a>
          <a className="header-contact" href="#contact">
            Contact
          </a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a
            className="button button-dark header-resume"
            href={business.resumeHref}
            download
            aria-label={`Download ${business.founder.fullName}'s résumé (PDF)`}
          >
            Download résumé <span className="resume-format">PDF</span>
          </a>
        </div>
      </div>
    </header>
  );
}
