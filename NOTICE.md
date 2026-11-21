# Notice & Attribution

## Upstream software

This project contains source code from **Excalidraw** (https://github.com/excalidraw/excalidraw),
Copyright (c) 2020 Excalidraw, distributed under the **MIT License** (see [LICENSE](LICENSE)).

The upstream copyright and license notice are retained as required by the MIT License.

## What is original in this repository

Only the Electron wrapper in the [`desktop/`](desktop) folder, the `desktop:*` scripts in the root
`package.json`, and the repository documentation (README, NOTICE, CHANGELOG) were written by
yozananta, also under the MIT License.

## Modifications to upstream

- Upstream README moved to `docs/UPSTREAM_README.md`.
- Removed files unrelated to the desktop build: upstream CI/CD workflows, funding config, Docker/Codesandbox/Crowdin/Husky
  configs, the `dev-docs` site, `firebase-project`, and AI-assistant instruction files.
- Root `package.json`: added `desktop:install`, `desktop:dev`, `desktop:build` scripts.

## Trademarks & affiliation

"Excalidraw" and the Excalidraw logo are the property of their respective owners. This is an
**unofficial, non-commercial** community build and is **not affiliated with, endorsed by, or
sponsored by** Excalidraw or Excalidraw+. Names are used only to identify the upstream software.

## Third-party components

Electron (MIT) and electron-builder (MIT), plus the upstream dependencies listed in the
`package.json` / `yarn.lock` files, each under their own licenses.

## Takedown / contact

If you are a rights holder and have a concern about this repository, please open an issue and it
will be addressed promptly.
