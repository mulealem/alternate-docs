---
title: Concepts
sidebar_position: 3
---

# Concepts

The mental model behind PyGate.

:::note Placeholder content
Stub. See the primary site for full coverage.
:::

- **Merchant** — your account on PyGate. You have one or more API keys,
  a webhook URL, and a settlement account.
- **Payment** — a single charge attempt against one of your customers.
  Has a lifecycle (created → redirected → succeeded / failed / expired).
- **Checkout session** — a hosted payment page tied to a payment. The
  session is short-lived; the payment persists after it ends.
- **Webhook event** — a signed JSON payload delivered to your webhook
  URL when a payment transitions state.
- **Refund** — a partial or full reversal of a captured payment.
