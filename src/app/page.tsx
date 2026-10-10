import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Trophy, DownloadIcon } from "@/components/icons";
import { HeroPortrait } from "@/components/hero-portrait";
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
              <span className="status-dot" /> SOFTWARE FOR YOUR NEXT MOVE
            </span>
            <h1 id="hero-title">
              Your idea.
              <br />
              <span>Built right.</span>
            </h1>
            <p className="hero-description">
              Websites, apps and smart tools. Built around your business.
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
            <div className="hero-trust">
              <a href="#registration">
                <span aria-hidden="true">✓</span> DTI registered
              </a>
              <Link href="/recognition">
                <Trophy /> {awards.length} hackathon recognitions <Arrow />
              </Link>
            </div>
          </div>
          <HeroPortrait />
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
            {business.services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-visual">
                  <Image
                    src={service.image}
                    alt=""
                    width={400}
                    height={250}
                    sizes="(max-width: 700px) 100vw, 400px"
                    unoptimized
                  />
                </div>
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
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
                <h2 id="work-title">Explore the work.</h2>
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
              <span className="eyebrow section-label">MEET THE FOUNDER</span>
              <h2 id="team-title">Meet your builder.</h2>
              <p>One point of contact. Design, development and delivery.</p>
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
