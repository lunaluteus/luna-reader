# PDF Reader

A lightweight reader based on Mozilla's **official PDF.js viewer**, hosted on GitHub Pages.
No iframe, fork, custom renderer, npm install, or server.

**Site:** https://lunaluteus.github.io/pdf-reader/

## How it works

On each deployment, [GitHub Actions](.github/workflows/pages.yml) downloads the
official PDF.js release (**v6.5.438**) and publishes it to GitHub Pages.
Only two small custom files are injected into the viewer:

- [`colors.js`](colors.js) sets the native PDF.js viewer preferences
  `forcePageColors: true`, `pageColorsBackground: "#34363b"`,
  and `pageColorsForeground: "#bdc1c8"` before the viewer starts.
- [`dark.css`](dark.css) matches unrendered page placeholders to the dark background
  and displays a prompt when no file is open.

Unlike CSS inversion, PDF.js page recoloring aims to preserve images and figures.
It is a native foreground/background color override, not a guaranteed conversion of every PDF
element; some text, vector graphics, or backgrounds may retain their colors.
The viewer retains upstream support for selectable text, hyperlinks, search,
outlines, navigation, forms, printing, and drag-and-drop/file-picker opening.

The site starts without a sample document using `viewer.html?file=`.
Local PDFs stay in the browser and are not uploaded to a backend.

## GitHub Pages setup

In **Settings → Pages → Build and deployment**, select **GitHub Actions** as
the source. Pushes to `main` trigger deployment; the workflow can also
be run manually in **Actions → Deploy PDF Reader**.

## Customization

Change the colors in [`colors.js`](colors.js) and the matching placeholder
background in [`dark.css`](dark.css). The browser's other saved PDF.js
preferences are preserved. Colors are enforced on each page load.

To update PDF.js, change `PDFJS_VERSION` in the workflow. The viewer files
exist only in the Pages deployment artifact; none are checked into this repository.
