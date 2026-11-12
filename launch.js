// Handle Windows "Open with PDF Reader" launches through the upstream
// PDF.js file-opening event, preserving its usual navigation and title behavior.
if ("launchQueue" in window) {
  const viewerReady = new Promise(resolve => {
    if (window.PDFViewerApplication) {
      resolve(window.PDFViewerApplication);
    } else {
      document.addEventListener(
        "webviewerloaded",
        () => resolve(window.PDFViewerApplication),
        { once: true }
      );
    }
  });

  window.launchQueue.setConsumer(async ({ files }) => {
    if (!files?.length) return;
    try {
      const file = await files[0].getFile();
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return;
      }
      const app = await viewerReady;
      await app.initializedPromise;
      app.eventBus.dispatch("fileinputchange", {
        source: window,
        fileInput: { files: [file] },
      });
    } catch (error) {
      console.error("Unable to open PDF from Windows:", error);
    }
  });
}
