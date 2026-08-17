---
title: Security
sidebar_position: 9
---

# Security

How PyGate handles keys, signatures, and PII.

:::note Placeholder content
Stub. See the primary site for the full security model.
:::

- **Keys** — issued per-merchant, scoped to live/test. Never logged.
  Rotated without downtime.
- **Signatures** — webhook events are HMAC-SHA256 signed with your
  webhook secret.
- **PII** — only the data needed to process the payment is stored.
  Customer PII is encrypted at rest.
- **Compliance** — see the security page on the dashboard for our
  latest PCI-DSS attestation.
