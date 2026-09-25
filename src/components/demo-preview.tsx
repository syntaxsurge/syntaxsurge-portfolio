import Image from "next/image";
import { awardMedia } from "@/data/award-media";
import { projects } from "@/data/portfolio";
import { Arrow } from "./icons";
import { PlayIcon } from "./award-card";

export function DemoPreview({
  projectId,
  priority = false,
}: {
  projectId: string;
  priority?: boolean;
}) {
  const media = awardMedia[projectId];
  const project = projects.find((p) => p.id === projectId);
  if (!media || !project) return null;
  return (
    <figure className="project-demo-figure">
      <a
        className="project-demo-preview"
        href={media.video.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${project.title} on YouTube (opens in a new tab)`}
      >
        <Image
          src={media.image.src}
          alt={media.image.alt}
          width={media.image.width}
          height={media.image.height}
          sizes="(max-width: 700px) 100vw, 1200px"
          preload={priority}
        />
        <span className="award-play">
          <PlayIcon /> Watch the demo
        </span>
      </a>
      <figcaption>
        <span>{project.title} · Project demo</span>
        <a href={media.video.href} target="_blank" rel="noopener noreferrer">
          Watch on YouTube <Arrow diagonal />
        </a>
      </figcaption>
    </figure>
  );
}
