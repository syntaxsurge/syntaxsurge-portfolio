"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/data/business";
import { MenuIcon, NavigationIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import styles from "./header.module.css";

const links = [
  { href: "/#services", label: "Services", icon: "services" },
  { href: "/#work", label: "Work", icon: "work" },
  { href: "/#team", label: "Team", icon: "team" },
  { href: "#contact", label: "Contact", icon: "contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const navigationId = useId();

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const desktop = window.matchMedia("(min-width: 851px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  return (
    <header className={styles.header} ref={header}>
      <div className={`${styles.inner} shell`}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native fragments scroll on repeated visits to the same section. */}
        <a
          href="/#top"
          className={styles.wordmark}
          aria-label={`${business.name} — home`}
          onClick={() => setOpen(false)}
        >
          <span className={styles.brandSymbol}>
            <Image
              src={business.logo.src}
              alt=""
              width={44}
              height={44}
              sizes="44px"
              preload
            />
          </span>
          <span>{business.name}</span>
        </a>
        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls={navigationId}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
        <nav
          className={styles.navigation}
          id={navigationId}
          aria-label="Main navigation"
          data-open={open}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <NavigationIcon name={link.icon} />
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
