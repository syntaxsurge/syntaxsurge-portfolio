"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { Arrow, Trophy } from "./icons";
const filters = [
  "All work",
  "Products",
  "AI & Web3",
  "Tools",
  "Awarded",
] as const;
export function ProjectArchive() {
  const [filter, setFilter] = useState<string>("All work");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "All work" ||
            (filter === "Awarded" ? !!p.award : p.category === filter)) &&
          `${p.title} ${p.description} ${p.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [filter, query],
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
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "All work" && <span>{projects.length}</span>}
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
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a project"
          />
        </label>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} projects shown
      </p>
      <div className="archive-list">
        {visible.map((p) => (
          <Link className="archive-row" key={p.id} href={`/work/${p.id}`}>
            <span className="project-index mono">
              {String(projects.indexOf(p) + 1).padStart(2, "0")}
            </span>
            <div className="archive-name">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
            <span className="archive-tag">{p.tags[0]}</span>
            <span className="archive-award">
              {p.award ? (
                <>
                  <Trophy />
                  <span className="sr-only">Award-winning project</span>
                </>
              ) : (
                <span className="tiny-dot" />
              )}
            </span>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-results">
          <p>No projects match “{query}”.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setFilter("All work");
            }}
          >
            Clear filters <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
