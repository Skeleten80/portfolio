import GlassButton from "../../components/GlassButton";
import { aiExperiments } from "../../lib/content/extras";
import styles from "./page.module.css";

export const metadata = { title: "AI" };

export default function AIPage() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Experiments</p>
        <h1 className="section-title">Artificial Intelligence</h1>
        <p className="section-sub">
          Production AI systems, applied ML for manufacturing, and concepts
          worth exploring — plus a live playground you can talk to.
        </p>

        <div className={styles.grid}>
          {aiExperiments.map((e) => (
            <article
              key={e.slug}
              className={`glass-regular glass-specular ${styles.card}`}
            >
              <span className={`glass-thin badge status-${e.status}`}>
                <span className="status-dot" aria-hidden="true" />
                {e.status}
              </span>
              <h2>{e.name}</h2>
              <p>{e.description}</p>
              <div className={styles.badges}>
                {e.tech.map((t) => (
                  <span key={t} className="glass-thin badge">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className={`glass-regular ${styles.cta}`}>
          <div>
            <h2>Try the playground</h2>
            <p>
              A chat interface wired to an OpenAI-compatible API. Bring your
              own key — or explore the UI without one.
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
