// Every Markdown file in content/posts/ is a post. The file name is the URL: /blog/<file-name>.
import { newestFirst, parsePost } from "./parse";

const files = import.meta.glob("/content/posts/*.md", { query: "?raw", import: "default", eager: true });

export const POSTS = Object.entries(files)
  .map(([path, raw]) => parsePost(path.split("/").pop().replace(/\.md$/, ""), raw))
  // Drafts show while developing locally, never on the live site.
  .filter((p) => !(import.meta.env.PROD && p.draft))
  .sort(newestFirst);
