# Deploy — alternate docs (alt-docs.payment.et)

PyGate's **alternate** documentation site, built with **Docusaurus 3**
as a sibling of [`doc/`](../doc). It exists as a redundancy layer while
the primary `docs.payment.et` (a Fumadocs + Next.js site in [`doc/`](../doc))
is being repaired, and as a fallback for the future.

Built as a fully static export to `build/`.

## Public URL

`https://alt-docs.payment.et`

## Recommended: Coolify **Static Site** resource (no container)

This is the lightest deployment. Coolify runs the install + build
step and serves the resulting `build/` directory directly — no Node
runtime, no nginx, no container, no compose layer.

### Where the fields live in Coolify v4

When you click **+ New → Static Site**, the form has several tabs.
You'll use the **General** tab.

| UI field (General tab) | Value |
|---|---|
| Resource type | **Static Site** |
| Git Repository | `https://github.com/mulealem/alternate-docs.git` |
| Git Branch | `main` |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `build` |
| **Port** | leave blank (Static Sites don't expose a port) |
| **Domain** | `alt-docs.payment.et` (in the **Domains** tab, not General) |
| Build Arguments | leave empty (no env vars needed for v1) |

If your Coolify build is older and the form only shows Git
Repository / Branch / **Publish Directory** (no Build Command
field), see "Older Coolify versions" below — Coolify will auto-detect
`npm run build` from `package.json` in that case.

**Base Directory / Build Path:** the Static Site form does not have
this field in v4 — it always builds from the repo root. If you see
one anyway, set it to `/` (Docusaurus sits at the repo root, not in a
sub-folder).

### First deploy

1. Add the **Static Site** resource with the values above.
2. Deploy. Coolify will run `npm install && npm run build` and serve
   `build/` from a CDN-friendly origin.
3. Visit `https://alt-docs.payment.et` — you should see the PyGate
   alternate docs.

### Older Coolify versions (auto-detect mode)

If your Coolify build doesn't show an Install/Build Command field at
all, it infers them from `package.json` scripts:

- `npm install` — Coolify detects this as the install step.
- `npm run build` — this is the `build` script in
  `alternate-docs/package.json` (`"build": "docusaurus build"`).

The only field you can change in that mode is **Publish Directory**:
set it to `build`. Everything else Just Works.

### If you picked "Application" by mistake

Application uses a Dockerfile / docker-compose and does NOT have
Install/Build/Publish fields — it only has Build Path, Port, and
Healthcheck Path. **Delete the Application and re-add it as a Static
Site.** This site is designed for Static Site (no Dockerfile needed
for the happy path).

No environment variables are required by default. The Docusaurus
`url` is hardcoded to `https://alt-docs.payment.et` in
`docusaurus.config.ts`. If you ever serve from a different domain,
change `url` (and, if needed, `baseUrl`) in `docusaurus.config.ts`
and commit before the next deploy — Docusaurus bakes these into
absolute URLs at build time.

## Alternative: containerised (kept for parity)

If you must deploy via the **Application** resource type, this folder
also contains a Dockerfile that builds the same static export (`build/`)
and serves it with nginx on port 8080. Coolify config would be:

| Field | Value |
|---|---|
| Resource type | **Application** (Public) |
| **Build Path** | `/` (repo root) |
| **Port** | `8080` |
| **Healthcheck path** | `/` |
| **Domain** | `alt-docs.payment.et` |

> Static Site is preferred: it skips the Node runtime, removes one
> container, and gets you a CDN-friendly origin. It also avoids the
> `COOLIFY_URL` injection class of bugs that has historically broken
> containerised static sites on this Coolify instance.

## Local development

```bash
npm install
npm run dev          # http://localhost:3003
npm run build        # static export to ./build/
npm run serve        # serve the built site on http://localhost:3003
```

Node 22 required (matches `Dockerfile` base).

## Roll-forward

- Documentation updates are pure content. Push to the repo, redeploy.
- `package.json` declares `@docusaurus/*@^3.8.0` — Docusaurus 3 is the
  current LTS line. Bumping to Docusaurus 4 (when available) is a
  separate effort.

## Why this site exists

The primary docs site at `docs.payment.et` (a Fumadocs + Next.js 16
project under [`doc/`](../doc)) has been intermittently unreachable.
Rather than block on the upstream Coolify routing bug, we ship this
Docusaurus-based alternate as a fast, boring, deploy-anywhere fallback.
Once the primary site is healthy, both can coexist indefinitely.
