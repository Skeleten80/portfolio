import { vlogEntries } from "../../lib/content/extras";
import { thumb } from "../../lib/content/types";
import styles from "./page.module.css";

export const metadata = { title: "Vlog" };

export default function VlogPage() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Video log</p>
        <h1 className="section-title">Vlog</h1>
        <p className="section-sub">
          Builds, teardowns, and shop-floor tours on camera. Videos are
          placeholders for now — the scripts are real.
        </p>
        <div className={styles.grid}>
          {vlogEntries.map((v) => (
            <article key={v.slug} className={`glass-regular ${styles.card}`}>
              <div className={styles.thumbWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(v.hue)} alt="" aria-hidden="true" loading="lazy" />
                <span className={styles.play} aria-hidden="true">▶</span>
                <span className={`glass-thin badge ${styles.duration}`}>{v.duration}</span>
              </div>
              <div className={styles.body}>
                <span className={styles.date}>{v.date}</span>
                <h2>{v.title}</h2>
                <p>{v.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
