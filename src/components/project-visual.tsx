import Image from "next/image";
import { projectPreviews } from "@/data/project-media";
import { Spark } from "./icons";
export function ProjectVisual({
  id,
  priority = false,
  variant = "artwork",
}: {
  id: string;
  priority?: boolean;
  variant?: "artwork" | "preview";
}) {
  const preview = projectPreviews[id];
  if (!preview) return null;
  const artwork = preview.artwork ?? preview.image;
  const previewVisual = (
    <div className="project-visual project-preview">
      <Image
        src={preview.image.src}
        alt={preview.image.alt}
        fill
        sizes={
          variant === "preview"
            ? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px"
            : "(max-width: 700px) 100vw, 1100px"
        }
        preload={priority}
      />
    </div>
  );
  if (variant === "preview") return previewVisual;
  if (id === "mc-dental-station")
    return (
      <div className="project-visual visual-dental">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 1100px"
          preload={priority}
        />
      </div>
    );
  if (id === "wrap-it-up")
    return (
      <div className="project-visual visual-wrap-it-up">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 1100px"
          preload={priority}
        />
      </div>
    );
  if (id === "cliplore")
    return (
      <div className="project-visual visual-cliplore">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 700px"
          preload={priority}
        />
        <div className="visual-grain" />
        <span className="visual-mini mono">IDEA → EDIT → EXPORT</span>
        <div className="cliplore-type">
          <span className="clip-play">▶</span>ClipLore
          <span className="ai-label">.ai</span>
        </div>
        <span className="visual-caption">
          A little prompt. A whole new story.
        </span>
        <div className="clip-tracks" aria-hidden="true">
          <i />
          <i />
          <i />
          <span />
        </div>
      </div>
    );
  if (id === "studysoda")
    return (
      <div className="project-visual visual-study">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 650px"
        />
        <div className="study-wordmark">
          StudySoda<span>Make it click.</span>
        </div>
        <span className="study-sticker">
          <Spark /> FRESH
          <br />
          PERSPECTIVES
        </span>
      </div>
    );
  if (id === "sipava")
    return (
      <div className="project-visual visual-sipava">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 650px"
        />
      </div>
    );
  if (id === "kaldi")
    return (
      <div className="project-visual visual-kaldi">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 700px) 100vw, 650px"
        />
        <span className="kaldi-wordmark">
          Kaldi<span>COFFEE & CONNECTION</span>
        </span>
        <span className="kaldi-chip">A little loyalty goes a long way. ↗</span>
      </div>
    );
  return previewVisual;
}
