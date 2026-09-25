import Image from "next/image";
import Link from "next/link";
import { awards, projects } from "@/data/portfolio";
import { awardMedia } from "@/data/award-media";
import { Arrow, Trophy } from "./icons";

export function PlayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="m9 5 11 7-11 7V5Z" strokeLinejoin="round" />
    </svg>
  );
}
export function AwardCard({ award }: { award: (typeof awards)[number] }) {
  const project = projects.find((p) => p.id === award.projectId)!;
  const media = awardMedia[award.projectId];
  const destination = media?.video?.href || `/work/${award.projectId}`;
  return (
    <article className="award-card">
      <a
        className="award-preview"
        href={destination}
        {...(media?.video
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={
          media?.video
            ? `Watch ${project.title} demo (opens in a new tab)`
            : `Explore ${project.title}`
        }
      >
        {media?.image ? (
          <Image
            src={media.image.src}
            alt={media.image.alt}
            width={media.image.width}
            height={media.image.height}
            sizes="(max-width: 700px) 100vw, 600px"
          />
        ) : (
          <div className="award-preview-wordmark">
            {project.title}
            <PlayIcon />
          </div>
        )}
        {media?.video && (
          <span className="award-play">
            <PlayIcon />
            <span>Watch demo</span>
          </span>
        )}
      </a>
      <div className="award-card-body">
        <div className="award-card-meta">
          <time dateTime={award.date}>
            {new Date(`${award.date}-15T12:00:00Z`).toLocaleDateString("en", {
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
          {award.prize && <span className="award-prize">{award.prize}</span>}
        </div>
        <h3>
          <Link href={`/work/${award.projectId}`}>{project.title}</Link>
        </h3>
        <p className="award-title">
          <Trophy />
          {award.title}
        </p>
        <p className="award-event">{award.event}</p>
        <div className="award-card-links">
          {media?.video && (
            <a
              href={media.video.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon />
              Watch demo
              <Arrow diagonal />
            </a>
          )}
          <Link href={`/work/${award.projectId}`}>
            Project details
            <Arrow diagonal />
          </Link>
        </div>
      </div>
    </article>
  );
}
