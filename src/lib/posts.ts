import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type Pillar = "analytics" | "career" | "healthcare";

export type HeroVisual = "monk-neem-tree" | "dividing-cell";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  pillar: Pillar;
  tags: string[];
  readingTime: string;
  heroVisual?: HeroVisual;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    pillar: data.pillar,
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    heroVisual: data.heroVisual,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByPillar(pillar: Pillar): PostMeta[] {
  return getAllPosts().filter((post) => post.pillar === pillar);
}
