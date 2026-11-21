# Changelog

All notable changes to this desktop build are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/).

## [1.0.0] - 2026-11-21

### Added
- Electron wrapper (`desktop/`) around the upstream Excalidraw web app.
- Custom `app://` protocol with stable origin so local data persists between launches.
- Single-instance lock, external links open in the default browser.
- Sandboxed renderer (`contextIsolation`, no `nodeIntegration`).
- Portable Windows x64 build (`Excalidraw.exe`) via electron-builder.
- Project documentation: README, NOTICE, CHANGELOG.
