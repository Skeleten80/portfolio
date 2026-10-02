import { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "cnc-log-analyzer-python",
    title: "Building a CNC Log Analyzer in Python",
    excerpt:
      "Machine logs are a goldmine nobody reads. Here's how I parsed controller traces into shift-level reports — and what the alarm clusters revealed.",
    date: "2026-08-18",
    readMinutes: 8,
    tags: ["Python", "Manufacturing", "Telemetry"],
    body: [
      {
        type: "p",
        text: "Every CNC controller on our floor writes logs. Timestamps, alarm codes, feed overrides, spindle loads — thousands of lines a day that nobody ever looked at. I kept wondering what stories were hiding in there, so I built a parser.",
      },
      { type: "h2", text: "Parsing the traces" },
      {
        type: "p",
        text: "The logs are semi-structured: mostly consistent, with just enough vendor-specific weirdness to punish naive regex. I normalized everything into a pandas DataFrame with a strict schema — timestamp, machine_id, event_type, payload — and quarantined unparseable lines into a separate report instead of silently dropping them. Silent data loss is the original sin of telemetry work.",
      },
      {
        type: "code",
        lang: "python",
        text: "df[\"alarm_code\"] = df[\"payload\"].str.extract(r\"ALM-(\\d+)\")\nclusters = (df[df.event_type == \"alarm\"]\n    .groupby([\"machine_id\", \"alarm_code\"])\n    .size()\n    .sort_values(ascending=False))",
      },
      { type: "h2", text: "What the clusters revealed" },
      {
        type: "p",
        text: "Two findings paid for the whole project. First, one machine generated 40% of all feed-override events — a setup issue, not an operator issue. Second, alarm clusters reliably preceded tool-breakage events by 20–40 minutes. That's the seed of predictive maintenance: the signal was already there, we just weren't listening.",
      },
      {
        type: "quote",
        text: "The signal was already there. We just weren't listening.",
      },
      { type: "h2", text: "Reproducibility" },
      {
        type: "p",
        text: "One command reproduces everything: parse, analyze, render the shift report. The test suite covers the parser against recorded log samples, because a parser you can't trust is worse than no parser at all.",
      },
    ],
  },
  {
    slug: "analog-mixer-software-control",
    title: "What a 14-channel analog mixer taught me about software control",
    excerpt:
      "Our church runs a Yorkville VGM14 — fully analog, zero remote control. Building a dashboard around it forced me to think clearly about what software can and cannot touch.",
    date: "2026-09-20",
    readMinutes: 6,
    tags: ["Swift", "Audio", "Systems Design"],
    body: [
      {
        type: "p",
        text: "I volunteered to build an AV dashboard for my church's sound booth. The mixer is a Yorkville VGM14: fourteen channels of fully analog mixing. Physical faders, no MIDI, no OSC, no network port. The USB jack is just stereo audio in and out.",
      },
      { type: "h2", text: "The honest constraint" },
      {
        type: "p",
        text: "No software on earth can move those faders. Saying that plainly — in the README, in the UI, to the team — shaped the entire architecture. Instead of pretending to control the mixer, the app controls everything around it: playback sources, checklists, run-of-show, and eventually streaming and lighting.",
      },
      { type: "h2", text: "Control the edges" },
      {
        type: "p",
        text: "The useful insight generalizes: when you can't control a device, control its inputs. The Mac became the playback engine — backing tracks and bumpers with software faders, mutes, and fade-outs — feeding the mixer over USB. The analog board keeps doing what it's good at; software handles everything digital.",
      },
      {
        type: "quote",
        text: "When you can't control a device, control its inputs.",
      },
      { type: "h2", text: "Design for the upgrade path" },
      {
        type: "p",
        text: "A digital mixer (Behringer X32-style, OSC-controllable) would unlock true remote faders. So the app defines a DeviceControl protocol now, with the analog reality as just one driver. Constraints documented today become features tomorrow.",
      },
    ],
  },
  {
    slug: "raymarching-cyberpunk-city",
    title: "Raymarching a cyberpunk city: lessons learned",
    excerpt:
      "Procedural towers, emissive signage, dynamic weather — all in a fragment shader. What building a raymarched metropolis taught me about SDFs and restraint.",
    date: "2026-09-05",
    readMinutes: 10,
    tags: ["Graphics", "GLSL", "Procedural Generation"],
    body: [
      {
        type: "p",
        text: "I wanted a cyberpunk city that felt alive, and I wanted to earn it in a fragment shader. No meshes, no textures — just signed distance functions, a raymarcher, and stubbornness.",
      },
      { type: "h2", text: "The city as a function" },
      {
        type: "p",
        text: "Each city block is a hash of its grid cell: building height, footprint, window density. Windows are emissive boxes carved by repeating SDFs; signage is just emissive planes with procedural glyph patterns. The whole metropolis is a pure function of position — infinite detail, zero assets.",
      },
      {
        type: "code",
        lang: "glsl",
        text: "float citySDF(vec3 p) {\n  vec2 cell = floor(p.xz / BLOCK);\n  float h = hash(cell) * MAX_H;\n  float tower = sdBox(p - vec3(cell*BLOCK, h*0.5, 0), vec3(8, h*0.5, 8));\n  return tower;\n}",
      },
      { type: "h2", text: "Weather as atmosphere" },
      {
        type: "p",
        text: "Dynamic weather came from layering: animated noise fog for rain haze, time-varying emissive intensity for wet reflections, and a lightning system that's just a directional light with a mean streak. Cheap tricks, honestly — but atmosphere is mostly cheap tricks done confidently.",
      },
      { type: "h2", text: "Restraint" },
      {
        type: "p",
        text: "The biggest lesson wasn't technical. My first version had bloom, chromatic aberration, film grain, and vignette all maxed out — it looked like a screensaver from 2009. Turning everything down 70% made it cinematic. Restraint is a rendering technique.",
      },
    ],
  },
  {
    slug: "learning-in-public-48-weeks",
    title: "Why I'm learning in public: the 48-week engineering program",
    excerpt:
      "From CNC technician to software engineer, one build at a time. The structure, the rules, and why every project ships with tests and docs.",
    date: "2026-07-12",
    readMinutes: 7,
    tags: ["Career", "Learning", "Engineering"],
    body: [
      {
        type: "p",
        text: "I'm a CNC technician moving into software and computer engineering applied to manufacturing — automation, telemetry, predictive maintenance. Rather than collect certificates, I gave myself a 48-week program: 8–12 hours a week, one concrete build at a time.",
      },
      { type: "h2", text: "The rules" },
      {
        type: "p",
        text: "Every project must have a reproducible build, automated tests, documentation, explicit non-goals, a failure analysis, and something measurable. Certificates prove you showed up; artifacts prove you can do the work.",
      },
      {
        type: "quote",
        text: "Certificates prove you showed up; artifacts prove you can do the work.",
      },
      { type: "h2", text: "The roadmap" },
      {
        type: "p",
        text: "Manufacturing telemetry first (it's my home turf), then Linux systems, predictive maintenance with PyTorch, robotics with ROS 2, embedded systems with FreeRTOS, and simulations for autonomous vehicles and flight computers. Each phase feeds the next.",
      },
      { type: "h2", text: "Why in public" },
      {
        type: "p",
        text: "Writing forces clarity. Every post on this blog is a project milestone with the rough edges showing — the failed approaches included. If the work can't survive explanation, it isn't finished.",
      },
    ],
  },
];
