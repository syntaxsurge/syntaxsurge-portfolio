import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AwardCard } from "@/components/award-card";
import { awards } from "@/data/portfolio";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Recognition",
  description: `Explore ${awards.length} hackathon recognitions earned by ${business.founder.name}, founder of ${business.legalName}, with project demos and details.`,
  alternates: { canonical: "/recognition" },
};

export default function RecognitionPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="collection-page shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Recognition</span>
        </nav>
        <div className="collection-heading">
          <span className="eyebrow section-label">A RECORD OF BUILDING</span>
          <h1>Recognition.</h1>
          <p>
            {awards.length} hackathon recognitions earned by {business.founder.name}.
            Explore the projects and their demos.
          </p>
        </div>
        <div className="awards-grid">
          {awards.slice(0, 4).map((award) => (
            <AwardCard key={`${award.projectId}-${award.date}`} award={award} />
          ))}
        </div>
        <div className="awards-list">
          {awards.slice(4).map((award) => (
            <AwardCard
              key={`${award.projectId}-${award.date}`}
              award={award}
              compact
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
