// Configure PDF.js colors before the viewer starts.
try {
  const key = "pdfjs.preferences";
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  localStorage.setItem(key, JSON.stringify({
    ...saved,
    forcePageColors: true,
    pageColorsBackground: "#34363b",
    pageColorsForeground: "#bdc1c8",
  }));
  document.documentElement.classList.add("native-page-colors");
} catch (error) {
  console.warn("PDF.js color preferences unavailable:", error);
}

// Pass files launched from Windows to the upstream viewer.
if ("launchQueue" in window) {
  const ready = new Promise(resolve => {
    document.addEventListener(
      "webviewerloaded",
      () => resolve(window.PDFViewerApplication),
      { once: true }
    );
  });

  window.launchQueue.setConsumer(async ({ files }) => {
    if (!files?.length) return;
    const file = await files[0].getFile();
    const app = await ready;
    await app.initializedPromise;
    app.eventBus.dispatch("fileinputchange", {
      source: window,
      fileInput: { files: [file] },
    });
  });
}
