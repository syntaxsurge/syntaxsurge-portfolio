import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Trophy } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { awards, projects } from "@/data/portfolio";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };
const selectedWork = [
  {
    id: "mc-dental-station",
    label: "A simpler clinic visit",
    note: "Services, appointment requests, and answers in one place.",
  },
  {
    id: "kaldi",
    label: "A reason to come back",
    note: "A café experience built around reviews, rewards, and loyalty.",
  },
  {
    id: "cliplore",
    label: "An idea, brought to life",
    note: "AI video creation with a hands-on editor for every scene.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="business-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> SOFTWARE FOR YOUR BUSINESS
            </span>
            <h1 id="hero-title">
              Your business,
              <br />
              <span>better connected.</span>
            </h1>
            <p className="hero-description">
              Websites, custom software, and practical AI tools. Built around
              the way you work, and the people you serve.
            </p>
            <div className="hero-actions">
              <a
                className="button button-dark"
                href={business.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start a project <Arrow diagonal />
                <span className="sr-only"> (opens LinkedIn in a new tab)</span>
              </a>
              <a className="button button-outline" href="#work">
                Explore our work <Arrow />
              </a>
            </div>
            <p className="hero-business-name">{business.legalName}</p>
          </div>
          <div
            className="brand-stage"
            aria-label="Syntax Surge business identity"
          >
            <div className="stage-top">
              <span className="mono">IDEA → DESIGN → BUILD</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="stage-logo">
              <Image
                src={business.logo.src}
                alt="Syntax Surge blue lightning bolt and black code brackets logo"
                width={business.logo.width}
                height={business.logo.height}
                sizes="(max-width: 700px) 220px, 280px"
                preload
              />
            </div>
            <div className="stage-bottom">
              <span>
                Clear. Useful.
                <br />
                Made for people.
              </span>
              <span className="stage-location">
                BASED IN
                <br />
                THE PHILIPPINES
              </span>
            </div>
          </div>
        </section>

        <div className="business-proof shell">
          <a href="#registration">
            <span className="proof-symbol" aria-hidden="true">
              ✓
            </span>
            <span>
              DTI-registered business<span>National scope</span>
            </span>
            <Arrow />
          </a>
          <Link href="/work">
            <strong>{projects.length}</strong>
            <span>
              Projects to explore<span>Websites, apps & tools</span>
            </span>
            <Arrow />
          </Link>
          <Link href="/recognition">
            <Trophy />
            <span>
              {awards.length} hackathon recognitions
              <span>A record of hands-on work</span>
            </span>
            <Arrow />
          </Link>
        </div>

        <section
          id="services"
          className="business-section shell"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">HOW WE CAN HELP</span>
              <h2 id="services-title">
                A useful next step
                <br />
                for your business.
              </h2>
            </div>
            <p>
              Start with what you need. We’ll work out the right solution
              together.
            </p>
          </div>
          <div className="services-grid">
            {business.services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-number mono">
                  0{index + 1}
                  <Arrow diagonal />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-examples">{service.examples}</span>
              </article>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="business-section work-section"
          aria-labelledby="work-title"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow section-label">SELECTED WORK</span>
                <h2 id="work-title">
                  Good ideas.
                  <br />
                  Working in the real world.
                </h2>
              </div>
              <Link href="/work" className="text-link">
                All {projects.length} projects <Arrow />
              </Link>
            </div>
            <div className="selected-work-grid">
              {selectedWork.map(({ id, label, note }) => {
                const project = projects.find((p) => p.id === id);
                if (!project) return null;
                return (
                  <article className={`feature-card feature-${id}`} key={id}>
                    <Link
                      className="feature-image-link"
                      href={`/work/${id}`}
                      aria-label={`View ${project.title} project details`}
                    >
                      <ProjectVisual id={id} />
                      <span className="card-open">
                        <Arrow diagonal />
                      </span>
                    </Link>
                    <div className="feature-info">
                      <span className="eyebrow feature-kicker">{label}</span>
                      <h3>
                        <Link href={`/work/${id}`}>{project.title}</Link>
                      </h3>
                      <p>{note}</p>
                    </div>
                    <div className="feature-actions">
                      <Link className="text-link" href={`/work/${id}`}>
                        Project details <Arrow />
                      </Link>
                      <a
                        className="text-link"
                        href={project.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.links[0].label}: ${project.title} (opens in a new tab)`}
                      >
                        {project.links[0].label}
                        <Arrow diagonal />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="team"
          className="business-section shell"
          aria-labelledby="team-title"
        >
          <div className="team-grid">
            <div className="team-intro">
              <span className="eyebrow section-label">THE TEAM</span>
              <h2 id="team-title">
                A person you can
                <br />
                build with.
              </h2>
              <p>
                Work directly with the person designing and developing your
                project. Clear conversations, thoughtful decisions, and a shared
                goal.
              </p>
              <a
                className="text-link"
                href={business.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s talk about your project <Arrow diagonal />
                <span className="sr-only"> (opens LinkedIn in a new tab)</span>
              </a>
            </div>
            <article className="team-card">
              <div className="team-portrait">
                <Image
                  src={business.founder.portrait.src}
                  alt="Jade Laurence Empleo, founder of Syntax Surge"
                  width={business.founder.portrait.width}
                  height={business.founder.portrait.height}
                  sizes="(max-width: 700px) 100vw, 420px"
                />
              </div>
              <div className="team-card-info">
                <div>
                  <h3>{business.founder.name}</h3>
                  <p>{business.founder.role}</p>
                </div>
                <a
                  href={business.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Meet Jade Laurence Empleo on LinkedIn (opens in a new tab)"
                >
                  <Arrow diagonal />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section
          id="registration"
          className="registration-section shell"
          aria-labelledby="registration-title"
        >
          <div className="registration-card">
            <div className="registration-copy">
              <span className="eyebrow section-label">
                BUSINESS REGISTRATION
              </span>
              <h2 id="registration-title">Registered. Ready to build.</h2>
              <p className="registration-name">{business.legalName}</p>
              <p className="registration-scope">
                DTI business-name registration · {business.certificate.scope}{" "}
                scope
              </p>
              <p className="registration-scope">
                Business Name No. {business.certificate.number}
              </p>
              <div className="registration-actions">
                <a
                  className="button button-outline"
                  href={business.certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View certificate <Arrow diagonal />
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
                <a
                  className="text-link"
                  href={business.certificate.href}
                  download
                >
                  Download PDF <Arrow />
                </a>
              </div>
            </div>
            <a
              className="certificate-preview"
              href={business.certificate.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the DTI business-name registration certificate (PDF, opens in a new tab)"
            >
              <Image
                src={business.certificate.preview.src}
                alt={`Preview of the DTI certificate for ${business.legalName}`}
                width={business.certificate.preview.width}
                height={business.certificate.preview.height}
                sizes="(max-width: 700px) 240px, 260px"
              />
              <span>
                DTI CERTIFICATE <Arrow diagonal />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
