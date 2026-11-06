"use client";

import { useEffect, useRef, useState } from "react";
import { stripMarkdownForSpeech } from "@/lib/stripMarkdown";

type Status = "idle" | "playing" | "paused" | "unsupported";

export default function AudioNarration({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // One-time feature-detection on mount; must run client-side only, so it
    // can't be computed during render without a server/client markup mismatch.
    if (!("speechSynthesis" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("unsupported");
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const buildUtterance = () => {
    const text = `${title}. ${stripMarkdownForSpeech(content)}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.pitch = 1;
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    return utterance;
  };

  const play = () => {
    const synth = window.speechSynthesis;
    if (status === "paused") {
      synth.resume();
      setStatus("playing");
      return;
    }
    synth.cancel();
    const utterance = buildUtterance();
    utteranceRef.current = utterance;
    synth.speak(utterance);
    setStatus("playing");
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setStatus("idle");
  };

  if (status === "unsupported") return null;

  return (
    <div
      className="inline-flex items-center gap-3 px-3 py-1.5"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "999px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
      }}
    >
      {status === "playing" ? (
        <button
          onClick={pause}
          className="flex items-center gap-1.5"
          style={{ color: "var(--accent)" }}
          aria-label="Pause narration"
        >
          <PauseIcon />
          Listening
        </button>
      ) : (
        <button
          onClick={play}
          className="flex items-center gap-1.5 hover:opacity-80"
          aria-label={status === "paused" ? "Resume narration" : "Listen to this post"}
        >
          <PlayIcon />
          {status === "paused" ? "Resume" : "Listen"}
        </button>
      )}
      {status !== "idle" && (
        <button
          onClick={stop}
          style={{ color: "var(--text-tertiary)" }}
          aria-label="Stop narration"
        >
          Stop
        </button>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v9l8-4.5-8-4.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3" height="9" />
      <rect x="7" y="1.5" width="3" height="9" />
    </svg>
  );
}
