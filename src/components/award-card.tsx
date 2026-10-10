import Image from "next/image";
import Link from "next/link";
import { awards, projects } from "@/data/portfolio";
import { awardMedia } from "@/data/award-media";
import { Arrow, Trophy, PlayIcon } from "./icons";
export function AwardCard({
  award,
  compact = false,
}: {
  award: (typeof awards)[number];
  compact?: boolean;
}) {
  const project = projects.find((p) => p.id === award.projectId)!;
  const media = awardMedia[award.projectId];
  const destination = media?.video?.href || `/work/${award.projectId}`;
  return (
    <article className={`award-card${compact ? " award-card-compact" : ""}`}>
      {!compact && (
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
      )}
      <div className="award-card-body">
        <div className="award-card-meta">
          <time dateTime={award.date}>
            {new Date(`${award.date}-15T12:00:00Z`).toLocaleDateString("en", {
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
          {award.prize && (
            <span className="award-prize">
              Prize: <strong>{award.prize}</strong>
            </span>
          )}
        </div>
        <h2>
          <Link href={`/work/${award.projectId}`}>{project.title}</Link>
        </h2>
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
              aria-label={`Watch ${project.title} demo (opens in a new tab)`}
            >
              <PlayIcon />
              Watch demo
              <Arrow diagonal />
            </a>
          )}
          <Link
            href={`/work/${award.projectId}`}
            aria-label={`View ${project.title} project details`}
          >
            Project details
            <Arrow diagonal />
          </Link>
        </div>
      </div>
    </article>
  );
}
