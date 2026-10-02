import { AIExperiment, VlogEntry } from "./types";

export const vlogEntries: VlogEntry[] = [
  {
    slug: "shop-floor-telemetry-tour",
    title: "Shop Floor Telemetry Tour",
    date: "2026-08-30",
    duration: "12:40",
    description:
      "A walkthrough of the machines I pull logs from, the sensors I'd add, and where a telemetry pipeline would actually live on a real shop floor.",
    hue: [210, 240],
  },
  {
    slug: "sanctuary-build-log-1",
    title: "Sanctuary Build Log #1 — The Analog Problem",
    date: "2026-09-21",
    duration: "09:15",
    description:
      "Why our church's analog mixer changed the whole architecture of the AV dashboard — and the DeviceControl protocol that came out of it.",
    hue: [260, 290],
  },
  {
    slug: "voxel-city-weather-system",
    title: "Voxel City: Dynamic Weather in a Fragment Shader",
    date: "2026-09-08",
    duration: "15:02",
    description:
      "Rain haze, wet reflections, and lightning — all procedural. A look at the weather system and why restraint beat every post-processing effect.",
    hue: [300, 330],
  },
];

export const aiExperiments: AIExperiment[] = [
  {
    slug: "prudentia-ai",
    name: "Prudentia AI",
    description:
      "Production AI web app (Nessalk Industries): OpenAI-powered features with Supabase, Stripe billing, and Resend — deployed on Vercel.",
    status: "Active",
    tech: ["OpenAI", "Next.js", "Supabase"],
  },
  {
    slug: "telemetry-anomaly-detection",
    name: "Telemetry Anomaly Detection",
    description:
      "PyTorch models trained on CNC log features to flag tool-wear signatures before breakage. Extends the CNC Log Analyzer with learned detectors.",
    status: "In progress",
    tech: ["PyTorch", "Python"],
  },
  {
    slug: "gcode-copilot",
    name: "G-code Copilot",
    description:
      "Concept: an LLM assistant that reviews G-code programs for common mistakes — unsafe rapids, missing coolant, coordinate system errors.",
    status: "Concept",
    tech: ["OpenAI", "Python"],
  },
  {
    slug: "playground",
    name: "AI Playground",
    description:
      "A live chat interface wired to an OpenAI-compatible API. Bring your own key and talk to a model styled after this site's brain.",
    status: "Active",
    tech: ["Next.js", "Streaming"],
  },
];
