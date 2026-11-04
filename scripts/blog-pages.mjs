// Runs after `vite build`. For every post in content/posts/ it writes dist/blog/<slug>/index.html
// with the post's own title, description and image, so links shared on X, LinkedIn or WhatsApp
// show a proper preview. Also writes the RSS feed at dist/blog/rss.xml.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AUTHOR, SITE, newestFirst, parsePost, previewImage } from "../src/blog/parse.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "content", "posts");
const dist = join(root, "dist", "blog");
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const absolute = (url) => (!url ? "" : url.startsWith("http") ? url : `${SITE}${url.startsWith("/") ? "" : "/"}${url}`);

function page({ title, description, url, image, type }) {
  const tags = [
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(AUTHOR)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    image && `<meta name="twitter:image" content="${image}" />`,
  ].filter(Boolean).join("\n    ");
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
    .replace("</head>", `    ${tags}\n  </head>`);
}

const posts = (existsSync(postsDir) ? readdirSync(postsDir) : [])
  .filter((f) => f.endsWith(".md"))
  .map((f) => parsePost(f.replace(/\.md$/, ""), readFileSync(join(postsDir, f), "utf8")))
  .filter((p) => !p.draft)
  .sort(newestFirst);

// The list page.
writeFileSync(join(dist, "index.html"), page({
  title: `Blog · ${AUTHOR}`,
  description: "Notes and videos from Ankit Prajapati on AI, connected devices and building products.",
  url: `${SITE}/blog`,
  image: "",
  type: "website",
}));

for (const p of posts) {
  const dir = join(dist, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page({
    title: `${p.title} · ${AUTHOR}`,
    description: p.description,
    url: `${SITE}/blog/${p.slug}`,
    image: absolute(previewImage(p)),
    type: "article",
  }));
}

const items = posts.map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date || "1970-01-01"}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${p.type === "vlog" ? "Vlog" : "Blog"}</category>
    </item>`).join("");

writeFileSync(join(dist, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(AUTHOR)} · Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes and videos on AI, connected devices and building products.</description>
    <language>en-in</language>${items}
  </channel>
</rss>
`);

console.log(`Blog: ${posts.length} post page(s) + rss.xml`);
