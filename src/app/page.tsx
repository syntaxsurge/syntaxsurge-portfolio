import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, DownloadIcon } from "@/components/icons";
import { HeroPortrait } from "@/components/hero-portrait";
import { ProjectArchive } from "@/components/project-archive";
import { PortfolioFacts } from "@/components/portfolio-facts";
import { ServiceShowcase } from "@/components/service-showcase";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="business-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Built around
              <br />
              <span>your business.</span>
            </h1>
            <p className="hero-description">
              Websites, apps and automation. From first idea to launch.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href={business.links.email}>
                Start a project <Arrow diagonal />
              </a>
              <a className="button button-outline" href="#work">
                See the work <Arrow />
              </a>
            </div>
            <a
              className="hero-resume text-link"
              href={business.resumeHref}
              download
            >
              <DownloadIcon /> Download résumé{" "}
              <span className="resume-format">PDF</span>
            </a>
          </div>
          <HeroPortrait />
        </section>

        <PortfolioFacts />

        <section
          id="services"
          className="business-section services-section shell"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="services-title">What do you want to build?</h2>
            </div>
          </div>
          <ServiceShowcase />
        </section>

        <section
          id="work"
          className="business-section work-section"
          aria-labelledby="work-title"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <h2 id="work-title">Ideas made real.</h2>
              </div>
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
              <h2 id="team-title">Hi, I’m Jade.</h2>
              <p>
                I’ll work with you from the first sketch to the final build.
              </p>
              <div className="team-links">
                <a
                  className="button button-outline"
                  href={business.resumeHref}
                  download
                >
                  Download résumé <DownloadIcon />
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
              <a className="text-link team-recognition" href="/recognition">
                Explore my hackathon recognitions <Arrow />
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
