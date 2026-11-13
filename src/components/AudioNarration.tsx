"use client";

import { useEffect, useRef, useState } from "react";
import { stripMarkdownForSpeech } from "@/lib/stripMarkdown";

type Status = "idle" | "playing" | "paused" | "unsupported";

// Browsers default to whichever voice loaded first, which is usually the
// lowest-quality robotic one. Rank the available English voices so we
// request a higher-quality one (Natural/Enhanced/Premium/Google network
// voices, then well-regarded local voices) before falling back to default.
function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (english.length === 0) return null;

  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    if (/natural|enhanced|premium/.test(name)) return 4;
    if (name.includes("google")) return 3;
    if (/samantha|ava|serena|aria|jenny|guy/.test(name)) return 2;
    if (!v.localService) return 1;
    return 0;
  };

  return english.sort((a, b) => score(b) - score(a))[0];
}

export default function AudioNarration({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // One-time feature-detection on mount; must run client-side only, so it
    // can't be computed during render without a server/client markup mismatch.
    if (!("speechSynthesis" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("unsupported");
      return;
    }

    const pickVoice = () => {
      voiceRef.current = pickBestVoice(window.speechSynthesis.getVoices());
    };
    pickVoice();
    // Chrome loads voices asynchronously; the list is often empty on mount.
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  const buildUtterance = () => {
    const text = `${title}. ${stripMarkdownForSpeech(content)}`;
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 1.03;
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
