import styles from "./page.module.css";

const timeline = [
  {
    year: "2019 — present",
    title: "CNC Technician",
    text: "Running and programming CNC machines in Stratford, Ontario. Reading controller logs the way other people read novels.",
  },
  {
    year: "2025",
    title: "The 48-week program begins",
    text: "A self-directed engineering curriculum: telemetry, Linux systems, predictive maintenance, robotics, embedded — learned by building.",
  },
  {
    year: "2026",
    title: "Shipping in public",
    text: "CNC Log Analyzer, Machine Job Queue Simulator, Voxel City, Prudentia AI, Sanctuary — every project with tests, docs, and a write-up.",
  },
  {
    year: "Next",
    title: "Software × manufacturing",
    text: "Automation, telemetry, and predictive maintenance — software engineering applied where the physical world meets the digital.",
  },
];

const stack = [
  "Python", "C", "C++20", "Rust", "Swift", "TypeScript",
  "Linux", "PostgreSQL", "PyTorch", "ROS 2", "FreeRTOS",
  "Next.js", "Supabase", "Docker",
];

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">About</p>
        <h1 className="section-title">Mathias Klassen</h1>
        <p className="section-sub">
          CNC technician in Stratford, Ontario, working toward software and
          computer engineering applied to manufacturing — automation,
          telemetry, and predictive maintenance.
        </p>

        <div className={styles.split}>
          <section className={`glass-regular ${styles.bio}`}>
            <h2>Bio</h2>
            <p>
              I spend my days around machine tools and my nights around
              compilers. My home turf is manufacturing: G-code, controller
              logs, setup sheets, and the particular smell of cutting fluid.
            </p>
            <p>
              I'm moving into software and computer engineering because the
              most interesting problems in manufacturing are software problems
              now — telemetry pipelines, predictive maintenance, automation,
              and the control systems in between.
            </p>
            <p>
              I learn by building concrete projects with reproducible builds,
              automated tests, documentation, and honest failure analysis. This
              site is the public record of that work.
            </p>
            <div className={styles.contact}>
              <a
                href="https://github.com/Skeleten80"
                target="_blank"
                rel="noreferrer"
                className="glass-thin badge"
              >
                GitHub · Skeleten80
              </a>
            </div>
          </section>

          <section aria-label="Timeline">
            <div className={styles.timeline}>
              {timeline.map((t) => (
                <div key={t.title} className={`glass-regular ${styles.event}`}>
                  <span className={styles.year}>{t.year}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.stackSection}>
          <p className="eyebrow">Stack</p>
          <div className={styles.stack}>
            {stack.map((s) => (
              <span key={s} className="glass-thin badge">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
