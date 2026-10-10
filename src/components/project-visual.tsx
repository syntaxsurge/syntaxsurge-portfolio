import Image from "next/image";
import { projectPreviews } from "@/data/project-media";

export function ProjectVisual({
  id,
  priority = false,
  variant = "detail",
}: {
  id: string;
  priority?: boolean;
  variant?: "detail" | "preview";
}) {
  const preview = projectPreviews[id];
  if (!preview) return null;
  const image = preview.image;
  return (
    <div
      className="project-visual"
      style={
        variant === "detail"
          ? { aspectRatio: `${image.width} / ${image.height}` }
          : undefined
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={
          variant === "preview"
            ? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 600px"
            : "(max-width: 700px) 100vw, 1100px"
        }
        preload={priority}
      />
    </div>
  );
}
