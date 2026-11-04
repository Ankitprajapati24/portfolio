# portfolio.codebread.fun

Ankit Prajapati — Portfolio. Live at https://portfolio.codebread.fun

A one-page scrolling portfolio. "Know about me" scrolls through each section while my recorded voice (Sarvam AI) tells the story, with captions. Echo the pixel cat roams the page, a project store shows screenshots and live demos, and the music popup plays calm live radio or Spotify playlists.

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
```
The finished site is in `dist/`. It is fully static: no backend, no database.

## Deploy
Any static host works:
- **Vercel / Netlify / Cloudflare Pages:** connect the repo, build command `npm run build`, output folder `dist`.
- **Netlify Drop:** drag the `dist/` folder onto https://app.netlify.com/drop.

## Editing content
All text lives in `src/data/content.js`. Each section's `speak` field is what the voice reads.

## Voice (Sarvam AI)
"Know about me" plays recordings made with Sarvam AI. To make or update them:
1. Get an API key at https://dashboard.sarvam.ai (new accounts get free credit).
2. Create a file named `.env` next to `package.json` with one line: `SARVAM_API_KEY=your_key`
   (optional: `SARVAM_SPEAKER=shubh`, `SARVAM_MODEL=bulbul:v3`, `SARVAM_PACE=1`).
3. Run `npm run voice`. Audio is saved to `public/voice/`. Re-run after editing text in `content.js`; only changed lines are re-made.
`.env` is git-ignored, and the key is never shipped with the site. Lines without a recording use the browser's voice.

## Music
Edit `MUSIC.stations` in `src/data/content.js` to change the radio stations (HTTPS stream links, e.g. from radio-browser.info). Add Spotify song or playlist links to `MUSIC.spotify` to list them under "Top on Spotify".

## Blog & vlog (portfolio.codebread.fun/blog)

Every post is a Markdown file in `content/posts/`. The file name becomes the URL (`/blog/<file-name>`).

**Write in the browser:** open `portfolio.codebread.fun/admin`, sign in with GitHub, press **New Post**.
Only GitHub accounts with write access to this repo can sign in and publish. Publishing commits the post to
GitHub and Netlify rebuilds the site in about a minute.

**Write on your PC (no sign-in):** run `npm run dev` and `npm run cms` in two terminals, then open
`http://localhost:5173/admin/`. Commit and push the new file when you're happy.

Post settings (top of each file):

```yaml
---
title: My post
type: blog            # blog = written post, vlog = video post
date: 2026-11-04
description: One or two lines for the list and link previews.
cover: /assets/blog/my-image.jpg   # optional
video: https://youtu.be/XXXXXXXXXXX # vlogs: any YouTube link
tags: [AI, IoT]
draft: false          # true = saved but hidden on the live site
---
```

`npm run build` also writes a page per post with its own link preview (X, LinkedIn, WhatsApp) and an RSS feed at `/blog/rss.xml`.
