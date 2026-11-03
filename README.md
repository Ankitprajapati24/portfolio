# Ankit Prajapati — The Interview (portfolio)

Source recovered from the Emergent preview build, made to run as a static site.

## Build
`./build.sh` → writes the site to `dist/` (no npm needed: Bun bundles the app, libraries load from jsDelivr, Tailwind runs from its CDN).
If you have npm, you can also run `npm install && npm run dev` with the Vite config.

## Deploy
Upload the `dist/` folder to any static host (Netlify Drop, GitHub Pages, Vercel, Cloudflare Pages).

## Changes from the Emergent version
- Echo answers questions from the portfolio content in the browser (the Emergent AI backend is not available outside Emergent).
- Voice uses the browser's own speech recognition and speech (Chrome/Edge work best).
