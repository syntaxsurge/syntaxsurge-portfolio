import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icons";
import { ProjectArchive } from "@/components/project-archive";
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
                Philippine studio · Available worldwide
              </p>
              <h1 id="hero-title">
                Websites and apps <span>built for business.</span>
              </h1>
              <p className="hero-description">
                We design customer-facing products and back-office tools, from
                bilingual catalogs to retail checkout.
              </p>
              <div className="hero-actions">
                <a className="button hero-primary" href="#work">
                  See our work <Arrow />
                </a>
                <a className="button hero-contact" href={business.links.email}>
                  Start a project <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="business-section work-section"
          aria-labelledby="work-title"
        >
          <BackgroundVideo media={business.workMotion} variant="work" />
          <div className="shell">
            <ProjectArchive />
            <aside className="work-inquiry" aria-label="Project inquiries">
              <p>Have a similar project in mind?</p>
              <a className="text-link" href={business.links.email}>
                Talk to our studio <Arrow diagonal />
              </a>
            </aside>
          </div>
        </section>

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
              <div className="delivery-intro">
                <h2 id="process-title">How we work together</h2>
                <p>
                  Work directly with our studio from the Philippines. We agree on
                  milestones, feedback windows and handover details around your
                  team’s time zone.
                </p>
                <figure className="delivery-photo">
                  <Image
                    src={business.workspacePhoto.src}
                    alt={business.workspacePhoto.alt}
                    width={business.workspacePhoto.width}
                    height={business.workspacePhoto.height}
                    sizes="(max-width: 700px) 90vw, 450px"
                  />
                  <figcaption>Project planning at Syntax Surge</figcaption>
                </figure>
                <div className="delivery-lead">
                  <span>Project lead · {business.founder.name}</span>
                  <ResumeButton className="text-link" />
                </div>
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
