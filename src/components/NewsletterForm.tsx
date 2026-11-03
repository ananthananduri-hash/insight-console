"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error — try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={compact ? "" : "hud-panel px-7 py-8"}
        style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)" }}
      >
        TRANSMISSION CONFIRMED &mdash; check your inbox to verify.
      </div>
    );
  }

  return (
    <div className={compact ? "" : "hud-panel px-7 py-8"}>
      {!compact && (
        <div className="section-label mb-4">
          <span className="n">//</span> SUBSCRIBE <span className="rule" />
        </div>
      )}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: compact ? "16px" : "22px",
          color: "var(--text-primary)",
          margin: compact ? "0 0 6px" : "0 0 10px",
        }}
      >
        Join the dispatch
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          margin: "0 0 18px",
          maxWidth: "48ch",
        }}
      >
        New GA4 breakdowns, career notes, and healthcare-analytics posts —
        straight to your inbox, no spam.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          style={{
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            padding: "10px 14px",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--border-strong)",
            borderRadius: "6px",
            padding: "10px 20px",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: status === "loading" ? "default" : "pointer",
            opacity: status === "loading" ? 0.6 : 1,
          }}
        >
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--amber)" }}>{message}</p>
      )}
    </div>
  );
}
