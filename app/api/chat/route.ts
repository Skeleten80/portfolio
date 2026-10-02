interface ChatBody {
  message?: string;
  history?: { role: "user" | "assistant"; text: string }[];
  model?: string;
}

const SYSTEM_PROMPT = `You are Neptune, the AI behind Mathias Klassen's personal portfolio site. Mathias is a CNC technician in Stratford, Ontario, moving into software/computer engineering applied to manufacturing (automation, telemetry, predictive maintenance). His projects: Sanctuary (Swift AV dashboard), CNC Log Analyzer (Python), Machine Job Queue Simulator (C++), Voxel City (raymarched cyberpunk city), Prudentia AI (Next.js AI product). His stack: Python, C, C++, Rust, Swift, TypeScript, Linux, PyTorch, ROS 2, FreeRTOS. Be helpful, direct, and concise. If asked about things outside this portfolio, answer normally but keep it brief.`;

const NOT_CONFIGURED =
  "The AI playground isn't configured yet — no API key was found on the server. " +
  "To enable it, set OPENAI_API_KEY (and optionally OPENAI_BASE_URL / OPENAI_MODEL) " +
  "in the deployment environment and redeploy. See the README for details.";

export async function POST(req: Request) {
  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return Response.json(
      { reply: "Couldn't parse the request body.", configured: true },
      { status: 400 }
    );
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return Response.json(
      { reply: "Send a non-empty message to get a reply.", configured: true },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Honest fallback — never crash, never pretend.
    return Response.json({ reply: NOT_CONFIGURED, configured: false });
  }

  const baseUrl = (process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  const model = body.model || process.env.OPENAI_MODEL || "gpt-4o-mini";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(body.history ?? []).slice(-20).map((m) => ({
      role: m.role,
      content: m.text,
    })),
  ];

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Chat API error:", res.status, detail.slice(0, 300));
      return Response.json({
        reply:
          "The model API returned an error. The key may be invalid, the model name unsupported, or the endpoint unreachable. Check the server logs.",
        configured: true,
      });
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "The API returned an empty response. Try again.";
    return Response.json({ reply, configured: true });
  } catch (err) {
    console.error("Chat API exception:", err);
    return Response.json({
      reply:
        "Couldn't reach the model API (network error or timeout). Verify OPENAI_BASE_URL and try again.",
      configured: true,
    });
  }
}
