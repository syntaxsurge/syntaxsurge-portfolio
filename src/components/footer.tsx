import Link from "next/link";
import { Arrow, Github, Spark } from "./icons";
export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="shell">
        <div className="contact-top">
          <span className="eyebrow">
            <span className="status-dot" /> HAVE SOMETHING IN MIND?
          </span>
          <span className="mono">LET’S MAKE IT REAL</span>
        </div>
        <a
          className="contact-title"
          href="https://www.linkedin.com/in/jade-laurence-empleo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Good things start
          <br />
          with a conversation.
          <span className="contact-arrow">
            <Arrow diagonal />
          </span>
        </a>
        <div className="footer-bottom">
          <Link className="footer-brand" href="/" aria-label="Back to home">
            <Spark /> Jade Laurence Empleo
            <span>© {new Date().getFullYear()}</span>
          </Link>
          <div>
            <a
              href="https://github.com/syntaxsurge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> GitHub <Arrow diagonal />
            </a>
            <a
              href="https://www.linkedin.com/in/jade-laurence-empleo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Arrow diagonal />
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
