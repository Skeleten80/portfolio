import PlaygroundClient from "./PlaygroundClient";

export const metadata = { title: "AI Playground" };

export default function PlaygroundPage() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Experiments</p>
        <h1 className="section-title">AI Playground</h1>
        <p className="section-sub">
          A chat interface with a native-app feel, wired to an
          OpenAI-compatible API.
        </p>
        <PlaygroundClient />
      </div>
    </div>
  );
}
