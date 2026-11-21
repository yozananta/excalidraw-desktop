const { contextBridge } = require("electron");

// Minimal, safe bridge. Extend here if native features are needed later.
contextBridge.exposeInMainWorld("excalidrawDesktop", {
  isDesktop: true,
  platform: process.platform,
});
