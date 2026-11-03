import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why this blog exists: a marketing analytics job search, documented in public.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="section-label mb-6">
        <span className="n">//</span> OPERATOR PROFILE <span className="rule" />
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "32px",
          color: "var(--text-primary)",
          margin: "0 0 24px",
        }}
      >
        About
      </h1>
      <div className="hud-prose" style={{ maxWidth: "65ch" }}>
        <p>
          I&apos;m Anantha Nanduri. I got certified in Google Analytics and
          realized the best way to prove I actually know this stuff &mdash;
          not just pass a test on it &mdash; was to build something real with
          it.
        </p>
        <p>
          This blog is that project: a live GA4 implementation, a documented
          SEO/AEO/GEO experiment, and a running log of what I&apos;m learning
          while job searching in marketing analytics. It covers three things:
        </p>
        <ul>
          <li>
            <strong>Analytics</strong> &mdash; practical GA4, Search Console,
            and dashboard tutorials
          </li>
          <li>
            <strong>Career</strong> &mdash; honest notes from an active job
            search in analytics and marketing
          </li>
          <li>
            <strong>Healthcare</strong> &mdash; marketing analytics applied to
            healthcare, a niche most generalist marketing blogs skip
          </li>
        </ul>
        <p>
          Nothing here is theoretical. Every analytics post reflects a
          decision I actually made building this site, and every traffic or
          ranking number I reference will be a real one, not a hypothetical.
        </p>
      </div>
    </div>
  );
}
