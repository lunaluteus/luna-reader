# Luna Reader

A minimal dark-mode PDF reader based on [PDF.js](https://github.com/mozilla/pdf.js).

**[Open Luna Reader](https://lunaluteus.github.io/luna-reader/)**

Drop a PDF into the viewer or use **Open**. Files stay on your device.

## Install on Windows

Install the site as an app in Chrome or Edge. To make it the default PDF reader, select **Luna Reader** for `.pdf` in Windows **Settings → Apps → Default apps**.

## Deploy

Set **Settings → Pages → Source** to **GitHub Actions**. Pushing to `main` publishes the site.

The [workflow](.github/workflows/pages.yml) downloads PDF.js v6.5.438; [build.py](build.py) adds the [dark palette and file handling](app.js), [styles](dark.css), and [PWA manifest](manifest.json).
