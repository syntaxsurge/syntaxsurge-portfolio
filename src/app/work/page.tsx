import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectArchive } from "@/components/project-archive";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Explore business websites, custom software, AI tools, and other projects by Syntax Surge.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="collection-page shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Our work</span>
        </nav>
        <div className="collection-heading">
          <span className="eyebrow section-label">THE PROJECT COLLECTION</span>
          <h1>Our work.</h1>
          <p>
            {projects.length} projects. Find an example that speaks to your
            business.
          </p>
        </div>
        <ProjectArchive />
      </main>
      <Footer />
    </>
  );
}
