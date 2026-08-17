---
title: Quickstart
sidebar_position: 2
---

# Quickstart

Make your first charge in 5 minutes.

:::note Placeholder content
This page is a stub in the alternate docs site. See the primary site
at `docs.payment.et` for the full version.
:::

## 1. Get your API key

Sign in to the [PyGate dashboard](https://dashboard.payment.et) and
generate a test API key from **Settings → API Keys**. Test keys start
with `pk_test_`.

## 2. Create a payment

```bash
curl -X POST https://api.payment.et/v1/payments \
  -H "Authorization: Bearer pk_test_..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "currency": "ETB",
    "method": "chapa",
    "success_url": "https://your-site.com/ok",
    "cancel_url":  "https://your-site.com/cancel"
  }'
```

You'll get back a `paymentId` and a `redirectUrl`. Send the customer to
`redirectUrl` to complete the payment.

## 3. Receive the webhook

When the customer finishes (or cancels), PyGate POSTs a signed event
to your webhook URL. Verify the signature using your webhook secret,
then fulfil the order.

See [Webhooks →](./webhooks) for the full event schema.
