import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PreferenceBanner from "@/components/PreferenceBanner";
import PersonalizedFeed from "@/components/PersonalizedFeed";
import NewsletterForm from "@/components/NewsletterForm";
import headshot from "../../public/images/headshot.jpg";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="hero-split">
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              margin: "0 0 20px",
            }}
          >
            Marketing analytics &middot; written in public
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4.2vw, 46px)",
              lineHeight: 1.14,
              letterSpacing: "-0.01em",
              textWrap: "balance",
              margin: "0 0 22px",
              color: "var(--text-primary)",
            }}
          >
            Every insight, built <em style={{ fontStyle: "italic", fontWeight: 500 }}>in the open</em>.
          </h1>
          <p
            style={{
              fontSize: "16.5px",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              maxWidth: "48ch",
              margin: "0 0 28px",
            }}
          >
            I document <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>real GA4 setups</strong>,
            an active <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>job search in marketing
            analytics</strong>, and the niche most marketing blogs skip &mdash;{" "}
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>healthcare analytics</strong>.
            Nothing here is hypothetical.
          </p>
          <a
            href="#feed"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-primary)",
              borderBottom: "2px solid var(--text-primary)",
              paddingBottom: "3px",
            }}
          >
            Read the latest post &rarr;
          </a>
        </div>
        <div className="photo-frame">
          <Image
            src={headshot}
            alt="Anantha Nanduri"
            sizes="(max-width: 760px) 320px, 420px"
            priority
          />
        </div>
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
