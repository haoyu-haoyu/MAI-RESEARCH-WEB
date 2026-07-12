# Website content data

The website loads its content from this folder at runtime. Routine content updates should not require changes to HTML, CSS, or React components.

- Edit `team.json` to add or update team profiles.
- Edit `projects.json` to add or update projects and optional project-detail content.
- Do not hand-edit `publications.json`; regenerate it with `npm run sync:scholar` after setting `SERPAPI_KEY` and `SCHOLAR_USER_ID` in the environment, `.env.local`, or `.env`.

Image paths are relative to `public/`, for example `images/zina.png` resolves to `public/images/zina.png`. Run `npm run validate:data` before committing content changes.

The GitHub Pages workflow runs the Scholar sync before each deployment when repository secrets named `SERPAPI_KEY` and `SCHOLAR_USER_ID` are configured. The separate `sync-scholar.yml` workflow runs weekly, regenerates this file, and commits changes back to `main`. If either secret is absent, deployment safely uses the committed `publications.json` instead.
