# Mathias Klassen — Portfolio

A personal portfolio site built with **Next.js 14 + TypeScript**, styled with a
hand-rolled **Liquid Glass design system** (no Tailwind, no animation
frameworks — just CSS custom properties, `backdrop-filter`, and GPU-friendly
CSS animations).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 18+.

## Project structure

```
app/
  layout.tsx            # root layout: theme init, nav, palette, footer
  globals.css           # Liquid Glass tokens + reusable .glass-* materials
  page.tsx              # home
  projects/             # filterable project grid
  blog/                 # post list + blog/[slug] pages
  vlog/                 # video log (placeholder entries)
  ai/                   # AI experiments overview
  ai/playground/        # live chat UI (client component)
  about/                # bio, timeline, stack
  api/chat/route.ts     # OpenAI-compatible chat endpoint
components/
  AtmosphericBackground # subtle gradient fields + grain (fixed, behind everything)
  FloatingNav           # desktop floating top bar + mobile floating bottom bar
  CommandPalette        # ⌘K / Ctrl+K search with full keyboard nav
  ProjectCard           # glass card w/ pointer-tracked specular highlight
  GlassButton           # primary/ghost glass buttons
  ThemeToggle           # dark/light switch (persisted)
lib/content/
  types.ts              # Project, Post, VlogEntry, AIExperiment + SVG thumb()
  projects.ts           # project data + derived tech filter list
  posts.ts              # blog posts (typed blocks: p / h2 / code / quote)
  extras.ts             # vlog entries + AI experiments
```

## Design system

All material tokens live in `app/globals.css` under `:root` /
`[data-theme="light"]`:

`--glass-opacity`, `--glass-blur`, `--glass-saturation`,
`--glass-border-opacity`, `--glass-highlight-opacity`, `--glass-shadow`,
`--glass-radius`, `--glass-refraction-strength`

Reusable classes: `.glass-thin` (badges, small buttons), `.glass-regular`
(cards), `.glass-thick` (nav, modals, command palette). Pointer-tracked
specular highlights use `.glass-specular` + `--px`/`--py` set from JS
(pointer:fine only). `prefers-reduced-motion` and
`prefers-reduced-transparency` are respected; a `@supports` fallback covers
browsers without `backdrop-filter`.

## Content: how to add things

**New project** — add an entry to `projects` in `lib/content/projects.ts`.
Thumbnails are generated abstract SVGs via `thumb(hue)`; no image assets
needed. Set `featured: true` to show it on the home page.

**New blog post** — add to `posts` in `lib/content/posts.ts` with a unique
`slug`. Body blocks: `{ type: "p" | "h2" | "quote", text }` or
`{ type: "code", lang, text }`. The `[slug]` route is statically generated.

**New vlog entry** — add to `vlogEntries` in `lib/content/extras.ts`
(title, date, duration, description, hue pair).

## AI playground

`/ai/playground` posts to `/api/chat`, which calls any OpenAI-compatible
chat-completions endpoint:

| Env var           | Default                     |
| ----------------- | --------------------------- |
| `OPENAI_API_KEY`  | *(unset — playground shows an honest "not configured" message)* |
| `OPENAI_BASE_URL` | `https://api.openai.com/v1` |
| `OPENAI_MODEL`    | `gpt-4o-mini`               |

```bash
OPENAI_API_KEY=sk-... npm run dev
```

On Vercel, add the variables in Project Settings → Environment Variables.
Without a key the route never crashes — it replies explaining how to
configure it. Conversation history is stored in `localStorage` only.

## Deploy notes (Vercel)

1. Push this folder to a Git repo.
2. Import it in Vercel — the defaults (`npm run build`, `.next`) just work.
3. Add `OPENAI_API_KEY` (optional) under Environment Variables.

## Choices & deviations

- **No Tailwind / no animation libs**, per the spec — all styling is
  `globals.css` tokens + CSS Modules.
- Project/vlog thumbnails are **generated inline SVG data URIs** (no binary
  assets, no external images).
- Blog bodies are **typed block arrays**, not Markdown — no parser
  dependency, and rendering is XSS-safe by construction.
- The model selector in the playground stores a preference and passes it to
  `/api/chat`; with no API key the whole chat path degrades to the honest
  fallback message.
- Theme is applied via an inline `<script>` in `<head>` so there's no
  dark/light flash on load; the toggle persists to `localStorage`.
