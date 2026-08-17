# PyGate — alternate docs

Docusaurus 3 documentation site for PyGate, deployed at
`https://alt-docs.payment.et`.

See [`Deploy.md`](./Deploy.md) for the Coolify deploy recipe.

## Local development

```bash
npm install
npm run dev      # http://localhost:3003
npm run build    # static export to ./build/
```

Requires Node 22+.

## Why this exists

This is a sibling of [`../doc`](../doc) (the primary Fumadocs + Next.js
site at `docs.payment.et`). It exists as a redundancy layer while the
primary site is being repaired, and as a fallback for the future.
