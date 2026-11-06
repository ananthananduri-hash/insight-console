"use client";

import { useEffect, useState } from "react";
import {
  getStoredPreference,
  PREFERENCE_EVENT,
  type StoredPreference,
} from "@/lib/preference";

const PILLAR_LABEL: Record<string, string> = {
  analytics: "ANALYTICS",
  career: "CAREER",
  healthcare: "HEALTHCARE",
};

export default function ConsoleReadouts({ postCount }: { postCount: number }) {
  const [preference, setPreference] = useState<StoredPreference>(null);

  useEffect(() => {
    // Reads localStorage, so it must run post-hydration, client-side only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreference(getStoredPreference());
    const onChange = () => setPreference(getStoredPreference());
    window.addEventListener(PREFERENCE_EVENT, onChange);
    return () => window.removeEventListener(PREFERENCE_EVENT, onChange);
  }, []);

  const hasPreference = preference && preference !== "skipped";

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 mt-6"
      style={{ border: "1px solid var(--border)", background: "var(--border)", gap: "1px" }}
    >
      <div style={{ background: "var(--surface)", padding: "14px 16px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Posts indexed
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "20px", color: "var(--accent)" }}>
          {String(postCount).padStart(2, "0")} <small style={{ fontSize: "12px", color: "var(--text-secondary)" }}>live</small>
        </div>
      </div>
      <div style={{ background: "var(--surface)", padding: "14px 16px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Active pillar
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "20px", color: "var(--accent)" }}>
          {hasPreference ? PILLAR_LABEL[preference as string] : "NONE"}{" "}
          <small style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            {hasPreference ? "locked" : "select below"}
          </small>
        </div>
      </div>
    </div>
  );
}
