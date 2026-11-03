"use client";

import { useEffect, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import {
  getStoredPreference,
  PREFERENCE_EVENT,
  type StoredPreference,
} from "@/lib/preference";
import PostCard from "@/components/PostCard";

const PILLAR_LABEL: Record<string, string> = {
  analytics: "ANALYTICS",
  career: "CAREER",
  healthcare: "HEALTHCARE",
};

export default function PersonalizedFeed({ posts }: { posts: PostMeta[] }) {
  const [preference, setPreference] = useState<StoredPreference>(null);

  useEffect(() => {
    setPreference(getStoredPreference());
    const onChange = () => setPreference(getStoredPreference());
    window.addEventListener(PREFERENCE_EVENT, onChange);
    return () => window.removeEventListener(PREFERENCE_EVENT, onChange);
  }, []);

  const hasPreference = preference && preference !== "skipped";

  const picked = hasPreference ? posts.filter((post) => post.pillar === preference) : [];
  const rest = hasPreference ? posts.filter((post) => post.pillar !== preference) : posts;

  return (
    <section>
      <div className="section-label mb-2">
        <span className="n">02</span> DATA FEED <span className="rule" />
      </div>

      {hasPreference && picked.length > 0 && (
        <div className="mb-8">
          <div
            className="mb-1 mt-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            Picked for you &middot; {PILLAR_LABEL[preference as string]}
          </div>
          <div>
            {picked.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          {hasPreference && (
            <div
              className="mb-1 mt-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
              }}
            >
              More from Measured Notes
            </div>
          )}
          <div>
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
