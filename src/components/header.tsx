import Link from "next/link";
import { Arrow, Spark } from "./icons";
import { ThemeToggle } from "./theme-toggle";
export function Header() {
  return (
    <header className="site-header shell">
      <Link
        href="/"
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
      <nav aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#recognition">Recognition</Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a
          className="header-contact"
          href="https://www.linkedin.com/in/jade-laurence-empleo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let’s talk <Arrow diagonal />
        </a>
      </div>
    </header>
  );
}
