"use client";

import { useState, type ReactNode } from "react";

export default function ReadModeToggle({
  tldr,
  children,
}: {
  tldr: string;
  children: ReactNode;
}) {
  const [showFull, setShowFull] = useState(true);

  return (
    <div>
      <div
        className="mb-8 flex items-center gap-1 p-1"
        style={{
          display: "inline-flex",
          border: "1px solid var(--border)",
          borderRadius: "999px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        <button
          onClick={() => setShowFull(true)}
          className="px-3 py-1.5"
          style={{
            borderRadius: "999px",
            color: showFull ? "var(--bg)" : "var(--text-secondary)",
            background: showFull ? "var(--accent)" : "transparent",
          }}
        >
          Full post
        </button>
        <button
          onClick={() => setShowFull(false)}
          className="px-3 py-1.5"
          style={{
            borderRadius: "999px",
            color: !showFull ? "var(--bg)" : "var(--text-secondary)",
            background: !showFull ? "var(--accent)" : "transparent",
          }}
        >
          2 min summary
        </button>
      </div>

      {showFull ? (
        children
      ) : (
        <p
          className="hud-prose"
          style={{ fontSize: "17px", lineHeight: 1.7 }}
        >
          {tldr}
        </p>
      )}
    </div>
  );
}
