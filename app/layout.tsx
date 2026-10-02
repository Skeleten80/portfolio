import type { Metadata } from "next";
import AtmosphericBackground from "../components/AtmosphericBackground";
import CommandPalette from "../components/CommandPalette";
import FloatingNav from "../components/FloatingNav";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: {
    default: "Mathias Klassen — Engineer",
    template: "%s · Mathias Klassen",
  },
  description:
    "CNC technician moving into software & computer engineering for manufacturing. Projects in telemetry, graphics, AI, and Apple platforms.",
};

/** Sets data-theme before first paint — no dark/light flash. */
function ThemeInit() {
  const script = `(function(){try{var t=localStorage.getItem('mk-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeInit />
      </head>
      <body>
        <AtmosphericBackground />
        <FloatingNav />
        <CommandPalette />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className="container">
            <p>
              Mathias Klassen · Stratford, Ontario ·{" "}
              <a
                href="https://github.com/Skeleten80"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </p>
            <p className={styles.hint}>
              Built with Next.js · Press{" "}
              <kbd className={styles.kbd}>⌘K</kbd> to search
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
