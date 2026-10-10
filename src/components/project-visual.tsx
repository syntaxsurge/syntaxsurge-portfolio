import Image from "next/image";
import { projectPreviews } from "@/data/project-media";

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
  const image =
    variant === "preview" ? preview.image : (preview.artwork ?? preview.image);
  return (
    <div
      className={`project-visual ${variant === "preview" ? "project-preview" : `visual-${id}`}`}
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
