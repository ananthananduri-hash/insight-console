"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads localStorage, so it must run post-hydration, client-side only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  const choose = (granted: boolean) => {
    setStoredConsent(granted ? "granted" : "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="mx-auto max-w-3xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ fontSize: "13px", lineHeight: 1.5, color: "var(--text-secondary)", margin: 0, maxWidth: "52ch" }}>
          This site uses privacy-respecting analytics (Google Consent Mode v2) to
          understand what&apos;s useful. No ad tracking, ever &mdash; you can decline
          and still read everything.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose(false)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              padding: "8px 14px",
            }}
          >
            Decline
          </button>
          <button
            onClick={() => choose(true)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--accent)",
              border: "1px solid var(--border-strong)",
              background: "var(--accent-dim)",
              borderRadius: "6px",
              padding: "8px 14px",
            }}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
