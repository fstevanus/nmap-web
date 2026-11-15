---
name: Bug Report
about: Report a bug
title: "[BUG] "
labels: bug
---

## Description

<!-- A clear description of what the bug is. -->

## Steps to Reproduce

1.
2.
3.

## Expected Behavior

<!-- What you expected to happen. -->

## Actual Behavior

<!-- What actually happened. -->

## Environment

- **Deployment method:** <!-- pick one -->
  - [ ] Docker Hub image (`fstevanus/nmap-web:latest` or pinned tag)
  - [ ] Docker Compose rootful (`docker-compose.yml`, host networking)
  - [ ] Docker Compose rootless (`docker-compose.rootless.yml`, port-mapped + caps)
  - [ ] Local npm (`npm start`)
- **OS:** <!-- e.g. Ubuntu 24.04, macOS 14, Windows 11 -->
- **nmap version:** <!-- `nmap -V` -->
- **Node version:** <!-- `node -v` — only relevant for local npm; otherwise the image's bundled version -->

## Logs / Screenshots

<!--
Paste relevant log output (nmap stderr, server console, browser console) inside
a code block, and attach screenshots if helpful. If you can, include the scan
request (preset/options/targets) that triggered the issue.
-->

```

```

## Additional context

<!-- Anything else that might help: compose overrides, env vars set
(NMAP_UI_TOKEN, NMAP_UI_HOST, …), whether you ran rootful vs rootless, etc. -->
