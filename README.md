# PDF Reader

A lightweight, browser-only PDF reader with native PDF.js dark-page rendering.

Open `index.html` on GitHub Pages. Drag a PDF into the start screen (or click to choose one); the file stays on your device.

## Features

- Drag-and-drop or file picker to open local PDFs
- Dark and original page colors using PDF.js `pageColors`
- Continuous, lazy-rendered pages, page navigation, and zoom
- Static HTML/CSS/JavaScript; no server, account, build step, or PDF upload

## Deployment

Enable **Settings → Pages → Build and deployment → Deploy from a branch**, selecting `main` and `/ (root)`. The site will be served at `https://lunaluteus.github.io/pdf-reader/`.

PDF.js is loaded from a pinned jsDelivr CDN release, so an internet connection is required to load the library. Uploaded PDFs are processed locally in the browser and are not sent to a server.

## Development

Serve the repository with any static HTTP server (for example, `python -m http.server 8000`), then open `http://localhost:8000`. No install step is required.
