"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { projectPreviews } from "@/data/project-media";
import { Arrow, PlayIcon } from "./icons";
import { ProjectVisual } from "./project-visual";
const filters = [
  { label: "All projects", category: null },
  { label: "Websites & apps", category: "Products" },
  { label: "Experiments", category: "AI & Web3" },
  { label: "Tools", category: "Tools" },
] as const;
export function ProjectArchive() {
  const [filter, setFilter] = useState<(typeof filters)[number]>(filters[0]);
  const [query, setQuery] = useState("");
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const demoTrigger = useRef<HTMLButtonElement>(null);
  const closeDemoButton = useRef<HTMLButtonElement>(null);
  const restoreDemoFocus = useRef(false);
  const search = query.trim().toLowerCase();
  const hasFilters = filter.category !== null || query.length > 0;
  function resetFilters() {
    setQuery("");
    setFilter(filters[0]);
    setActiveDemo(null);
    restoreDemoFocus.current = false;
    searchInput.current?.focus();
  }
  function closeDemo() {
    restoreDemoFocus.current = true;
    setActiveDemo(null);
  }
  useEffect(() => {
    if (activeDemo) {
      closeDemoButton.current?.focus();
    } else if (restoreDemoFocus.current) {
      demoTrigger.current?.focus();
      restoreDemoFocus.current = false;
    }
  }, [activeDemo]);
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter.category === null || p.category === filter.category) &&
          `${p.title} ${p.description} ${p.category} ${p.year} ${p.tags.join(" ")} ${p.award ?? ""}`
            .toLowerCase()
            .includes(search),
      ),
    [filter, search],
  );
  return (
    <div className="archive">
      <div className="archive-toolbar">
        <div className="filter-group" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.label}
              type="button"
              aria-pressed={filter === f}
              aria-controls="project-results"
              onClick={() => {
                restoreDemoFocus.current = false;
                setActiveDemo(null);
                setFilter(f);
              }}
            >
              {f.label}
              <span>
                {
                  projects.filter(
                    (p) => f.category === null || p.category === f.category,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <label className="project-search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <span className="sr-only">Search projects</span>
          <input
            ref={searchInput}
            type="search"
            aria-controls="project-results"
            value={query}
            onChange={(e) => {
              restoreDemoFocus.current = false;
              setActiveDemo(null);
              setQuery(e.target.value);
            }}
            placeholder="Search projects"
          />
        </label>
      </div>
      <div className="archive-results-summary">
        <p role="status" aria-live="polite" aria-atomic="true">
          {visible.length} of {projects.length} projects
          {filter.category !== null && ` · ${filter.label}`}
          {search && ` matching “${query.trim()}”`}
        </p>
        {hasFilters && (
          <button className="text-link" type="button" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>
      <div className="archive-list" id="project-results">
        {visible.map((p) => {
          const preview = projectPreviews[p.id];
          const isActive = activeDemo === p.id;
          const destination =
            p.links.find(
              (link) => !/watch demo|award-winning demo/i.test(link.label),
            ) ?? p.links[0];
          const destinationLabel =
            destination.label === "GitHub"
              ? "View code"
              : /visit website|visit product/i.test(destination.label)
                ? "Open website"
                : destination.label;
          return (
            <article className="archive-row" key={p.id}>
              <div className="archive-preview-wrap">
                {preview.demo ? (
                  <button
                    className="archive-preview"
                    type="button"
                    hidden={isActive}
                    aria-expanded={isActive}
                    aria-controls={`project-demo-${p.id}`}
                    aria-label={`Play ${p.title} demo`}
                    onClick={(event) => {
                      demoTrigger.current = event.currentTarget;
                      restoreDemoFocus.current = false;
                      setActiveDemo(p.id);
                    }}
                  >
                    <ProjectVisual id={p.id} variant="preview" />
                    <span className="archive-preview-play" aria-hidden="true">
                      <PlayIcon />
                    </span>
                  </button>
                ) : (
                  <Link
                    className="archive-preview"
                    href={`/work/${p.id}`}
                    aria-label={`View ${p.title} project details`}
                  >
                    <ProjectVisual id={p.id} variant="preview" />
                  </Link>
                )}
                {preview.demo && (
                  <div
                    id={`project-demo-${p.id}`}
                    className={isActive ? "archive-demo" : undefined}
                    hidden={!isActive}
                    role="region"
                    aria-label={`${p.title} demo player`}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        closeDemo();
                      }
                    }}
                  >
                    {isActive && (
                      <>
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${new URL(preview.demo.href).searchParams.get("v")}?autoplay=1&rel=0`}
                          title={`${p.title} demo`}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                        <div className="archive-demo-controls">
                          <button
                            ref={closeDemoButton}
                            className="text-link"
                            type="button"
                            onClick={closeDemo}
                          >
                            Close demo
                          </button>
                          <a
                            className="text-link"
                            href={preview.demo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Watch ${p.title} on YouTube (opens in a new tab)`}
                          >
                            Open on YouTube <Arrow diagonal />
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="archive-card-body">
                <div className="archive-name">
                  <h3>
                    <Link href={`/work/${p.id}`}>{p.title}</Link>
                  </h3>
                  <p>{preview.summary}</p>
                </div>
                <div className="archive-actions">
                  <Link
                    className="text-link"
                    href={`/work/${p.id}`}
                    aria-label={`View ${p.title} project details`}
                  >
                    Details <Arrow />
                  </Link>
                  {destination && (
                    <a
                      className="text-link"
                      href={destination.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${destinationLabel}: ${p.title} (opens in a new tab)`}
                    >
                      {destinationLabel} <Arrow diagonal />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {visible.length === 0 && (
        <div className="empty-results">
          <h3>No projects found</h3>
          <p>Try another search or browse the full collection.</p>
          <button
            className="button button-outline"
            type="button"
            onClick={resetFilters}
          >
            Show all projects <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
