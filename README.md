# portfolio.codebread.fun

Ankit Prajapati — Portfolio. Live at https://portfolio.codebread.fun

A one-page scrolling portfolio. "Know about me" reads each section aloud in first person (browser voice) and scrolls along with captions. Echo the pixel cat roams the page, and soft background music is generated live with Web Audio.

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
