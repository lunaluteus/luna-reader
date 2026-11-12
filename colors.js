// Apply PDF.js's built-in foreground/background recoloring before viewer.mjs initializes.
// The generic viewer reads these settings from "pdfjs.preferences" in localStorage.
try {
  const key = "pdfjs.preferences";
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  const prefs = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  Object.assign(prefs, {
    forcePageColors: true,
    pageColorsBackground: "#34363b",
    pageColorsForeground: "#bdc1c8",
  });
  localStorage.setItem(key, JSON.stringify(prefs));
  document.documentElement.classList.add("native-page-colors");
} catch (error) {
  console.warn("Could not enable PDF.js page colors; using original colors.", error);
}
