"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { business } from "@/data/business";
import { DownloadIcon, MenuIcon, ResumeIcon } from "@/components/icons";

const ResumeContext = createContext<{
  open: (trigger: HTMLButtonElement) => void;
  isOpen: boolean;
} | null>(null);

export function ResumePreview({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pages = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const backdropPress = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  function open(button: HTMLButtonElement) {
    if (!dialog.current || dialog.current.open) return;
    trigger.current = button;
    setIsOpen(true);
    dialog.current.showModal();
    if (pages.current) pages.current.scrollTop = 0;
    closeButton.current?.focus({ preventScroll: true });
  }

  function outside(event: React.PointerEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return (
      event.target === event.currentTarget &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    );
  }

  return (
    <ResumeContext value={{ open, isOpen }}>
      {children}
      <dialog
        ref={dialog}
        id="resume-preview"
        className="resume-dialog"
        aria-labelledby="resume-preview-title"
        aria-describedby="resume-preview-description"
        onClose={() => {
          setIsOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
        onPointerDown={(event) => {
          backdropPress.current = outside(event);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && backdropPress.current) {
            dialog.current?.close();
          }
          backdropPress.current = false;
        }}
      >
        <div className="resume-dialog-toolbar">
          <div className="resume-dialog-heading">
            <h2 id="resume-preview-title">Résumé</h2>
            <p>{business.founder.name}</p>
          </div>
          <div className="resume-dialog-actions">
            <a
              className="button button-dark"
              href={business.resumeHref}
              download
              aria-label="Download résumé PDF"
            >
              <DownloadIcon /> <span>Download PDF</span>
            </a>
            <button
              ref={closeButton}
              className="resume-dialog-close"
              type="button"
              aria-label="Close résumé preview"
              onClick={() => dialog.current?.close()}
            >
              <MenuIcon open />
            </button>
          </div>
        </div>
        <p id="resume-preview-description" className="sr-only">
          A two-page résumé preview. Download the PDF for selectable text and
          clickable links.
        </p>
        <div
          ref={pages}
          className="resume-dialog-pages"
          tabIndex={0}
          role="region"
          aria-label="Résumé pages"
        >
          {isOpen &&
            business.resumePreview.map((page, index) => (
              <figure className="resume-page" key={page.src}>
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  unoptimized
                />
                <figcaption>
                  Page {index + 1} of {business.resumePreview.length}
                </figcaption>
              </figure>
            ))}
        </div>
      </dialog>
    </ResumeContext>
  );
}

export function ResumeButton({ className }: { className: string }) {
  const resume = useContext(ResumeContext);
  if (!resume) throw new Error("ResumeButton requires ResumePreview");
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-controls="resume-preview"
      aria-expanded={resume.isOpen}
      onClick={(event) => resume.open(event.currentTarget)}
    >
      <ResumeIcon /> View résumé
    </button>
  );
}
