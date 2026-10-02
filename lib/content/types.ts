export type ProjectStatus = "Active" | "In progress" | "Complete" | "Concept";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  lastUpdate: string;
  /** hues used to generate the abstract SVG thumbnail */
  hue: [number, number];
  featured?: boolean;
  link?: string;
}

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
  body: PostBlock[];
}

export interface VlogEntry {
  slug: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  hue: [number, number];
}

export interface AIExperiment {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tech: string[];
}

/** Builds an abstract gradient thumbnail as an inline SVG data URI. No external assets. */
export function thumb(hue: [number, number], seed = 1): string {
  const [h1, h2] = hue;
  const circles = Array.from({ length: 5 }, (_, i) => {
    const cx = (seed * 137 + i * 173) % 800;
    const cy = (seed * 89 + i * 211) % 450;
    const r = 90 + ((seed * 53 + i * 97) % 160);
    const h = i % 2 === 0 ? h1 : h2;
    const o = (0.16 + ((seed + i * 7) % 10) / 60).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="hsl(${h},70%,60%)" opacity="${o}"/>`;
  }).join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${h1},45%,14%)"/>` +
    `<stop offset="1" stop-color="hsl(${h2},50%,10%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="800" height="450" fill="url(#g)"/>` +
    circles +
    `<g stroke="rgba(255,255,255,0.05)" stroke-width="1">` +
    Array.from({ length: 9 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="450"/>`).join("") +
    Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${i * 112}" x2="800" y2="${i * 112}"/>`).join("") +
    `</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
