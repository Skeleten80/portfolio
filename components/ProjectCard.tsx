"use client";

import Link from "next/link";
import { useRef } from "react";
import { Project, thumb } from "../lib/content/types";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  // Pointer-tracked specular highlight — pointer:fine only, very faint.
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={`glass-regular glass-specular ${styles.card}`}
    >
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb(project.hue)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={800}
          height={450}
        />
        <span className={`glass-thin badge ${styles.status} status-${project.status}`}>
          <span className="status-dot" aria-hidden="true" />
          {project.status}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.meta}>
          <div className={styles.badges} aria-label="Technologies">
            {project.tech.map((t) => (
              <span key={t} className="glass-thin badge">
                {t}
              </span>
            ))}
          </div>
          <span className={styles.updated}>Updated {project.lastUpdate}</span>
        </div>
      </div>
      {project.link && (
        <Link
          href={project.link}
          className={styles.cardLink}
          aria-label={`${project.name} — open link`}
          target={project.link.startsWith("http") ? "_blank" : undefined}
          rel={project.link.startsWith("http") ? "noreferrer" : undefined}
        />
      )}
    </article>
  );
}
