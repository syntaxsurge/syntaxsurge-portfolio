import Image from "next/image";
import { Spark } from "./icons";
export const featuredIds = ["cliplore", "studysoda", "sipava", "kaldi"];
export function ProjectVisual({
  id,
  priority = false,
}: {
  id: string;
  priority?: boolean;
}) {
  if (id === "cliplore")
    return (
      <div className="project-visual visual-cliplore">
        <Image
          src="/images/cliplore-cover.webp"
          alt=""
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
          src="/images/studysoda-cover.webp"
          alt="StudySoda brand artwork with lavender flashcards, an open notebook, and a lime soda"
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
          src="/images/sipava-cover.webp"
          alt="Sipava campaign artwork showing its task, accountability feed, and streak screens with showcase data"
          fill
          sizes="(max-width: 700px) 100vw, 650px"
        />
      </div>
    );
  if (id === "kaldi")
    return (
      <div className="project-visual visual-kaldi">
        <Image
          src="/images/kaldi-cover.webp"
          alt="Kaldi Coffee project artwork with iced coffee and a croissant"
          fill
          sizes="(max-width: 700px) 100vw, 650px"
        />
        <span className="kaldi-wordmark">
          Kaldi<span>COFFEE & CONNECTION</span>
        </span>
        <span className="kaldi-chip">A little loyalty goes a long way. ↗</span>
      </div>
    );
  return (
    <div className={`project-visual visual-typographic tone-${id.length % 4}`}>
      <div className="type-grid" />
      <Spark className="project-large-spark" />
      <span className="mono visual-mini">SYNTAXSURGE / PROJECT ARCHIVE</span>
      <span className="abstract-orbit" aria-hidden="true" />
    </div>
  );
}
