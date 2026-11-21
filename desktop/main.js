const { app, BrowserWindow, protocol, net, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const SCHEME = "app";
const HOST = "excalidraw";

// The Vite build uses absolute asset paths ("/assets/..."), which don't work
// with file://. Serving it through a custom, stable-origin protocol keeps
// those paths working and preserves localStorage/IndexedDB across launches.
protocol.registerSchemesAsPrivileged([
  {
    scheme: SCHEME,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
]);

const getBuildDir = () =>
  app.isPackaged
    ? path.join(process.resourcesPath, "app-build")
    : path.join(__dirname, "..", "excalidraw-app", "build");

const registerAppProtocol = () => {
  const buildDir = path.resolve(getBuildDir());

  protocol.handle(SCHEME, (request) => {
    const { pathname } = new URL(request.url);
    let relPath = decodeURIComponent(pathname);
    if (relPath === "/" || relPath === "") {
      relPath = "/index.html";
    }

    const filePath = path.resolve(path.join(buildDir, relPath));
    // prevent path traversal outside of the build dir
    if (!filePath.startsWith(buildDir)) {
      return new Response("Forbidden", { status: 403 });
    }

    let target = filePath;
    if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      // SPA fallback for extension-less routes, 404 for missing assets
      if (path.extname(relPath)) {
        return new Response("Not found", { status: 404 });
      }
      target = path.join(buildDir, "index.html");
    }

    return net.fetch(pathToFileURL(target).toString());
  });
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "Excalidraw",
    icon: path.join(__dirname, "icon.png"),
    backgroundColor: "#ffffff",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  // open external links in the default browser instead of inside the app
  const isInternal = (url) => url.startsWith(`${SCHEME}://${HOST}`);
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!isInternal(url)) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (!isInternal(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.loadURL(`${SCHEME}://${HOST}/`);
};

// single instance: focus existing window instead of opening a second one
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  });

  app.whenReady().then(() => {
    registerAppProtocol();
    Menu.setApplicationMenu(null);
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
