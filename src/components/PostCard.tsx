import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const PILLAR_LABEL: Record<string, string> = {
  analytics: "ANALYTICS",
  career: "CAREER",
  healthcare: "HEALTHCARE",
};

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="feed-row block hover:opacity-90">
      <div className="meta">
        <span className={`tag ${post.pillar === "healthcare" ? "healthcare" : ""}`}>
          {PILLAR_LABEL[post.pillar] ?? post.pillar.toUpperCase()}
        </span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={post.date}>
          {new Date(post.date)
            .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
            .toUpperCase()}
        </time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingTime.toUpperCase()}</span>
      </div>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
    </Link>
  );
}
