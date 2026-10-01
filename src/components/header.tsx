import Link from "next/link";
import { Spark } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link
          href="/#top"
          className="wordmark"
          aria-label="Jade Laurence Empleo — home"
        >
          <span className="brand-symbol">
            <Spark />
          </span>
          <span>
            jade<span className="wordmark-dot">.</span>
          </span>
        </Link>
        <nav className="primary-navigation" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#archive">All projects</Link>
          <Link href="/#about">About</Link>
          <Link href="/#recognition">Recognition</Link>
          <Link className="header-contact" href="/#contact">
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
