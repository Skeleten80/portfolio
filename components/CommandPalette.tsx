"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { aiExperiments } from "../lib/content/extras";
import { posts } from "../lib/content/posts";
import { projects } from "../lib/content/projects";
import styles from "./CommandPalette.module.css";

interface Item {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  href: string;
  keywords: string;
}

const staticPages: Item[] = [
  { id: "home", title: "Home", subtitle: "Landing page", group: "Quick navigation", href: "/", keywords: "home index start" },
  { id: "projects", title: "Projects", subtitle: "All builds", group: "Quick navigation", href: "/projects", keywords: "projects builds work portfolio" },
  { id: "blog", title: "Blog", subtitle: "Engineering journal", group: "Quick navigation", href: "/blog", keywords: "blog writing journal articles" },
  { id: "vlog", title: "Vlog", subtitle: "Video log", group: "Quick navigation", href: "/vlog", keywords: "vlog video youtube" },
  { id: "ai", title: "AI", subtitle: "AI experiments", group: "Quick navigation", href: "/ai", keywords: "ai artificial intelligence experiments" },
  { id: "playground", title: "AI Playground", subtitle: "Chat with a model", group: "Quick navigation", href: "/ai/playground", keywords: "playground chat llm model" },
  { id: "about", title: "About", subtitle: "Bio, timeline, contact", group: "Quick navigation", href: "/about", keywords: "about bio contact github" },
];

const allItems: Item[] = [
  ...staticPages,
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    title: p.name,
    subtitle: p.tagline,
    group: "Projects",
    href: "/projects",
    keywords: `${p.name} ${p.tech.join(" ")}`,
  })),
  ...posts.map((p) => ({
    id: `post-${p.slug}`,
    title: p.title,
    subtitle: p.excerpt.slice(0, 80) + "…",
    group: "Blog posts",
    href: `/blog/${p.slug}`,
    keywords: `${p.title} ${p.tags.join(" ")}`,
  })),
  ...aiExperiments.map((e) => ({
    id: `exp-${e.slug}`,
    title: e.name,
    subtitle: e.description.slice(0, 80) + "…",
    group: "AI experiments",
    href: e.slug === "playground" ? "/ai/playground" : "/ai",
    keywords: `${e.name} ${e.tech.join(" ")}`,
  })),
];

const RECENT_KEY = "mk-recent-pages";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mk:open-palette", onCustom);
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      setRecent([]);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mk:open-palette", onCustom);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open ]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const recents = recent
        .map((id) => allItems.find((i) => i.id === id))
        .filter((i): i is Item => !!i)
        .slice(0, 4);
      return recents.length > 0 ? recents : staticPages.slice(0, 5);
    }
    return allItems
      .filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.subtitle.toLowerCase().includes(q) ||
          i.keywords.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, recent]);

  useEffect(() => setIndex(0), [results.length]);

  const go = (item: Item) => {
    setRecent((r) => [item.id, ...r.filter((x) => x !== item.id)].slice(0, 8));
    try {
      localStorage.setItem(
        RECENT_KEY,
        JSON.stringify([item.id, ...recent.filter((x) => x !== item.id)].slice(0, 8))
      );
    } catch {
      /* storage unavailable */
    }
    setOpen(false);
    router.push(item.href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[index]) {
      go(results[index]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  if (!open) return null;

  const groups: { name: string; items: Item[] }[] = [];
  const showGroups = query.trim() === "" ? false : true;
  if (showGroups) {
    for (const item of results) {
      const g = groups.find((x) => x.name === item.group);
      if (g) g.items.push(item);
      else groups.push({ name: item.group, items: [item] });
    }
  }

  let flat = 0;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className={`glass-thick ${styles.panel}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`glass-thin block ${styles.inputWrap}`}>
          <span aria-hidden="true" className={styles.inputIcon}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search pages, projects, posts…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
            className={styles.input}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        <div ref={listRef} id="palette-list" role="listbox" className={styles.list}>
          {query.trim() === "" && (
            <p className={styles.groupLabel}>
              {recent.length > 0 ? "Recent pages" : "Quick navigation"}
            </p>
          )}
          {showGroups
            ? groups.map((g) => (
                <div key={g.name}>
                  <p className={styles.groupLabel}>{g.name}</p>
                  {g.items.map((item) => {
                    const i = flat++;
                    const active = i === index;
                    return (
                      <button
                        key={item.id}
                        id={`palette-${item.id}`}
                        role="option"
                        aria-selected={active}
                        data-active={active}
                        className={`${styles.item} ${active ? styles.active : ""}`}
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => go(item)}
                      >
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemSub}>{item.subtitle}</span>
                      </button>
                    );
                  })}
                </div>
              ))
            : results.map((item, i) => (
                <button
                  key={item.id}
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={i === index}
                  data-active={i === index}
                  className={`${styles.item} ${i === index ? styles.active : ""}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => go(item)}
                >
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemSub}>{item.subtitle}</span>
                </button>
              ))}
          {results.length === 0 && (
            <p className={styles.empty}>No matches. Try "swift", "cnc", or "raymarching".</p>
          )}
        </div>

        <div className={styles.footer}>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
