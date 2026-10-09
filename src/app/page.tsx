import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Trophy } from "@/components/icons";
import { HeroMotion } from "@/components/hero-motion";
import { ProjectArchive } from "@/components/project-archive";
import { awards } from "@/data/portfolio";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="business-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> SOFTWARE, WITH A HUMAN TOUCH
            </span>
            <h1 id="hero-title">
              Make your next
              <br />
              <span>big move.</span>
            </h1>
            <p className="hero-description">
              Websites, apps and AI tools that turn your next idea into
              something people love to use.
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
                See the work <Arrow />
              </a>
            </div>
            <div className="hero-trust">
              <a href="#registration">
                <span aria-hidden="true">✓</span> DTI registered
              </a>
              <Link href="/recognition">
                <Trophy /> {awards.length} hackathon recognitions <Arrow />
              </Link>
            </div>
          </div>
          <HeroMotion />
        </section>

        <section
          id="services"
          className="business-section services-section shell"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">WHAT WE BUILD</span>
              <h2 id="services-title">Made for your business.</h2>
            </div>
          </div>
          <div className="services-grid">
            {business.services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-number mono">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
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
                <span className="eyebrow section-label">IDEAS IN ACTION</span>
                <h2 id="work-title">The work speaks.</h2>
              </div>
              <p>Find your kind of project.</p>
            </div>
            <ProjectArchive />
          </div>
        </section>

        <section
          id="team"
          className="business-section shell"
          aria-labelledby="team-title"
        >
          <div className="team-grid">
            <div className="team-intro">
              <span className="eyebrow section-label">MEET THE FOUNDER</span>
              <h2 id="team-title">Built with Jade.</h2>
              <p>
                Work directly with your designer and developer, from the first
                idea to the final details.
              </p>
              <div className="team-links">
                <a
                  className="button button-outline"
                  href={business.resumeHref}
                  download
                >
                  Download résumé <Arrow />
                  <span className="sr-only"> (PDF)</span>
                </a>
                <a
                  className="text-link"
                  href={business.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview résumé <Arrow diagonal />
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </div>
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
                REGISTERED IN THE PHILIPPINES
              </span>
              <h2 id="registration-title">Registered business.</h2>
              <p className="registration-name">{business.legalName}</p>
              <p className="registration-scope">
                DTI · {business.certificate.scope} scope · No.{" "}
                {business.certificate.number}
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
                sizes="(max-width: 700px) 220px, 200px"
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
