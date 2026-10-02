"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "./FloatingNav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/vlog", label: "Vlog" },
  { href: "/ai", label: "AI" },
  { href: "/about", label: "About" },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "▦" },
  { href: "/blog", label: "Blog", icon: "✎" },
  { href: "/ai", label: "AI", icon: "✦" },
  { href: "/about", label: "About", icon: "◉" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent("mk:open-palette"));
}

export default function FloatingNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating top bar */}
      <header
        className={`glass-thick ${styles.desktop} ${scrolled ? styles.scrolled : ""}`}
      >
        <nav aria-label="Primary">
          <Link href="/" className={styles.brand}>
            Mathias Klassen
          </Link>
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive(pathname, l.href) ? styles.active : ""}`}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <button
              type="button"
              className={`glass-thin ${styles.search}`}
              onClick={openCommandPalette}
              aria-label="Open command palette (Ctrl or Cmd K)"
            >
              <span aria-hidden="true">⌕</span>
              <span className={styles.searchHint}>Search</span>
              <kbd className={styles.kbd}>⌘K</kbd>
            </button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile floating bottom bar */}
      <nav
        aria-label="Primary mobile"
        className={`glass-thick ${styles.mobile}`}
      >
        {mobileLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.mlink} ${isActive(pathname, l.href) ? styles.active : ""}`}
            aria-current={isActive(pathname, l.href) ? "page" : undefined}
          >
            <span aria-hidden="true" className={styles.micon}>{l.icon}</span>
            <span className={styles.mlabel}>{l.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
