---
title: API Reference
sidebar_position: 4
---

# API Reference

:::note Placeholder content
Stub. The full reference lives at the primary site
(`docs.payment.et/api-reference`) and on the OpenAPI page of the
PyGate dashboard.
:::

## Base URL

```
https://api.payment.et/v1
```

## Authentication

All requests require a bearer token in the `Authorization` header:

```
Authorization: Bearer pk_live_...
```

## Endpoints (summary)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/payments` | Create a payment and get a redirect URL. |
| `GET`  | `/payments/{id}` | Look up a payment. |
| `POST` | `/payments/{id}/refund` | Refund a captured payment (full or partial). |
| `GET`  | `/webhooks/events` | List webhook delivery attempts (dashboard only). |
