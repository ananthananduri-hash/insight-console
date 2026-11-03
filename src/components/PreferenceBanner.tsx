"use client";

import { useEffect, useState } from "react";
import type { Pillar } from "@/lib/posts";
import {
  getStoredPreference,
  setStoredPreference,
  type StoredPreference,
} from "@/lib/preference";

const OPTIONS: { pillar: Pillar; label: string; idx: string; blurb: string }[] = [
  {
    pillar: "analytics",
    label: "Marketing Analytics",
    idx: "MODULE // ANALYTICS",
    blurb: "GA4 setup, dashboards, attribution — built in public on this exact site.",
  },
  {
    pillar: "career",
    label: "Career & Job Search",
    idx: "MODULE // CAREER",
    blurb: "Unfiltered notes from an active search in marketing analytics.",
  },
  {
    pillar: "healthcare",
    label: "Healthcare Analytics",
    idx: "MODULE // HEALTHCARE",
    blurb: "Marketing analytics applied to healthcare — the niche most blogs skip.",
  },
];

export default function PreferenceBanner() {
  const [loaded, setLoaded] = useState(false);
  const [preference, setPreference] = useState<StoredPreference>(null);

  useEffect(() => {
    setPreference(getStoredPreference());
    setLoaded(true);
  }, []);

  const choose = (pillar: Pillar) => {
    const next = preference === pillar ? "skipped" : pillar;
    setStoredPreference(next);
    setPreference(next);
  };

  if (!loaded) return null;

  return (
    <section className="mb-12">
      <div className="section-label mb-4">
        <span className="n">01</span> CALIBRATE FEED <span className="rule" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.pillar}
            className={`pillar-btn${preference === opt.pillar ? " active" : ""}`}
            onClick={() => choose(opt.pillar)}
          >
            <div className="idx">{opt.idx}</div>
            <h3>{opt.label}</h3>
            <p>{opt.blurb}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
