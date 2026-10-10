import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, awards } from "@/data/portfolio";
import { business } from "@/data/business";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Trophy } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { awardMedia } from "@/data/award-media";
import { projectPreviews } from "@/data/project-media";
import { DemoPreview } from "@/components/demo-preview";
import { wrapItUp } from "@/data/wrap-it-up";
import {
  WrapItUpBetaNote,
  WrapItUpDetails,
  WrapItUpNavigation,
} from "@/components/wrap-it-up-details";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.id === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/work/${p.id}` },
    openGraph: {
      url: `/work/${p.id}`,
      type: "website",
      title: `${p.title} — ${business.name}`,
      description: p.description,
      ...(p.id === "wrap-it-up" && {
        images: [
          {
            url: wrapItUp.artwork,
            width: 1024,
            height: 500,
            alt: "Wrap It Up! gift-wrapping shop artwork",
          },
        ],
      }),
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  const p = projects[index];
  if (!p) notFound();
  const recognition = awards.filter((a) => a.projectId === p.id);
  const next = projects[(index + 1) % projects.length];
  const media = awardMedia[p.id];
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="project-page shell">
        <nav className="project-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#work">All projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.title}</span>
        </nav>
        {p.id === "wrap-it-up" && <WrapItUpNavigation current="game" />}
        <div className="project-page-header">
          <h1>{p.title}</h1>
          <p>{projectPreviews[p.id].summary}</p>
          <div className="project-links">
            {p.links.map((l, i) => (
              <a
                className={
                  i === 0 ? "button button-dark" : "button button-outline"
                }
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${l.label}: ${p.title} (opens in a new tab)`}
              >
                {l.label}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
        {media ? (
          <DemoPreview projectId={p.id} priority />
        ) : (
          <div className="project-detail-visual">
            <ProjectVisual id={p.id} priority />
          </div>
        )}
        <div className="project-detail-grid">
          <section aria-labelledby="project-focus-title">
            <h2 id="project-focus-title">About the project</h2>
            <div className="detail-note">
              <p>{p.description}</p>
            </div>
          </section>
          <section aria-labelledby="project-recognition-title">
            <h2 id="project-recognition-title">
              {recognition.length
                ? "Recognition"
                : p.focus
                  ? "What it does"
                  : "Explore the product"}
            </h2>
            {recognition.length ? (
              recognition.map((a) => (
                <div key={a.event} className="detail-award">
                  <Trophy />
                  <h3>{a.title}</h3>
                  <p>{a.event}</p>
                  <p className="detail-award-meta">
                    {a.issuer} ·{" "}
                    {new Date(`${a.date}-15T12:00:00Z`).toLocaleDateString(
                      "en",
                      { month: "long", year: "numeric", timeZone: "UTC" },
                    )}
                  </p>
                  {a.prize && <strong>{a.prize}</strong>}
                </div>
              ))
            ) : p.id === "wrap-it-up" ? (
              <WrapItUpBetaNote />
            ) : p.focus ? (
              <div className="project-focus-list">
                {p.focus.map((item) => (
                  <div className="detail-note" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="detail-note">
                <h3>Try {p.title}.</h3>
                <p>Open the product to explore its features.</p>
                <a
                  className="text-link"
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.links[0].label}: ${p.title} (opens in a new tab)`}
                >
                  {p.links[0].label}
                  <Arrow diagonal />
                </a>
              </div>
            )}
          </section>
        </div>
        {p.id === "wrap-it-up" && <WrapItUpDetails />}
        <nav className="project-navigation" aria-label="More projects">
          <Link href="/#work" className="button button-outline">
            All projects <Arrow />
          </Link>
          <Link href={`/work/${next.id}`} className="next-project">
            <div>
              <span className="eyebrow">NEXT PROJECT</span>
              <h2>{next.title}</h2>
            </div>
            <Arrow />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
