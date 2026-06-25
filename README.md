# Pocket — website

Marketing site for **Pocket**, the rhythm trainer that grades your timing to the
millisecond. Static site, no build step: the `.jsx` files are transpiled in the
browser by Babel standalone at runtime.

## Live site

Deployed via GitHub Pages → **https://chrisfinns.github.io/pocketWebsite/**

## Pages

| File           | URL          | Purpose           |
| -------------- | ------------ | ----------------- |
| `index.html`   | `/`          | Landing page      |
| `docs.html`    | `/docs.html` | Docs & manual     |
| `contact.html` | `/contact.html` | Contact & support |
| `privacy.html` | `/privacy.html` | Privacy policy    |

`Pocket Landing Page (standalone).html` is a self-contained single-file copy of
the landing page (everything inlined) for sharing — it is not part of the
deployed multi-page site.

## Structure

- `*.html` — thin page shells that mount a React component.
- `*.jsx` — the actual page content/layout (fetched and compiled in-browser).
  - `landing-sections.jsx`, `pocket-docs.jsx`, `pocket-contact.jsx`,
    `pocket-privacy.jsx` — page bodies.
  - `pocket-chrome.jsx` — shared sub-page nav + footer.
- `_ds/` — the Pocket design system (tokens, styles, component bundle). Edit
  colors / type / spacing in `_ds/.../tokens/*.css`.
- `assets/` — logos and icons. `uploads/` — screenshots.

## Making tweaks

Edit the `.jsx` (layout/content) or the design tokens in `_ds/.../tokens/`, then
commit. No build or install required — just open `index.html` in a browser to
preview locally.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which uploads
the repo root to GitHub Pages. The `.nojekyll` file is required so Pages serves
the `_ds/` folder (Jekyll otherwise ignores `_`-prefixed directories).
