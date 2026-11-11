import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://insightconsole.in";

const PILLAR_LABEL: Record<string, string> = {
  analytics: "Analytics",
  career: "Career",
  healthcare: "Healthcare",
};

export async function GET() {
  const posts = getAllPosts();

  const sections: Record<string, string[]> = {};
  for (const post of posts) {
    const label = PILLAR_LABEL[post.pillar] ?? post.pillar;
    sections[label] ??= [];
    sections[label].push(
      `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`,
    );
  }

  const body = `# Insight Console

> A personal blog by Anantha Nanduri documenting hands-on marketing analytics
> (GA4, Search Console, SEO/AEO/GEO), an active job search in marketing
> analytics, and healthcare marketing analytics - a niche most generalist
> marketing content skips. Every post reflects a real decision made building
> this exact site; nothing here is hypothetical.

## About

- [About](${SITE_URL}/about): Who writes this and why the site exists.

${Object.entries(sections)
  .map(([label, items]) => `## ${label}\n\n${items.join("\n")}`)
  .join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
