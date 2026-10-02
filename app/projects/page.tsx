"use client";

import { useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import { allTech, projects } from "../../lib/content/projects";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Portfolio</p>
        <h1 className="section-title">Projects</h1>
        <p className="section-sub">
          Builds from the shop floor to the fragment shader. Every project
          ships with a reproducible build, tests, and documentation.
        </p>

        <div className={styles.filters} role="group" aria-label="Filter by technology">
          {["All", ...allTech].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`glass-thin badge ${styles.filter} ${
                filter === t ? styles.on : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.grid} aria-live="polite">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
