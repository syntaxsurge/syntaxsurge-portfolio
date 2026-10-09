import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link
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
        </Link>
        <nav className="primary-navigation" aria-label="Main navigation">
          <Link href="/#services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/#team">Team</Link>
          <Link className="header-contact" href="#contact">
            Contact
          </Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
