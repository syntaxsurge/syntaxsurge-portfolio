import Link from "next/link";
import { Arrow, Github, Spark } from "./icons";

export function Footer() {
  return (
    <footer id="contact" className="footer" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-top">
          <span className="eyebrow">
            <span className="status-dot" /> GET IN TOUCH
          </span>
          <span className="mono">LET’S MAKE IT REAL</span>
        </div>
        <h2 id="contact-title" className="contact-title">
          Good things start
          <br />
          with a conversation.
        </h2>
        <div className="contact-actions">
          <p className="contact-copy">
            Have a project in mind? Reach out on LinkedIn and tell me about it.
          </p>
          <a
            className="button button-lime"
            href="https://www.linkedin.com/in/jade-laurence-empleo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message me on LinkedIn <Arrow diagonal />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
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
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
