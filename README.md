# Luna Reader

A minimal dark-mode PDF reader based on [PDF.js](https://github.com/mozilla/pdf.js).

**[Open Luna Reader](https://lunaluteus.github.io/luna-reader/)**

Drop a PDF into the viewer or use **Open**. Files stay on your device.

## Install as an App

Luna Reader can be installed as an [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app), which allows you to register Luna Reader as a PDF file handler for your system. Typically, an install button should appear in the address bar when you open this site.

## Deploy

The GitHub Actions [workflow](.github/workflows/pages.yml) downloads PDF.js. [build.py](build.py) adds the [dark palette and file handling](app.js), [styles](dark.css), and [PWA manifest](manifest.json). Then they are published to GitHub Pages.
