"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./playground.module.css";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Msg[];
  updatedAt: number;
}

const MODELS = [
  { id: "gpt-4o-mini", label: "gpt-4o-mini (default)" },
  { id: "gpt-4o", label: "gpt-4o" },
  { id: "o1-mini", label: "o1-mini" },
];

const STORE_KEY = "mk-playground-convos";
const MODEL_KEY = "mk-playground-model";

function newConvo(): Conversation {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: "New conversation",
    messages: [],
    updatedAt: Date.now(),
  };
}

function loadConvos(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [newConvo()];
}

export default function PlaygroundClient() {
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [model, setModel] = useState(MODELS[0].id);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = loadConvos();
    setConvos(c);
    setActiveId(c[0]?.id ?? "");
    setModel(localStorage.getItem(MODEL_KEY) ?? MODELS[0].id);
  }, []);

  useEffect(() => {
    if (convos.length === 0) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(convos.slice(0, 20)));
    } catch {
      /* ignore */
    }
  }, [convos]);

  useEffect(() => {
    localStorage.setItem(MODEL_KEY, model);
  }, [model]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [convos, activeId, sending]);

  const active = convos.find((c) => c.id === activeId);
  const estTokens = active
    ? Math.round(active.messages.reduce((n, m) => n + m.text.length, 0) / 4)
    : 0;

  const updateActive = (fn: (c: Conversation) => Conversation) =>
    setConvos((cs) => cs.map((c) => (c.id === activeId ? fn(c) : c)));

  const send = async () => {
    const text = input.trim();
    if (!text || sending || !active) return;
    setInput("");
    setSending(true);
    const userMsg: Msg = { role: "user", text };
    const history = [...active.messages, userMsg];
    updateActive((c) => ({
      ...c,
      title: c.messages.length === 0 ? text.slice(0, 42) : c.title,
      messages: history,
      updatedAt: Date.now(),
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, model }),
      });
      const data = await res.json();
      setConfigured(data.configured !== false);
      const reply: Msg = { role: "assistant", text: data.reply ?? "No response." };
      updateActive((c) => ({
        ...c,
        messages: [...c.messages, reply],
        updatedAt: Date.now(),
      }));
    } catch {
      setConfigured(false);
      updateActive((c) => ({
        ...c,
        messages: [
          ...c.messages,
          { role: "assistant", text: "Request failed — the chat endpoint didn't respond. Check your connection and try again." },
        ],
        updatedAt: Date.now(),
      }));
    } finally {
      setSending(false);
    }
  };

  const startNew = () => {
    const c = newConvo();
    setConvos((cs) => [c, ...cs]);
    setActiveId(c.id);
  };

  const removeConvo = (id: string) => {
    setConvos((cs) => {
      const next = cs.filter((c) => c.id !== id);
      const filled = next.length === 0 ? [newConvo()] : next;
      if (id === activeId) setActiveId(filled[0].id);
      return filled;
    });
  };

  return (
    <div className={styles.shell}>
      {/* History sidebar */}
      <aside className={`glass-thick ${styles.sidebar}`} aria-label="Conversation history">
        <button type="button" onClick={startNew} className={`glass-thin ${styles.newBtn}`}>
          ＋ New chat
        </button>
        <ul className={styles.history}>
          {convos
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((c) => (
              <li key={c.id}>
                <div
                  className={`${styles.histItem} ${c.id === activeId ? styles.histActive : ""}`}
                >
                  <button
                    type="button"
                    className={styles.histTitle}
                    onClick={() => setActiveId(c.id)}
                    aria-current={c.id === activeId ? "true" : undefined}
                  >
                    {c.title}
                  </button>
                  <button
                    type="button"
                    className={styles.histDel}
                    onClick={() => removeConvo(c.id)}
                    aria-label={`Delete "${c.title}"`}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <p className={styles.sideNote}>History lives in your browser only.</p>
      </aside>

      {/* Conversation panel */}
      <section className={`glass-thick ${styles.panel}`} aria-label="AI conversation">
        <header className={styles.panelHead}>
          <div className={styles.statusRow}>
            <span
              className={`${styles.statusDot} ${
                configured === false ? styles.off : styles.on
              }`}
              aria-hidden="true"
            />
            <span className={styles.statusText}>
              {configured === false ? "Not configured" : "Playground"}
            </span>
          </div>
          <label className={styles.modelWrap}>
            <span className="sr-only">Model</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`glass-thin ${styles.model}`}
              aria-label="Model"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        </header>

        <div className={styles.contextBar} aria-live="polite">
          <span>Context · {active?.messages.length ?? 0} messages · ~{estTokens} tokens</span>
          <span className={styles.modelTag}>{model}</span>
        </div>

        <div className={styles.messages} role="log" aria-label="Messages">
          {(!active || active.messages.length === 0) && (
            <div className={styles.welcome}>
              <p className="eyebrow">AI Playground</p>
              <h2>Ask about the work.</h2>
              <p>
                This panel talks to an OpenAI-compatible chat API. Without a
                key it will tell you so honestly — set{" "}
                <code>OPENAI_API_KEY</code> to enable it (see README).
              </p>
            </div>
          )}
          {active?.messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.msg} ${m.role === "user" ? styles.user : styles.assistant}`}
            >
              <span className={styles.role}>{m.role === "user" ? "You" : "Neptune"}</span>
              <p>{m.text}</p>
            </div>
          ))}
          {sending && (
            <div className={`${styles.msg} ${styles.assistant}`}>
              <span className={styles.role}>Neptune</span>
              <p className={styles.typing} aria-label="Thinking">
                <span /><span /><span />
              </p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          className={styles.composer}
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <div className={`glass-thin block ${styles.field}`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              aria-label="Message"
              className={styles.input}
              disabled={sending}
            />
          </div>
          <button
            type="submit"
            disabled={sending || input.trim() === ""}
            className={`glass-thin ${styles.send}`}
            aria-label="Send message"
          >
            {sending ? "…" : "↑"}
          </button>
        </form>
      </section>
    </div>
  );
}
