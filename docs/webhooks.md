---
title: Webhooks
sidebar_position: 6
---

# Webhooks

Every state transition on a payment is delivered as a signed JSON
event to your configured webhook URL.

:::note Placeholder content
Stub. See the primary site for the full event schema, signature
verification snippet, retry policy, and idempotency guidance.
:::

## Event types

- `payment.created`
- `payment.succeeded`
- `payment.failed`
- `payment.expired`
- `refund.created`
- `refund.succeeded`

## Signature verification

Every webhook carries an `X-PyGate-Signature` header of the form:

```
t=<unix-timestamp>,v1=<hex-hmac-sha256>
```

Verify by recomputing `HMAC_SHA256(secret, "<t>.<raw-body>")` and
constant-time-comparing against `v1`. Reject if `t` is older than 5
minutes (replay protection).
