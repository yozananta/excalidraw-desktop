<div align="center">

# Excalidraw Desktop (Unofficial)

**A Windows desktop build of the open-source [Excalidraw](https://github.com/excalidraw/excalidraw) whiteboard, packaged with Electron.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Platform: Windows x64](https://img.shields.io/badge/platform-Windows%20x64-lightgrey)
![Electron 33](https://img.shields.io/badge/electron-33-47848f)
![Unofficial](https://img.shields.io/badge/status-unofficial%20community%20build-orange)

</div>

> [!IMPORTANT]
> **This is NOT the official Excalidraw, and I am not the author of Excalidraw.**
> Excalidraw is created and maintained by the [Excalidraw team and contributors](https://github.com/excalidraw/excalidraw/graphs/contributors) and is released under the MIT License.
> This repository is a personal, non-commercial project: a **fork/clone of the upstream source plus a small Electron wrapper** (the [`desktop/`](desktop) folder) so it can run as a standalone desktop app.
> It is not affiliated with, endorsed by, or sponsored by Excalidraw or Excalidraw+.
>
> 👉 For the official product, go to **https://excalidraw.com** · Upstream source: **https://github.com/excalidraw/excalidraw**

## What is this?

Excalidraw is a fantastic virtual hand-drawn style whiteboard. I wanted to use it as a normal desktop application (own window, own taskbar icon, no browser tab), so I wrapped the upstream web build in Electron. That wrapper is the only original work in this repo.

### What I added (the `desktop/` folder)

| File | Purpose |
| --- | --- |
| `desktop/main.js` | Electron main process. Serves the built web app through a custom `app://` protocol (stable origin, so your drawings in localStorage/IndexedDB persist), single-instance lock, opens external links in the default browser. |
| `desktop/preload.js` | Minimal, sandboxed context bridge (`contextIsolation` on, `nodeIntegration` off). |
| `desktop/package.json` | `electron-builder` config that produces a portable Windows `.exe`. |
| `desktop/icon.png` | App icon. |
| root `package.json` | Added the `desktop:install`, `desktop:dev`, `desktop:build` scripts. |

Everything else (`excalidraw-app/`, `packages/`, etc.) is upstream Excalidraw code, kept under its original MIT license.

## Download

Grab the latest portable `Excalidraw.exe` from the [**Releases**](../../releases) page. No installation needed, just run it.

> [!NOTE]
> The executable is **not code-signed**, so Windows SmartScreen may show an "unknown publisher" warning. Click **More info → Run anyway**, or build it yourself from source (below) if you prefer.

## Build from source

Requirements: Node.js ≥ 18 and Yarn 1.x.

```bash
# 1. install web app dependencies
yarn install

# 2. install desktop (Electron) dependencies
yarn desktop:install

# 3. run in development (builds the web app, then launches Electron)
yarn desktop:dev

# 4. produce the portable exe -> desktop/release/Excalidraw.exe
yarn desktop:build
```

## Good to know

- The web app is built with `VITE_APP_DISABLE_SENTRY=true` and `VITE_APP_ENABLE_TRACKING=false`, so no error reporting/analytics is added by this build.
- Features that depend on Excalidraw's public services (live collaboration, shareable links, the public library browser, AI features) still point to the **upstream endpoints** configured in `.env.production`. Please be considerate and don't abuse them.
- Drawings are stored locally in the app's data folder. Export your work (`.excalidraw` / PNG / SVG) regularly.
- Currently only **Windows x64 (portable)** is built and tested.

## Issues & support

- Problems with the **desktop wrapper** (packaging, window behaviour, icon, etc.): open an issue here.
- Problems with the **drawing editor itself**: please report them to the [upstream project](https://github.com/excalidraw/excalidraw/issues), not here.

## Credits & license

- **Excalidraw**: © 2020 Excalidraw contributors, MIT License. All credit for the editor goes to them. Original README: [docs/UPSTREAM_README.md](docs/UPSTREAM_README.md).
- **Desktop wrapper**: © 2026 yozananta, MIT License.
- "Excalidraw" and its logo belong to their respective owners; they are used here only to identify the upstream software.

See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) for details.

---

<details>
<summary>🇮🇩 Ringkasan Bahasa Indonesia</summary>

Ini **bukan** aplikasi resmi Excalidraw dan saya **bukan pembuat** Excalidraw. Repo ini adalah hasil clone project open-source Excalidraw (lisensi MIT) yang saya bungkus dengan Electron supaya bisa dipakai sebagai aplikasi desktop Windows. Satu-satunya kode buatan sendiri ada di folder `desktop/`. Semua kredit editor menjadi milik tim dan kontributor Excalidraw. Untuk produk resmi kunjungi https://excalidraw.com.

</details>
