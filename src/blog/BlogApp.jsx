import { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { ArrowLeft, ArrowUpRight, Check, Link2, Linkedin, PenLine, Play, Rss } from "lucide-react";
import { POSTS } from "./posts";
import { AUTHOR, SITE, formatDate, previewImage, youtubeId } from "./parse";

/* ---------- tiny router: /blog and /blog/<slug> ---------- */

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return path;
}

function go(href) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

/** Link that stays inside the blog without reloading the page. */
function Link({ href, className, children, ...rest }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(href);
  };
  return <a href={href} onClick={onClick} className={className} {...rest}>{children}</a>;
}

const postUrl = (slug) => `/blog/${slug}`;

function setMeta(title, description) {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

/* ---------- shared bits ---------- */

function TypeBadge({ type, className = "" }) {
  return type === "vlog" ? (
    <span className={`inline-flex items-center gap-1 rounded-full bg-accent text-white px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest ${className}`}>
      <Play className="w-3 h-3 fill-current" /> Vlog
    </span>
  ) : (
    <span className={`inline-flex items-center gap-1 rounded-full bg-sun text-ink px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest ${className}`}>
      <PenLine className="w-3 h-3" /> Blog
    </span>
  );
}

function Avatar({ size = "w-9 h-9 text-xs" }) {
  return (
    <span className={`${size} shrink-0 rounded-full bg-accent text-white border-2 border-ink flex items-center justify-center font-display font-black`} aria-hidden>
      AP
    </span>
  );
}

const meta = (p) => [formatDate(p.date), p.type === "vlog" ? "Video" : `${p.minutes} min read`].filter(Boolean).join(" · ");

function Thumb({ post, className }) {
  const src = previewImage(post);
  return (
    <div className={`relative overflow-hidden bg-accentsoft border-2 border-ink [container-type:inline-size] ${className}`}>
      {src ? (
        <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
      ) : (
        <div className={`dot-grid w-full h-full flex flex-col justify-between p-[8%] ${post.type === "vlog" ? "bg-ink text-white" : "bg-sun text-ink"}`}>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">Ankit writes</span>
          <span className="font-display font-black leading-[1.05] line-clamp-3 text-[clamp(0.6rem,9cqi,2.25rem)]">{post.title}</span>
        </div>
      )}
      {post.type === "vlog" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-12 h-12 rounded-full bg-white/95 border-2 border-ink flex items-center justify-center shadow-[3px_3px_0_#0A0A0A]">
            <Play className="w-5 h-5 fill-ink ml-0.5" />
          </span>
        </span>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-4">
        <Link href="/blog" className="flex items-center gap-2.5">
          <Avatar size="w-8 h-8 text-[10px]" />
          <span className="font-display font-black text-lg leading-none">
            Ankit <span className="text-accent">writes</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 sm:gap-2 text-sm font-semibold">
          <a href="/blog/rss.xml" title="RSS feed" aria-label="RSS feed" className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-accent hover:bg-accentsoft">
            <Rss className="w-4 h-4" />
          </a>
          <a href="/" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white px-4 py-2 hover:bg-accent transition-colors">
            Portfolio <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} {AUTHOR}</span>
        <span className="ml-auto flex gap-5">
          <a href="/" className="hover:text-ink">Portfolio</a>
          <a href="/blog/rss.xml" className="hover:text-ink">RSS</a>
          <a href="https://github.com/Ankitprajapati24" target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
        </span>
      </div>
    </footer>
  );
}

/* ---------- list page ---------- */

const FILTERS = [
  { id: "all", label: "All" },
  { id: "blog", label: "Blogs" },
  { id: "vlog", label: "Vlogs" },
];

function PostRow({ post }) {
  return (
    <Link href={postUrl(post.slug)} className="group flex gap-5 sm:gap-8 py-8 border-b border-slate-200">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <Avatar size="w-6 h-6 text-[9px]" />
          <span className="font-semibold">{AUTHOR}</span>
          <TypeBadge type={post.type} className="ml-1" />
        </div>
        <h3 className="mt-3 font-display font-extrabold text-xl sm:text-2xl leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
        {post.description && <p className="mt-2 text-slate-600 line-clamp-2 font-serif-read">{post.description}</p>}
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span>{meta(post)}</span>
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{t}</span>
          ))}
        </p>
      </div>
      <Thumb post={post} className="w-24 h-24 sm:w-40 sm:h-28 rounded-xl shrink-0 self-center" />
    </Link>
  );
}

function Featured({ post }) {
  return (
    <Link href={postUrl(post.slug)} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl border-[3px] border-ink bg-white p-4 sm:p-6 shadow-[8px_8px_0_#FF6B00] hover:-translate-y-1 transition-transform">
      <Thumb post={post} className="aspect-[16/10] rounded-2xl" />
      <div>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
          <TypeBadge type={post.type} /> Latest
        </p>
        <h2 className="mt-3 font-display font-black text-3xl sm:text-4xl leading-[1.05] group-hover:text-accent transition-colors">{post.title}</h2>
        {post.description && <p className="mt-3 text-lg text-slate-600 font-serif-read">{post.description}</p>}
        <p className="mt-4 text-sm text-slate-500">{meta(post)}</p>
      </div>
    </Link>
  );
}

function BlogHome() {
  const [filter, setFilter] = useState("all");
  useEffect(() => setMeta(`Blog · ${AUTHOR}`, "Notes and videos from Ankit Prajapati on AI, connected devices and building products."), []);
  const shown = filter === "all" ? POSTS : POSTS.filter((p) => p.type === filter);
  const [first, ...rest] = shown;

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8">
      <section className="pt-14 sm:pt-20 pb-10">
        <p className="inline-flex rounded-full bg-ink text-white px-3 py-1 font-mono text-xs uppercase tracking-[0.18em]">Blog & Vlog</p>
        <h1 className="mt-5 font-display font-black text-5xl sm:text-7xl leading-[0.95] tracking-tight">
          Notes from<br />the <span className="text-accent">build.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-600">
          I write about what I'm building: AI, connected devices and shipping real products. Sometimes I film it too.
        </p>
      </section>

      <div role="tablist" aria-label="Filter posts" className="flex gap-2 border-b border-slate-200 pb-4 mb-10">
        {FILTERS.map((f) => {
          const count = f.id === "all" ? POSTS.length : POSTS.filter((p) => p.type === f.id).length;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold transition-colors ${filter === f.id ? "bg-ink text-white" : "hover:bg-sun"}`}
            >
              {f.label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {!first ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center">
          <p className="font-display font-black text-3xl">{filter === "vlog" ? "Vlogs are coming soon 🎬" : "First post coming soon ✍️"}</p>
          <p className="mt-2 text-slate-600">Check back in a bit.</p>
        </div>
      ) : (
        <>
          <Featured post={first} />
          {rest.length > 0 && (
            <div className="mt-10 max-w-3xl">
              {rest.map((p) => <PostRow key={p.slug} post={p} />)}
            </div>
          )}
        </>
      )}
    </main>
  );
}

/* ---------- post page ---------- */

function ReadingProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div ref={bar} className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-40" style={{ transform: "scaleX(0)" }} aria-hidden />;
}

function Share({ post }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}${postUrl(post.slug)}`;
  const text = encodeURIComponent(post.title);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };
  const btn = "w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-ink hover:text-ink transition-colors";
  return (
    <div className="flex items-center gap-2">
      <a className={btn} href={`https://x.com/intent/post?text=${text}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="Share on X">
        <span className="font-bold text-sm leading-none">𝕏</span>
      </a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" title="Share on LinkedIn">
        <Linkedin className="w-4 h-4" />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link" title="Copy link">
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}

function Video({ url }) {
  const id = youtubeId(url);
  if (id) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden border-[3px] border-ink shadow-[6px_6px_0_#0A0A0A] bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title="Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  return <video src={url} controls className="w-full rounded-2xl border-[3px] border-ink bg-ink" />;
}

function PostPage({ post }) {
  const html = useMemo(() => marked.parse(post.body), [post.body]);
  const bodyRef = useRef(null);
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  useEffect(() => {
    setMeta(`${post.title} · ${AUTHOR}`, post.description);
    // Links to other sites open in a new tab.
    bodyRef.current?.querySelectorAll('a[href^="http"]').forEach((a) => {
      if (!a.href.startsWith(SITE)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    });
  }, [post]);

  return (
    <main>
      <ReadingProgress />
      <article className="max-w-[720px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> All posts
        </Link>
        <div className="mt-8"><TypeBadge type={post.type} /></div>
        <h1 className="mt-4 font-display font-black text-4xl sm:text-6xl leading-[1.02] tracking-tight">{post.title}</h1>
        {post.description && <p className="mt-4 text-xl sm:text-2xl text-slate-500 font-serif-read leading-snug">{post.description}</p>}

        <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-slate-200 py-4">
          <Avatar />
          <div className="text-sm">
            <p className="font-semibold">{AUTHOR}</p>
            <p className="text-slate-500">{meta(post)}</p>
          </div>
          <div className="ml-auto"><Share post={post} /></div>
        </div>

        {post.video ? (
          <div className="mt-10"><Video url={post.video} /></div>
        ) : post.cover ? (
          <img src={post.cover} alt="" className="mt-10 w-full rounded-2xl border-2 border-ink" />
        ) : null}

        <div
          ref={bodyRef}
          className="blog-prose prose prose-lg sm:prose-xl max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.tags.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((t) => <li key={t} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{t}</li>)}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6">
          <Avatar size="w-12 h-12 text-sm" />
          <div className="flex-1 min-w-[12rem]">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">Written by</p>
            <p className="font-display font-extrabold text-xl">{AUTHOR}</p>
            <p className="text-sm text-slate-600">AI, connected devices and full-stack. IIT Madras BS Data Science.</p>
          </div>
          <Share post={post} />
        </div>

        <div className="mt-10 rounded-3xl border-[3px] border-ink bg-sun p-6 sm:p-8 shadow-[6px_6px_0_#0A0A0A]">
          <p className="font-display font-black text-2xl sm:text-3xl leading-tight">Building something? Let's talk.</p>
          <p className="mt-2 text-ink/80">I'm open to internships, research and collaborations.</p>
          <a href="/#contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink text-white font-semibold px-5 py-3 hover:bg-accent transition-colors">
            See my portfolio <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </article>

      {more.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 mt-20">
          <h2 className="font-display font-black text-3xl">More from me</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {more.map((p) => (
              <Link key={p.slug} href={postUrl(p.slug)} className="group block rounded-2xl border-2 border-ink p-4 hover:shadow-[5px_5px_0_#FFC400] transition-shadow">
                <Thumb post={p} className="aspect-[16/9] rounded-xl" />
                <div className="mt-4"><TypeBadge type={p.type} /></div>
                <h3 className="mt-2 font-display font-extrabold text-xl leading-tight group-hover:text-accent">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{meta(p)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function NotFound() {
  useEffect(() => setMeta(`Not found · ${AUTHOR}`, ""), []);
  return (
    <main className="max-w-xl mx-auto px-5 py-32 text-center">
      <p className="font-display font-black text-6xl">404</p>
      <p className="mt-3 text-slate-600">This post doesn't exist, or it moved.</p>
      <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink text-white font-semibold px-5 py-3 hover:bg-accent">
        <ArrowLeft className="w-4 h-4" /> All posts
      </Link>
    </main>
  );
}

export default function BlogApp() {
  const path = usePath();
  const slug = decodeURIComponent(path.replace(/^\/blog\/?/, "").replace(/\/+$/, "").replace(/\/index\.html$/, "").replace(/^index\.html$/, ""));
  const post = slug ? POSTS.find((p) => p.slug === slug) : null;

  return (
    <div className="min-h-screen bg-white text-ink font-body">
      <Header />
      {!slug ? <BlogHome /> : post ? <PostPage key={post.slug} post={post} /> : <NotFound />}
      <Footer />
    </div>
  );
}
