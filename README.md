# PDF Reader

A lightweight reader based on Mozilla's **official PDF.js viewer**, hosted on GitHub Pages.
No iframe, fork, custom renderer, npm install, or server.

**Site:** https://lunaluteus.github.io/pdf-reader/

## How it works

On each deployment, [GitHub Actions](.github/workflows/pages.yml) downloads the
official PDF.js release (**v6.5.438**) and publishes it to GitHub Pages.
Three small custom files support dark colors and Windows file association:

- [`colors.js`](colors.js) sets the native PDF.js viewer preferences
  `forcePageColors: true`, `pageColorsBackground: "#34363b"`,
  and `pageColorsForeground: "#bdc1c8"` before the viewer starts.
- [`dark.css`](dark.css) matches unrendered page placeholders to the dark background
  and displays a prompt when no file is open.
- [`launch.js`](launch.js) receives PDF files opened from Windows and passes them
  to the upstream PDF.js file-opening handler without replacing the viewer.

Unlike CSS inversion, PDF.js page recoloring aims to preserve images and figures.
It is a native foreground/background color override, not a guaranteed conversion of every PDF
element; some text, vector graphics, or backgrounds may retain their colors.
The viewer retains upstream support for selectable text, hyperlinks, search,
outlines, navigation, forms, printing, and drag-and-drop/file-picker opening.

The site starts without a sample document using `viewer.html?file=`.
Local PDFs stay in the browser and are not uploaded to a backend.

## Install as the Windows PDF handler

1. Open the site in **Microsoft Edge** or **Google Chrome** on Windows.
2. Use the browser's built-in **Install app** option (no extra in-page button).
3. In Windows **Settings → Apps → Default apps**, choose **PDF Reader** for `.pdf`.
   Alternatively, right-click a PDF and choose **Open with**.
4. Double-click a PDF to open it in the installed reader. The browser may ask
   for permission the first time it handles a local file.

The [PWA manifest](manifest.json), served with a JSON content type, registers the `.pdf` extension, and
the deployment generates app icons. No service worker is required for installation
in current Chromium browsers; **offline use is not guaranteed** because the
upstream viewer is not explicitly cached for offline access.

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

The Pages build checks that both the root entry page and the PDF.js viewer
reference the manifest, and that the file-handler configuration and icons exist.
