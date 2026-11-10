import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PreferenceBanner from "@/components/PreferenceBanner";
import PersonalizedFeed from "@/components/PersonalizedFeed";
import NewsletterForm from "@/components/NewsletterForm";
import treeOfLife from "../../public/images/tree-of-life.jpg";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section
        style={{
          background: "#05060a",
          padding: "64px 24px 56px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--gold-ember, #ff9b4d)",
            margin: "0 0 18px",
          }}
        >
          A living record, written in public
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.6vw, 48px)",
            lineHeight: 1.16,
            textWrap: "balance",
            maxWidth: "16ch",
            margin: "0 auto",
            color: "var(--text-primary)",
          }}
        >
          Every insight{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #ffe0a3, #ffc168)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            takes root
          </span>
          .
        </h1>

        <div style={{ maxWidth: "720px", margin: "40px auto 0" }}>
          <Image
            src={treeOfLife}
            alt="A golden, glowing tree of life against a starry night sky"
            sizes="(max-width: 768px) 100vw, 720px"
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "46ch",
            margin: "40px auto 26px",
          }}
        >
          Marketing analytics, career notes, and healthcare analytics &mdash;
          grown one post at a time, out in the open.
        </p>
        <a
          href="#feed"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#05060a",
            background: "linear-gradient(90deg, #ffe0a3, #ffc168)",
            padding: "13px 22px",
            borderRadius: "2px",
            boxShadow: "0 0 28px rgba(255, 193, 104, 0.35)",
          }}
        >
          Enter the console &rarr;
        </a>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-10" id="feed">
        <PreferenceBanner />
        <PersonalizedFeed posts={posts} />

        <section className="mt-14 mb-4">
          <NewsletterForm />
        </section>
      </div>
    </div>
  );
}
