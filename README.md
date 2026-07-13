# MAI Research Website

Website for the Medical Artificial Intelligence Research Group at King's College London.

The site uses a dynamic content structure: routine updates to team members, projects, and publications are made through JSON files in `data/`. Content editors should not need to change HTML, CSS, or React components.

## Directory structure

```text
.
├── data/
│   ├── projects.json       # Project cards and optional project-detail content
│   ├── publications.json   # Generated from Google Scholar; do not edit manually
│   ├── team.json           # Team profiles and avatar references
│   └── README.md           # Short content-editing reference
├── scripts/
│   ├── sync-scholar.js     # Generates data/publications.json
│   ├── validate-data.js    # Validates JSON content and referenced images
│   └── test-method-demo.mjs
├── public/
│   └── images/             # Team and project image assets
├── components/             # React presentation components
├── content.ts              # Runtime JSON loader and data adapters
├── App.tsx                 # Page composition and routing
└── .github/workflows/
    ├── deploy.yml          # Scholar sync, validation, build, and Pages deployment
    └── sync-scholar.yml    # Scheduled Scholar generation and source-data commit
```

Files such as `package.json`, `package-lock.json`, and `tsconfig.json` are tooling configuration rather than website content, so they remain at the repository root. All website content JSON belongs in `data/`.

## Updating team members

1. Add or update the profile in `data/team.json`.
2. Put the avatar in `public/images/`.
3. Set the JSON `image` field to a path relative to `public/`, for example `images/zina.png`.
4. Run `npm run validate:data`.

No HTML or CSS changes are required.

## Updating projects

Edit `data/projects.json`. Project text, images, links, card presentation, internal routes and redirects, visibility (`hidden`), and optional detail-page content are stored there. New project images belong in `public/images/`.

Run `npm run validate:data` after editing. No HTML or CSS changes are required for routine project updates.

## Updating publications

Do not edit `data/publications.json` manually. It is generated from Google Scholar by `scripts/sync-scholar.js`.

1. Copy `.env.example` to `.env.local`.
2. Set `SERPAPI_KEY` and `SCHOLAR_USER_ID`.
3. Run:

```bash
npm run sync:scholar
npm run validate:data
```

The GitHub Pages workflow runs the same Scholar sync before deployment when repository secrets named `SERPAPI_KEY` and `SCHOLAR_USER_ID` are configured. If those secrets are absent, deployment safely uses the committed generated file.

`.github/workflows/sync-scholar.yml` runs every Monday at 04:17 UTC and can also be started manually. It regenerates `data/publications.json`, validates it, and commits the file back to `main` when Scholar data changes. This keeps both the deployed website and the repository data current without manual publication editing.

Direct PDF discovery is not currently automated; publication links come from the Scholar response.

## Local development

```bash
npm ci
npm run dev
```

Before opening a pull request or pushing a content update, run:

```bash
npm run check
```

`npm run check` validates the data and creates a production build.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which validates the data, builds the Vite site, and deploys `dist/` to GitHub Pages.
