# Elijah Paulman — Portfolio

Next.js (App Router, TS, Tailwind v4) static-export portfolio, with a standalone weather app bundled under `/weather`.

## Project structure
- `src/app` — main site pages/components.
- `src/data` — JSON content (experience, projects, skills, socials, etc.).
- `public/` — static assets, fonts, resume, images. Weather app lives in `public/weather`.
- `.github/workflows/deploy.yml` — GitHub Pages deploy pipeline (builds `out/`).
 
## Running locally
```bash
npm install
npm run dev          # http://localhost:3000
```
The weather app is served from `http://localhost:3000/weather`.

## Build & export
```bash
npm run build        # outputs static site to ./out (includes /weather)
```
`next.config.ts` is set to `output: "export"` with unoptimized images for GitHub Pages compatibility.

## Deployment (GitHub Pages)
- Push to `main` (or `master`) to trigger `.github/workflows/deploy.yml`.
- Workflow runs `npm run build` and publishes `./out` to Pages.
- Site URL: `https://<user>.github.io/<repo>/` (weather at `/weather/`). If you deploy to a user/org root, no basePath is needed.

## Content updates
- Edit JSON in `src/data/*.json` to update experience, projects, skills, socials, and personal info.
- Resume file is in `public/Resumes/`; update the PDF and ensure `socials.json` points to it.

## Tooling
- `npm run lint` — ESLint (Next.js core web vitals config). Weather JS is ignored in lint via `eslint.config.mjs`.

## Notes
- Weather app uses OpenWeatherMap API and lives entirely in `public/weather/` so it ships with the static export.
- Images/fonts are unoptimized for export; if you switch hosts (e.g., Vercel), you can re-enable Next image optimization.
