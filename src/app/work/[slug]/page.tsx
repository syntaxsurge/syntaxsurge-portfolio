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
      <main id="main" className="project-page shell">
        <Link href="/#archive" className="back-link">
          <span>←</span> All projects
        </Link>
        <div className="project-page-header">
          <span className="eyebrow section-label">
            {p.category.toUpperCase()} / {p.year}
          </span>
          <h1>
            {p.title}
            <span>↗</span>
          </h1>
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
                >
                  <PlayIcon />
                  Watch demo
                  <Arrow diagonal />
                </a>
              )}
          </div>
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
          <div>
            <span className="eyebrow">BUILT AROUND</span>
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
            >
              By SyntaxSurge <Arrow diagonal />
            </a>
          </div>
          <div>
            <span className="eyebrow">
              {recognition.length ? "RECOGNITION" : "EXPLORE THE PRODUCT"}
            </span>
            {recognition.length ? (
              recognition.map((a) => (
                <section key={a.event} className="detail-award">
                  <Trophy />
                  <h2>{a.title}</h2>
                  <p>{a.event}</p>
                  <p className="detail-award-meta">
                    {a.issuer} ·{" "}
                    {new Date(`${a.date}-15T12:00:00Z`).toLocaleDateString(
                      "en",
                      { month: "long", year: "numeric", timeZone: "UTC" },
                    )}
                  </p>
                  {a.prize && <strong>{a.prize}</strong>}
                </section>
              ))
            ) : (
              <div className="detail-note">
                <h2>See it in action.</h2>
                <p>
                  Open the product to explore the experience. Find more of my
                  work in the project archive.
                </p>
                <a
                  className="text-link"
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.links[0].label}
                  <Arrow diagonal />
                </a>
              </div>
            )}
          </div>
        </div>
        {media && featuredIds.includes(p.id) && (
          <section className="project-demo-extra">
            <h2>The award-winning demo.</h2>
            <DemoPreview projectId={p.id} />
          </section>
        )}
        <Link href={`/work/${next.id}`} className="next-project">
          <div>
            <span className="eyebrow">NEXT PROJECT</span>
            <h2>{next.title}</h2>
          </div>
          <Arrow diagonal />
        </Link>
      </main>
      <Footer />
    </>
  );
}
