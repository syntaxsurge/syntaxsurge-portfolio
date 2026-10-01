import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, awards } from "@/data/portfolio";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow, Trophy } from "@/components/icons";
import { ProjectVisual, featuredIds } from "@/components/project-visual";
import { awardMedia } from "@/data/award-media";
import { DemoPreview } from "@/components/demo-preview";
import { PlayIcon } from "@/components/award-card";
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
      title: `${p.title} — Jade Laurence Empleo`,
      description: p.description,
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
          <Link href="/#archive">All projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.title}</span>
        </nav>
        <div className="project-page-header">
          <span className="eyebrow section-label">
            {p.category.toUpperCase()} / {p.year}
          </span>
          <h1>{p.title}</h1>
          <p>{p.description}</p>
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
            {media &&
              !p.links.some((l) =>
                /watch demo|award-winning demo/i.test(l.label),
              ) && (
                <a
                  className="button button-outline"
                  href={media.video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${p.title} demo (opens in a new tab)`}
                >
                  <PlayIcon />
                  Watch demo
                  <Arrow diagonal />
                </a>
              )}
          </div>
          <p className="project-action-note">
            Product, demo, and source links open in a new tab.
          </p>
        </div>
        {media && !featuredIds.includes(p.id) ? (
          <DemoPreview projectId={p.id} priority />
        ) : (
          <div className="project-detail-visual">
            <ProjectVisual id={p.id} priority />
            {!featuredIds.includes(p.id) && (
              <span className="detail-visual-title">
                {p.title}
                <small>{p.tags[0]}</small>
              </span>
            )}
          </div>
        )}
        <div className="project-detail-grid">
          <section aria-labelledby="project-focus-title">
            <dl className="project-overview">
              <div>
                <dt>Category</dt>
                <dd>{p.category}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{p.year}</dd>
              </div>
            </dl>
            <h2 className="eyebrow" id="project-focus-title">
              PROJECT FOCUS
            </h2>
            <div className="detail-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a
              className="text-link"
              href="https://github.com/syntaxsurge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SyntaxSurge on GitHub (opens in a new tab)"
            >
              GitHub profile <Arrow diagonal />
            </a>
          </section>
          <section aria-labelledby="project-recognition-title">
            <h2 className="eyebrow" id="project-recognition-title">
              {recognition.length ? "RECOGNITION" : "EXPLORE THE PRODUCT"}
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
        {media && featuredIds.includes(p.id) && (
          <section className="project-demo-extra">
            <h2>The award-winning demo.</h2>
            <DemoPreview projectId={p.id} />
          </section>
        )}
        <nav className="project-navigation" aria-label="More projects">
          <Link href="/#archive" className="button button-outline">
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
