# Security Policy

## Supported Versions

This project follows semantic versioning. Security fixes are applied to the
latest release line only.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.** Public
issues can expose the flaw to attackers before a fix is available.

Please report security issues privately:

1. **Preferred:** use GitHub's private vulnerability reporting —
   [Report a vulnerability](https://github.com/fstevanus/nmap-web/security/advisories/new)
   (Security tab → "Report a vulnerability").
2. **Alternatively,** email the maintainer directly — see the `author` field in
   [`package.json`](./package.json) (maintainer: `fstevanus`). If no author
   email is listed there, use the GitHub private reporting route above.

When reporting, please include:

- A clear description of the issue and its impact.
- Steps to reproduce (commands, config, payload).
- Affected version / image tag (e.g. `1.0.0`, `latest`).
- Any suggested fix or mitigation.

### Response Timeframe

- **Acknowledgment:** within **48–72 hours** of the initial report.
- **Status update / triage outcome:** within **7 days**, indicating whether the
  issue is accepted, declined, or needs more information.
- A fix or mitigation is prioritized by severity and published in a patch
  release as soon as practical, with a GitHub Security Advisory and release
  notes.

Please do not disclose the issue publicly until a fix has been released and
you've been notified, or 90 days have elapsed since the report.

## Security Context

nmap-web is a web front-end around **nmap**, a network scanner. Depending on
the deployment it may run with elevated privileges:

- On **Linux with host networking**, the container runs **as root** and shares
  the host network stack — equivalent to running nmap directly on the host
  (SYN scans, ARP discovery, OS fingerprinting).
- On **macOS/Windows or rootless Podman**, the container runs in its own
  network namespace with `NET_RAW` / `NET_ADMIN` capabilities granted for raw
  sockets.

Because raw-socket and root-level access are core to its function, treat any
deployment of nmap-web as a privileged tool. By default the UI binds to
`127.0.0.1` (localhost only). If you bind `0.0.0.0` to expose it to other
machines, **always set `NMAP_UI_TOKEN`** and consider placing it behind a
reverse proxy with TLS and real authentication.

### Authorized Use Only

**Only scan networks and hosts that you own or have explicit, written
permission to test.** Unauthorized port scanning may be illegal in your
jurisdiction and can violate acceptable-use policies, terms of service, or
computer-misuse laws. The maintainers take no responsibility for misuse of
this tool.

## Scope

### In Scope

Vulnerabilities in the nmap-web project itself, including:

- The **web UI** and any client-side rendering (e.g. XSS via scan output or
  user input — note that scan-derived strings must pass through `esc()` /
  `escAttr()`).
- The **HTTP REST API** and **WebSocket** endpoint (live progress, cancel).
- **Authentication / authorization** — the optional bearer token
  (`NMAP_UI_TOKEN`), token handling on the API and WebSocket, and bind-address
  defaults.
- The **Docker/Podman image** and compose files — container configuration,
  capability grants (`NET_RAW`/`NET_ADMIN`), volume mounts, file permissions,
  and the entrypoint.
- Scan **argument building** (`lib/args.js`) where it could enable command
  injection, argument injection, or unintended nmap behavior.
- **History/storage** (`lib/store.js`) — path traversal, data leakage.

### Out of Scope

- **nmap itself** — report nmap vulnerabilities upstream to the
  [nmap project](https://nmap.org/). nmap-web is a UI wrapper and does not
  maintain the scanner.
- **The host operating system, kernel, or Docker/Podman runtime** — these are
  outside this project's control.
- Scans you are not authorized to perform, or damage caused by misuse.
- Self-XSS or issues requiring physical access to an already-trusted local
  machine running the default `127.0.0.1` binding with no token set.
- Vulnerabilities in third-party dependencies that have no viable exploitation
  path within nmap-web (report those upstream to the dependency maintainers).
