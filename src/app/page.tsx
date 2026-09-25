import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Spark, Trophy } from "@/components/icons";
import { ProjectArchive } from "@/components/project-archive";
import { ProjectVisual, featuredIds } from "@/components/project-visual";
import { awards, projects } from "@/data/portfolio";
import { AwardCard } from "@/components/award-card";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };
const featuredNotes: Record<string, string> = {
  cliplore: "AI video creation, with the editor still in your hands.",
  studysoda: "A fresh way to turn study material into understanding.",
  sipava: "Small commitments. Real follow-through.",
  kaldi: "From a tap at the café to a reason to come back.",
};
const featuredTags: Record<string, string> = {
  cliplore: "AI · CREATOR TOOLS",
  studysoda: "AI · EDUCATION",
  sipava: "PRODUCTIVITY · ACCOUNTABILITY",
  kaldi: "NFC · CUSTOMER EXPERIENCE",
};
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-intro">
            <span className="eyebrow">
              <span className="status-dot" /> DEVELOPER & PRODUCT BUILDER
            </span>
            <span className="mono hero-location">
              BASED IN THE PHILIPPINES ↗
            </span>
          </div>
          <div className="hero-main">
            <div>
              <h1 id="hero-title">
                Ideas into things
                <br />
                <span>people use.</span>
                <span className="title-period">✳</span>
              </h1>
              <div className="hero-bottom">
                <p>
                  I’m Jade Laurence Empleo.
                  <br />I build thoughtful digital products —
                  <br className="desktop-break" /> from the first sketch to the
                  last detail.
                </p>
                <a href="#work" className="button button-dark">
                  Explore my work <Arrow />
                </a>
              </div>
            </div>
            <div className="hero-object" aria-hidden="true">
              <div className="object-grid" />
              <div className="object-stamp">
                <svg viewBox="0 0 240 240">
                  <defs>
                    <path
                      id="circle-text"
                      d="M120,120 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#circle-text" textLength="585">
                      CURIOUS BY NATURE · BUILDER BY CHOICE ·{" "}
                    </textPath>
                  </text>
                </svg>
                <Spark />
              </div>
              <span className="object-note mono">DESIGN. DEVELOP. SHIP.</span>
              <span className="object-cross">+</span>
            </div>
          </div>
          <div className="hero-proof">
            <div>
              <span className="proof-count">
                {awards.length}
                <span>↗</span>
              </span>
              <p>
                hackathon recognitions
                <br />
                <span>and counting</span>
              </p>
            </div>
            <span className="proof-divider" />
            <p className="proof-label mono">RECOGNIZED AT EVENTS BY</p>
            <div className="recognizer-list">
              <span>
                Solana
                <span className="solana-bars" aria-hidden="true">
                  ≋
                </span>
              </span>
              <span>
                Base <span className="base-mark" aria-hidden="true" />
              </span>
              <span>
                Story<span className="story-mark">✳</span>
              </span>
              <span>
                Polkadot<span className="polka-dot">•</span>
              </span>
            </div>
          </div>
        </section>
        <section id="work" className="selected-section shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">01 / SELECTED WORK</span>
              <h2>Built with intention.</h2>
            </div>
            <p>
              A few things I’ve brought to life.
              <br />
              Different problems. The same care.
            </p>
          </div>
          <div className="featured-grid">
            {featuredIds.map((id, index) => {
              const p = projects.find((p) => p.id === id);
              if (!p) return null;
              return (
                <article key={id} className={`feature-card feature-${id}`}>
                  <Link
                    href={`/work/${id}`}
                    className="feature-image-link"
                    aria-label={`Explore ${p.title}`}
                  >
                    <ProjectVisual id={id} priority={index === 0} />
                    <span className="card-open">
                      <Arrow diagonal />
                    </span>
                    {id === "cliplore" && (
                      <span className="feature-award">
                        <Trophy /> FRONT-END / UI / UX WINNER
                      </span>
                    )}
                  </Link>
                  <div className="feature-info">
                    <div>
                      <span className="mono feature-kicker">
                        {featuredTags[id]}
                      </span>
                      <h3>
                        <Link href={`/work/${id}`}>{p.title}</Link>
                      </h3>
                      <p>{featuredNotes[id]}</p>
                    </div>
                    <span className="feature-number mono">0{index + 1}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="shell about-grid">
            <div>
              <span className="eyebrow section-label">
                02 / THE PERSON BEHIND THE PIXELS
              </span>
              <h2>
                A builder’s mind.
                <br />A designer’s eye.
              </h2>
              <p className="about-signature">
                Jade<span> / SyntaxSurge</span>
              </p>
            </div>
            <div className="about-copy">
              <p>
                I like taking a complicated idea and finding the simple, useful
                product inside it.
              </p>
              <p>
                My work moves between AI, everyday tools, and on-chain
                applications. Whether it’s a video editor, a study companion, or
                a café loyalty experience, I care about the whole thing: what it
                does, how it feels, and why someone would come back.
              </p>
              <div className="capabilities">
                <span>Product development</span>
                <span>UI & interaction design</span>
                <span>AI experiences</span>
                <span>Web3 applications</span>
              </div>
              <a
                className="text-link"
                href="https://github.com/syntaxsurge"
                target="_blank"
                rel="noopener noreferrer"
              >
                A closer look at the code <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
        <section id="recognition" className="recognition-section shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">03 / RECOGNITION</span>
              <h2>Ideas put to the test.</h2>
            </div>
            <p>
              Built, presented, and recognized
              <br />
              on a global stage.
            </p>
          </div>
          <div className="recognition-intro">
            <span className="award-big">
              {awards.length}
              <Spark />
            </span>
            <div>
              <h3>Hackathons. Bounties. Buildathons.</h3>
              <p>
                From creative interfaces to verifiable systems.
                <br />
                Here’s the record, one project at a time.
              </p>
            </div>
            <span className="mono recognition-years">2025 — 2026</span>
          </div>
          <div className="awards-grid">
            {awards.slice(0, 4).map((a) => (
              <AwardCard key={`${a.projectId}-${a.date}`} award={a} />
            ))}
          </div>
          <details className="more-awards">
            <summary>
              <span className="expand-awards-label">
                Explore all {awards.length} recognitions
              </span>
              <span className="collapse-awards-label">Show the highlights</span>{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="awards-grid">
              {awards.slice(4).map((a) => (
                <AwardCard key={`${a.projectId}-${a.date}`} award={a} />
              ))}
            </div>
          </details>
        </section>
        <section id="archive" className="archive-section shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">
                04 / THE FULL COLLECTION
              </span>
              <h2>Always making something.</h2>
            </div>
            <p>
              Products, prototypes, and
              <br />a few ambitious experiments.
            </p>
          </div>
          <ProjectArchive />
        </section>
      </main>
      <Footer />
    </>
  );
}
