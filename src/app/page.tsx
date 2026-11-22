import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icons";
import { ProjectArchive } from "@/components/project-archive";
import { PortfolioFacts } from "@/components/portfolio-facts";
import { ServiceShowcase } from "@/components/service-showcase";
import { LeadershipCards } from "@/components/leadership-cards";
import { SectionReveal } from "@/components/section-reveal";
import { BackgroundVideo } from "@/components/background-video";
import { ResumeButton, ResumePreview } from "@/components/resume-preview";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const projectStages = [
  {
    title: "Define the brief",
    description:
      "We discuss your goals, audience and constraints, then agree on a scope and what a successful launch looks like.",
  },
  {
    title: "Design and build",
    description:
      "We turn the scope into working software. You review demos at agreed milestones and give feedback as the work takes shape.",
  },
  {
    title: "Launch and hand over",
    description:
      "We prepare the release, walk your team through the handover and agree on what support you’ll need after launch.",
  },
];

export default function Home() {
  return (
    <ResumePreview>
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="business-hero" aria-labelledby="hero-title">
          <BackgroundVideo media={business.heroMotion} variant="hero" />
          <div className="hero-layout shell">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span aria-hidden="true" />
                Philippine software studio · Available worldwide
              </p>
              <h1 id="hero-title">
                Software built to <span>fit your business.</span>
              </h1>
              <p className="hero-description">
                We design and build websites, apps and automations that help you
                reach customers and simplify the way your team works.
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
            <figure className="hero-workspace">
              <div className="hero-photo">
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
              <figcaption>Inside a Syntax Surge planning session</figcaption>
            </figure>
          </div>
        </section>

        <PortfolioFacts />

        <section
          id="services"
          className="business-section services-section shell"
          aria-labelledby="services-title"
        >
          <SectionReveal variant="rise" className="section-heading">
            <h2 id="services-title">What we can build for you</h2>
          </SectionReveal>
          <ServiceShowcase />
        </section>

        <section
          className="business-section process-section"
          aria-labelledby="process-title"
        >
          <div className="shell">
            <SectionReveal className="process-panel">
              <div className="section-heading">
                <h2 id="process-title">How we work together</h2>
                <p>
                  We work remotely with your team. At kickoff, we agree on how
                  we’ll communicate across time zones and when you’ll review
                  the work.
                </p>
              </div>
              <ol className="project-stages" role="list">
                {projectStages.map((stage, index) => (
                  <li key={stage.title}>
                    <span className="stage-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </li>
                ))}
              </ol>
            </SectionReveal>
          </div>
        </section>

        <section
          id="work"
          className="business-section work-section"
          aria-labelledby="work-title"
        >
          <BackgroundVideo media={business.workMotion} variant="work" />
          <div className="shell">
            <SectionReveal variant="slide" className="work-heading">
              <h2 id="work-title">Explore our work</h2>
              <p>See the websites, apps and experiments we’ve built.</p>
            </SectionReveal>
            <ProjectArchive />
          </div>
        </section>

        <section
          id="team"
          className="business-section shell"
          aria-labelledby="team-title"
        >
          <SectionReveal className="section-heading">
            <h2 id="team-title">Meet our leadership</h2>
          </SectionReveal>
          <LeadershipCards />
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
