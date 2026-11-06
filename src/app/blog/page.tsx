import type { Metadata } from "next";
import { getAllPosts, type Pillar } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts on marketing analytics, career notes, and healthcare analytics.",
};

const PILLAR_LABEL: Record<Pillar, string> = {
  analytics: "Analytics",
  career: "Career",
  healthcare: "Healthcare",
};

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const { pillar } = await searchParams;
  const allPosts = getAllPosts();
  const posts =
    pillar && (pillar === "analytics" || pillar === "career" || pillar === "healthcare")
      ? allPosts.filter((post) => post.pillar === pillar)
      : allPosts;

  const heading =
    pillar && pillar in PILLAR_LABEL ? `${PILLAR_LABEL[pillar as Pillar]} feed` : "Full data feed";

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="section-label mb-2">
        <span className="n">{"//"}</span> {heading.toUpperCase()} <span className="rule" />
      </div>
      {posts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", marginTop: "16px" }}>No posts yet in this category.</p>
      ) : (
        <div className="mt-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
