import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import AudioNarration from "@/components/AudioNarration";
import NewsletterForm from "@/components/NewsletterForm";
import MonkUnderNeemTreeScene from "@/components/heroes/MonkUnderNeemTreeScene";
import DividingCellScene from "@/components/heroes/DividingCellScene";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Anantha Nanduri",
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {post.heroVisual === "monk-neem-tree" && (
        <div className="mb-10 grayscale-media">
          <MonkUnderNeemTreeScene />
        </div>
      )}
      {post.heroVisual === "dividing-cell" && (
        <div className="mb-10 grayscale-media">
          <DividingCellScene />
        </div>
      )}

      <header className="mb-10">
        <div
          className="mb-3 flex items-center gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(26px, 4vw, 38px)",
            lineHeight: 1.18,
            color: "var(--text-primary)",
            textWrap: "balance",
            margin: 0,
          }}
        >
          {post.title}
        </h1>
        <p style={{ marginTop: "16px", fontSize: "17px", lineHeight: 1.6, color: "var(--text-secondary)" }}>
          {post.description}
        </p>
        <div className="mt-5">
          <AudioNarration title={post.title} content={post.content} />
        </div>
      </header>
      <div className="hud-prose prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-14 pt-10" style={{ borderTop: "1px solid var(--border)" }}>
        <NewsletterForm compact />
      </div>
    </article>
  );
}
