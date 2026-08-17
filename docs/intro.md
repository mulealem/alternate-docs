---
slug: /
title: Introduction
sidebar_position: 1
---

# PyGate

Payment infrastructure for the Ethiopian market. PyGate provides hosted
checkout, a dashboard, and APIs that accept Chapa, Telebirr, CBE Birr,
and international cards.

:::info Alternate docs site
This is the **alternate** PyGate documentation site, built with
[Docusaurus 3](https://docusaurus.io). It is a sibling of the primary
`docs.payment.et` site and exists as a redundancy layer while the
primary site is being repaired.

Content here mirrors the structure of the primary site. Once the
primary site is healthy, this site can be retired or kept as a
fallback.
:::

## What PyGate gives you

- **Hosted Checkout** — drop-in payment page at `checkout.payment.et`.
  Accept Birr and cards without writing backend code.
- **Dashboard** — at `dashboard.payment.et`. Manage merchants, view
  transactions, issue refunds.
- **Webhooks** — every state transition is delivered as a signed
  webhook event.
- **REST API + SDKs** — Node, Python, and Go SDKs generated from the
  same OpenAPI spec the dashboard consumes.

## Where to go next

- [Quickstart →](./quickstart) — make your first charge in 5 minutes.
- [API Reference →](./api-reference) — every endpoint, every field.
- [Hosted Checkout →](./checkout) — the hosted payment page.
- [Webhooks →](./webhooks) — event delivery and signing.
- [Security →](./security) — how we handle keys, signatures, and PII.
