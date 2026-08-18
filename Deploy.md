# Deploy — alternate docs (alt-docs.payment.et)

PyGate's **alternate** documentation site, built with **Docusaurus 3**
as a sibling of [`doc/`](../doc). It exists as a redundancy layer while
the primary `docs.payment.et` (a Fumadocs + Next.js site in [`doc/`](../doc))
is being repaired, and as a fallback for the future.

Deployed as a **Coolify Application** — a single `Dockerfile` does the
entire build (npm install + Docusaurus build) and serves the static
export via nginx. **No Build Command field needed in the Coolify UI**;
just point Coolify at the repo and set Port to 8080.

## Public URL

`https://alt-docs.payment.et`

## Deploy: Coolify **Application** (Dockerfile) — recommended

This is the simplest deploy. The repo ships a `Dockerfile` that does
everything:

- Builder stage: `node:22-alpine`, installs dependencies with
  `npm ci` (falls back to `npm install` if the lockfile ever drifts),
  runs `npm run build` (Docusaurus emits the static site to `build/`).
- Runner stage: `nginx:alpine`, copies `build/` into nginx's html root,
  applies a tiny `nginx.conf` that listens on **both 80 and 8080** (so
  the Coolify "Port" field can be either value).
- Healthcheck: `wget --spider http://127.0.0.1:8080/` every 30s.

### Coolify UI steps

1. **Add Resource → Application** (Public).
2. Fill in:

   | Field | Value |
   |---|---|
   | Resource type | **Application** |
   | Git Repository | `https://github.com/mulealem/alternate-docs.git` |
   | Branch | `main` |
   | **Build Pack** | `Dockerfile` (NOT `Docker Compose`, NOT `Nixpacks`) |
   | **Port** | `80` or `8080` — both work; the image's nginx listens on both |
   | **Healthcheck Path** | `/` |
   | **Domain** | `alt-docs.payment.et` |

   That's the entire config — no Install Command, no Build Command, no
   Publish Directory, no Base Directory. The Dockerfile handles all of
   it.

3. Click **Deploy**. Coolify will build the image (≈3–4 min on first
   run, faster with BuildKit cache), start the container, and serve
   the static export on `https://alt-docs.payment.et`.

### Why this works when Static Site UI fields are missing

Coolify's Application flow only ever needs four fields: Git repo,
Build Pack (Dockerfile vs Compose vs Nixpacks), Port, and Healthcheck.
No extra text boxes to fill in, no UI surprises. The Dockerfile
literally `RUN npm install && npm run build` during the image build,
so the static export is **baked into the image** — Coolify never has
to run a build step at request time, and the runtime container is
just nginx serving files.

### Verify after deploy

```bash
curl -sS -I --max-time 10 https://alt-docs.payment.et/
# → expect: HTTP/1.1 200 OK
# → expect body: real HTML with <title>PyGate Docs</title>

curl -sS --max-time 10 https://alt-docs.payment.et/quickstart/
# → expect: 200 OK with the Quickstart page

docker logs <container-id> 2>&1 | tail -20
# → expect: "GET / HTTP/1.1 200" lines from nginx access log
```

## Why we ship a Dockerfile (and not a Static Site resource)

Coolify's **Static Site** UI on v4.x exposes the build step through
separate **Install Command** and **Build Command** text fields. If
your Coolify build doesn't surface those fields (some v4 versions hide
them), the Static Site form becomes unusable because there's no place
to tell Coolify to run `npm install && npm run build` before
publishing `build/`.

Shipping a Dockerfile makes the entire build a property of the **image**
Coolify builds — no UI text fields involved. The container that boots
is nginx serving `build/`, which is exactly what Static Site would
have done anyway, with one extra container.

The trade-off is: one container + one TLS hop instead of a CDN-friendly
origin. For an internal-ish docs fallback at low traffic, this is
fine. If you ever want to switch to a Static Site, the same repo will
work — see "Migrating to a Static Site later" below.

## Migrating to a Static Site later

If/when a Coolify version exposes the Build Command field again (or
you move to a Coolify instance that does), this same repo can be
re-deployed as a Static Site with these fields:

| Field | Value |
|---|---|
| Resource type | **Static Site** |
| Git Repository | `https://github.com/mulealem/alternate-docs.git` |
| Branch | `main` |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `build` |
| **Domain** | `alt-docs.payment.et` |

The `Dockerfile` and `docker-compose.yml` can stay in the repo (they're
harmless); the Static Site deployment simply ignores them.

## Local development

```bash
npm install
npm run dev          # http://localhost:3003
npm run build        # static export to ./build/
docker build -t alternate-docs-test .  # build the production image
docker run --rm -p 8080:8080 alternate-docs-test   # serve on http://localhost:8080
```

Node 22 required (matches `Dockerfile` base).

## Roll-forward

- Documentation updates are pure content. Push to the repo, redeploy
  (Application redeploys re-pull + rebuild the image; ~1 min cold).
- Bumping Docusaurus: see Docusaurus 3 release notes; the Dockerfile
  needs no changes for minor version bumps.

## Why this site exists

The primary docs site at `docs.payment.et` (a Fumadocs + Next.js 16
project under [`doc/`](../doc)) has been intermittently unreachable.
Rather than block on the upstream Coolify routing bug, we ship this
Docusaurus-based alternate as a fast, boring, deploy-anywhere fallback.
Once the primary site is healthy, both can coexist indefinitely.
