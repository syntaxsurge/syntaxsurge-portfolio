import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icons";
import { ProjectArchive } from "@/components/project-archive";
import { PortfolioFacts } from "@/components/portfolio-facts";
import { ServiceShowcase } from "@/components/service-showcase";
import { FounderCard } from "@/components/founder-card";
import { SectionReveal } from "@/components/section-reveal";
import { BackgroundVideo } from "@/components/background-video";
import { ResumeButton, ResumePreview } from "@/components/resume-preview";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <ResumePreview>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="business-hero" aria-labelledby="hero-title">
          <BackgroundVideo media={business.heroMotion} variant="hero" />
          <div className="hero-layout shell">
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
              <ResumeButton className="hero-resume text-link" />
            </div>
            <div className="hero-workspace">
              <Image
                src={business.workspacePhoto.src}
                alt={business.workspacePhoto.alt}
                width={business.workspacePhoto.width}
                height={business.workspacePhoto.height}
                sizes="(max-width: 700px) 100vw, 540px"
                preload
                unoptimized
              />
            </div>
          </div>
        </section>

        <PortfolioFacts />

        <section
          id="services"
          className="business-section services-section shell"
          aria-labelledby="services-title"
        >
          <SectionReveal variant="rise" className="section-heading">
            <div>
              <h2 id="services-title">What do you want to build?</h2>
            </div>
          </SectionReveal>
          <ServiceShowcase />
        </section>

        <section
          id="work"
          className="business-section work-section"
          aria-labelledby="work-title"
        >
          <BackgroundVideo media={business.workMotion} variant="work" />
          <div className="shell">
            <SectionReveal variant="slide" className="work-heading">
              <h2 id="work-title">Ideas made real.</h2>
            </SectionReveal>
            <ProjectArchive />
          </div>
        </section>

        <section
          id="team"
          className="business-section shell"
          aria-labelledby="team-title"
        >
          <SectionReveal variant="orbit" className="team-grid">
            <div className="team-intro">
              <h2 id="team-title">Hi, I’m Jade.</h2>
              <p>
                I’ll work with you from the first sketch to the final build.
              </p>
              <div className="team-links">
                <ResumeButton className="button button-outline" />
              </div>
              <a className="text-link team-recognition" href="/recognition#top">
                Explore my hackathon recognitions <Arrow />
              </a>
            </div>
            <FounderCard />
          </SectionReveal>
        </section>

        <section
          id="registration"
          className="registration-section shell"
          aria-labelledby="registration-title"
        >
          <SectionReveal variant="stamp" className="registration-card">
            <div className="registration-copy">
              <svg
                className="registration-seal"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <path d="M40 6 68 17v23c0 16-13 28-28 34C25 68 12 56 12 40V17L40 6Z" />
                <path d="m27 39 9 9 18-19" />
              </svg>
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
          </SectionReveal>
        </section>
      </main>
      <Footer />
    </ResumePreview>
  );
}
