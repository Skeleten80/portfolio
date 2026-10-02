import Link from "next/link";
import GlassButton from "../components/GlassButton";
import ProjectCard from "../components/ProjectCard";
import { vlogEntries } from "../lib/content/extras";
import { posts } from "../lib/content/posts";
import { projects } from "../lib/content/projects";
import { thumb } from "../lib/content/types";
import styles from "./page.module.css";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 2);
  const latestVlog = vlogEntries[0];

  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <section className={`glass-regular ${styles.hero}`}>
          <p className="eyebrow">CNC Technician → Software Engineer</p>
          <h1 className={styles.title}>
            I build software for the
            <br />
            <span className={styles.gradient}>physical world.</span>
          </h1>
          <p className={styles.lede}>
            Mathias Klassen — manufacturing telemetry, real-time graphics, AI,
            and Apple platforms. Learning in public through a 48-week
            engineering program, one reproducible build at a time.
          </p>
          <div className={styles.cta}>
            <GlassButton href="/projects" variant="primary">
              Explore Projects
            </GlassButton>
            <GlassButton href="/blog" variant="ghost">
              Read the Blog
            </GlassButton>
          </div>
          <div className={styles.stackRow} aria-label="Core stack">
            {["Python", "C++", "Rust", "Swift", "TypeScript", "Linux"].map((s) => (
              <span key={s} className="glass-thin badge">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-title">Featured projects</h2>
            </div>
            <Link href="/projects" className={styles.seeAll}>
              All projects →
            </Link>
          </div>
          <div className={styles.grid}>
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* Writing + vlog teasers */}
        <section className={styles.section}>
          <p className="eyebrow">Engineering journal</p>
          <h2 className="section-title">Latest writing</h2>
          <div className={styles.split}>
            <div className={styles.posts}>
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`glass-regular glass-specular ${styles.postTeaser}`}
                >
                  <span className={styles.postDate}>{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className={styles.readMore}>Read →</span>
                </Link>
              ))}
            </div>
            <Link
              href="/vlog"
              className={`glass-regular glass-specular ${styles.vlogTeaser}`}
            >
              <div className={styles.vlogThumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(latestVlog.hue)} alt="" aria-hidden="true" loading="lazy" />
                <span className={`glass-thin badge ${styles.duration}`}>
                  ▶ {latestVlog.duration}
                </span>
              </div>
              <div className={styles.vlogBody}>
                <p className="eyebrow">Latest vlog</p>
                <h3>{latestVlog.title}</h3>
                <p>{latestVlog.description}</p>
              </div>
            </Link>
          </div>
        </section>

        {/* AI strip */}
        <section className={`glass-regular ${styles.aiStrip}`}>
          <div>
            <p className="eyebrow">Experiments</p>
            <h2>AI, running in the browser chrome it deserves.</h2>
            <p>
              A live playground wired to an OpenAI-compatible API — plus notes
              on production AI systems and telemetry anomaly detection.
            </p>
          </div>
          <GlassButton href="/ai/playground" variant="primary">
            Open the Playground
          </GlassButton>
        </section>
      </div>
    </div>
  );
}
