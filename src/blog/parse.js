// Turns a Markdown post file into a post object.
// Shared by the blog page (browser) and scripts/blog-pages.mjs (build), so keep it plain JS.
import { parse } from "yaml";

export const SITE = "https://portfolio.codebread.fun";
export const AUTHOR = "Ankit Prajapati";

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parsePost(slug, raw) {
  const match = raw.match(FRONT_MATTER);
  const meta = (match && parse(match[1])) || {};
  const body = match ? match[2] : raw;
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(meta.title || slug),
    type: meta.type === "vlog" ? "vlog" : "blog",
    date: meta.date ? String(meta.date).slice(0, 10) : "",
    description: String(meta.description || ""),
    cover: meta.cover || "",
    video: meta.video || "",
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    draft: Boolean(meta.draft),
    body,
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

export const newestFirst = (a, b) => b.date.localeCompare(a.date);

export function formatDate(date) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** YouTube video id from any YouTube link (watch, youtu.be, shorts, live, embed). */
export function youtubeId(url = "") {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** Image shown on cards and link previews: the cover, else the YouTube thumbnail. */
export function previewImage(post) {
  if (post.cover) return post.cover;
  const id = youtubeId(post.video);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}
