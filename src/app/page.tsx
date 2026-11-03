import { getAllPosts } from "@/lib/posts";
import PreferenceBanner from "@/components/PreferenceBanner";
import PersonalizedFeed from "@/components/PersonalizedFeed";
import ConsoleReadouts from "@/components/ConsoleReadouts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <section className="hud-panel px-7 py-8 mb-12">
        <div className="section-label mb-5">
          MEASURED NOTES &mdash; CONSOLE <span className="rule" /> ANALYTICS / CAREER / HEALTHCARE
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px, 4.2vw, 42px)",
            lineHeight: 1.14,
            letterSpacing: "0.005em",
            textWrap: "balance",
            maxWidth: "18ch",
            margin: "0 0 16px",
            color: "var(--text-primary)",
          }}
        >
          Marketing analytics, read <span style={{ color: "var(--accent)" }}>on your terms</span>.
        </h1>
        <p style={{ maxWidth: "58ch", fontSize: "16px", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
          This is a briefing, not a blog roll. Tell the console what you&apos;re here for and
          it reorders the feed in real time &mdash; GA4 tutorials, career notes from an active
          job search, or healthcare marketing analytics.
        </p>
        <ConsoleReadouts postCount={posts.length} />
      </section>

      <PreferenceBanner />
      <PersonalizedFeed posts={posts} />
    </div>
  );
}
