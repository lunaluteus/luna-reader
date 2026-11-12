# PDF Reader

A simple PDF reader using Mozilla's **official PDF.js viewer**, hosted on GitHub Pages.
No fork, iframe, custom renderer, npm install, or server.

**Site:** https://lunaluteus.github.io/pdf-reader/

## How it works

On each deployment, [GitHub Actions](.github/workflows/pages.yml) downloads a pinned
official PDF.js prebuilt release (**v6.5.438**), adds one [CSS file](dark.css)
to invert rendered PDF pages, and publishes the distribution to GitHub Pages.
The upstream viewer provides text selection, search, links, outlines, navigation,
forms, printing, and drag-and-drop/file-picker opening.

The site starts with no sample PDF using `viewer.html?file=`. Local PDFs are
opened by the browser, not uploaded to a server.

## GitHub Pages setup

In **Settings → Pages → Build and deployment**, select **GitHub Actions**
as the source. The workflow then deploys from pushes to `main` or can be run
manually under **Actions → Deploy PDF Reader**.

## Customization

Only [`dark.css`](dark.css) is custom viewer code. It uses whole-page inversion,
so embedded images and colored figures are inverted too. To change the upstream
release, edit `PDFJS_VERSION` in the workflow.

The viewer is produced only in the Pages deployment artifact, not checked into
the repository. The original PDF.js license is included in the downloaded
distribution.
