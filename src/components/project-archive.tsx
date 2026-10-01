"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { Arrow, Trophy } from "./icons";
const filters = [
  "All projects",
  "Products",
  "AI & Web3",
  "Tools",
  "Awarded",
] as const;
export function ProjectArchive() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All projects");
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const search = query.trim().toLowerCase();
  const hasFilters = filter !== "All projects" || query.length > 0;
  function resetFilters() {
    setQuery("");
    setFilter("All projects");
    searchInput.current?.focus();
  }
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "All projects" ||
            (filter === "Awarded" ? !!p.award : p.category === filter)) &&
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
              key={f}
              type="button"
              aria-pressed={filter === f}
              aria-controls="project-results"
              onClick={() => setFilter(f)}
            >
              {f}
              <span>
                {projects.filter(
                  (p) =>
                    f === "All projects" ||
                    (f === "Awarded" ? !!p.award : p.category === f),
                ).length}
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
          />
        </label>
      </div>
      <div className="archive-results-summary">
        <p role="status" aria-live="polite" aria-atomic="true">
          {visible.length} of {projects.length} projects
          {filter !== "All projects" && ` · ${filter}`}
          {search && ` matching “${query.trim()}”`}
        </p>
        {hasFilters && (
          <button className="text-link" type="button" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>
      <div className="archive-list" id="project-results">
        {visible.map((p) => (
          <article className="archive-row" key={p.id}>
            <span className="project-index mono" aria-hidden="true">
              {String(projects.indexOf(p) + 1).padStart(2, "0")}
            </span>
            <div className="archive-name">
              <div className="archive-project-meta">
                <span>{p.category}</span>
                <span>{p.year}</span>
                {p.award && (
                  <span className="archive-award" title={p.award}>
                    <Trophy /> Recognized
                    <span className="sr-only">: {p.award}</span>
                  </span>
                )}
              </div>
              <h3>
                <Link href={`/work/${p.id}`}>{p.title}</Link>
              </h3>
              <p>{p.description}</p>
            </div>
            <div className="archive-actions">
              <Link
                className="text-link"
                href={`/work/${p.id}`}
                aria-label={`View ${p.title} project details`}
              >
                Project details <Arrow />
              </Link>
              {p.links[0] && (
                <a
                  className="text-link"
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.links[0].label}: ${p.title} (opens in a new tab)`}
                >
                  {p.links[0].label} <Arrow diagonal />
                </a>
              )}
            </div>
          </article>
        ))}
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
