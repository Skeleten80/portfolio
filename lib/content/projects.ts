import { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "sanctuary",
    name: "Sanctuary",
    tagline: "Swift dashboard for church sound-booth AV control",
    description:
      "A macOS hub + iPadOS remote that unifies a church sound booth: checklists, run-of-show with live cue timers, and an AVAudioEngine playback engine with software faders and mutes. Syncs over the local network with MultipeerConnectivity.",
    tech: ["Swift", "SwiftUI", "AVAudioEngine", "MultipeerConnectivity"],
    status: "In progress",
    lastUpdate: "Sep 2026",
    hue: [222, 262],
    featured: true,
  },
  {
    slug: "cnc-log-analyzer",
    name: "CNC Log Analyzer",
    tagline: "Turning machine logs into actionable shop-floor insight",
    description:
      "Parses CNC controller logs and G-code execution traces, flags anomalies (tool wear signatures, feed overrides, alarm clusters), and renders shift-level reports with matplotlib. Tested with pytest, built to be reproducible from a single command.",
    tech: ["Python", "pandas", "matplotlib", "pytest"],
    status: "Active",
    lastUpdate: "Aug 2026",
    hue: [28, 48],
    featured: true,
    link: "https://github.com/Skeleten80",
  },
  {
    slug: "machine-job-queue-simulator",
    name: "Machine Job Queue Simulator",
    tagline: "Discrete-event simulation of a machine shop floor",
    description:
      "A C++20 discrete-event simulator modelling machines, job queues, setup times, and breakdowns. Used to experiment with scheduling policies (SPT, EDD, critical-ratio) and measure their effect on throughput and tardiness.",
    tech: ["C++20", "CMake"],
    status: "Complete",
    lastUpdate: "Jul 2026",
    hue: [200, 170],
    featured: true,
    link: "https://github.com/Skeleten80",
  },
  {
    slug: "voxel-city",
    name: "Voxel City",
    tagline: "Procedural cyberpunk metropolis with real-time raymarching",
    description:
      "A procedural cyberpunk city rendered with raymarching and ray tracing: generated towers, emissive signage, volumetric-feel fog, and a dynamic weather system. A playground for GPU graphics techniques and procedural generation.",
    tech: ["C++", "GLSL", "Raymarching", "Procedural Generation"],
    status: "In progress",
    lastUpdate: "Sep 2026",
    hue: [290, 320],
  },
  {
    slug: "prudentia-ai",
    name: "Prudentia AI",
    tagline: "AI product by Nessalk Industries",
    description:
      "A production AI web application: Next.js/TypeScript front end, Supabase for data and auth, Stripe billing, OpenAI-powered features, Resend transactional email, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "OpenAI", "Vercel"],
    status: "Active",
    lastUpdate: "Sep 2026",
    hue: [160, 190],
  },
  {
    slug: "48-week-engineering-program",
    name: "48-Week Engineering Program",
    tagline: "A self-directed path from CNC technician to software engineer",
    description:
      "A structured ~48-week, 8–12 hrs/week curriculum through manufacturing telemetry, Linux systems, predictive maintenance, robotics, and embedded systems — learned by building, with reproducible builds, tests, and documentation for every project.",
    tech: ["Python", "C++", "Rust", "Linux", "ROS 2"],
    status: "Active",
    lastUpdate: "Sep 2026",
    hue: [120, 150],
  },
];

export const allTech: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tech))
).sort();
