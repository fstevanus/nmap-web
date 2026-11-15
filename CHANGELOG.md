# Changelog

All notable changes to **nmap-web** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Dates follow [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) (`YYYY-MM-DD`).

## [1.0.0] - 2026-11-14

### Added
- Web UI for nmap — run scans from the browser with a dark, Zenmap-inspired interface.
- Zenmap-style presets (Quick, Intense, Ping sweep, Full port, Vuln scan, Slow comprehensive, Custom).
- Live scan progress over WebSocket — stats lines, % complete, progress bar, colorized terminal log, cancel anytime.
- Structured, parsed results — hosts, ports with service/version banners, NSE script output, OS detection, traceroute, summary stats.
- Scan history persistence across restarts, with re-open of past scans.
- Export of raw nmap XML and plain-text output.
- Docker support for both rootful (host networking) and rootless (port-mapped, `NET_RAW`/`NET_ADMIN` caps) deployments.
- Bearer token authentication (`NMAP_UI_TOKEN`), sent as `X-Auth-Token` header (API) / `?token=` (WebSocket).
- Multi-arch Docker images for `amd64` and `arm64`.

### Security
- Binds to `127.0.0.1` (localhost) by default so the UI is reachable only from the local machine.
- Optional bearer token auth (`NMAP_UI_TOKEN`) recommended whenever the bind address is changed to `0.0.0.0` or exposed beyond localhost.

[Unreleased]: https://github.com/fstevanus/nmap-web/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/fstevanus/nmap-web/releases/tag/v1.0.0
