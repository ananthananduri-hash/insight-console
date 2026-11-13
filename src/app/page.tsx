import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PreferenceBanner from "@/components/PreferenceBanner";
import PersonalizedFeed from "@/components/PersonalizedFeed";
import NewsletterForm from "@/components/NewsletterForm";
import heroLandscape from "../../public/images/hero-landscape.jpg";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="hero-banner">
        <Image
          src={heroLandscape}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div className="hero-banner-content">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--amber)",
              margin: "0 0 18px",
            }}
          >
            Marketing analytics &middot; written in public
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 4.4vw, 44px)",
              lineHeight: 1.14,
              letterSpacing: "-0.01em",
              textWrap: "balance",
              margin: "0 0 20px",
              color: "var(--text-primary)",
            }}
          >
            Every insight, built{" "}
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--accent)" }}>
              in the open
            </em>
            .
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "50ch",
              margin: "0 0 26px",
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
              borderBottom: "2px solid var(--amber)",
              paddingBottom: "3px",
            }}
          >
            Read the latest post &rarr;
          </a>
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
