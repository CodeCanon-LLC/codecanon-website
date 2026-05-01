interface Env {
  TOKENS: KVNamespace;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PRICE_ID_WARAQ: string;
  STRIPE_PRICE_ID_NUSKA: string;
  STRIPE_PRICE_ID_BUNDLE: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

interface TokenRecord {
  email: string;
  packages: PackageId[];
  ips: string[];
  seats: number;
  createdAt: string;
  lastUsed: string;
  revoked: boolean;
}

type PackageId = "waraq" | "nuska";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://codecanon.dev",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ── Entry point ──────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === "GET" && url.pathname === "/prices") {
      return handlePrices(env);
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const sig = request.headers.get("stripe-signature");
    if (!sig) return new Response("Missing Stripe-Signature", { status: 400 });

    const body = await request.text();

    const valid = await verifyStripeSignature(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
    );
    if (!valid) return new Response("Invalid signature", { status: 401 });

    let event: StripeEvent;
    try {
      event = JSON.parse(body) as StripeEvent;
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      await handleCheckout(event.data.object, env).catch((err) => {
        console.error("handleCheckout failed:", err);
      });
    }

    return new Response("OK", { status: 200 });
  },
};

// ── Prices ────────────────────────────────────────────────────────────────────

async function handlePrices(env: Env): Promise<Response> {
  const [waraq, nuska, bundle] = await Promise.all([
    fetchStripePrice(env.STRIPE_PRICE_ID_WARAQ, env.STRIPE_SECRET_KEY),
    fetchStripePrice(env.STRIPE_PRICE_ID_NUSKA, env.STRIPE_SECRET_KEY),
    fetchStripePrice(env.STRIPE_PRICE_ID_BUNDLE, env.STRIPE_SECRET_KEY),
  ]);

  return new Response(JSON.stringify({ waraq, nuska, bundle }), {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}

async function fetchStripePrice(priceId: string, secretKey: string): Promise<number> {
  const res = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!res.ok) throw new Error(`Stripe API error: ${res.status}`);
  const data = await res.json() as { unit_amount: number };
  return data.unit_amount / 100;
}

// ── Handler ───────────────────────────────────────────────────────────────────

async function handleCheckout(session: CheckoutSession, env: Env) {
  const email = session.customer_details?.email;

  // packages is set via Payment Link metadata, e.g. "waraq" | "nuska" | "waraq,nuska"
  const packages = (session.metadata?.packages ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as PackageId[];

  if (!email || packages.length === 0) {
    console.error("Missing email or packages in session", session.id);
    return;
  }

  const now = new Date().toISOString();

  // Check if this buyer already has a token — if so, merge packages into it
  const existingTokenId = await env.TOKENS.get(`email:${email}`);
  let token: string;
  let isNewToken: boolean;

  if (existingTokenId) {
    const existing = await env.TOKENS.get<TokenRecord>(
      `token:${existingTokenId}`,
      "json",
    );
    if (existing && !existing.revoked) {
      // Merge new packages into existing token
      const merged = Array.from(
        new Set([...existing.packages, ...packages]),
      ) as PackageId[];
      existing.packages = merged;
      existing.lastUsed = now;
      await env.TOKENS.put(
        `token:${existingTokenId}`,
        JSON.stringify(existing),
      );
      console.log(
        `Token updated for ${email} — packages: ${merged.join(", ")}`,
      );
      token = existingTokenId;
      isNewToken = false;
    } else {
      // Existing token is revoked — issue a fresh one
      token = crypto.randomUUID();
      isNewToken = true;
    }
  } else {
    token = crypto.randomUUID();
    isNewToken = true;
  }

  if (isNewToken) {
    const record: TokenRecord = {
      email,
      packages,
      ips: [],
      seats: 3,
      createdAt: now,
      lastUsed: now,
      revoked: false,
    };
    await env.TOKENS.put(`token:${token}`, JSON.stringify(record));
    await env.TOKENS.put(`email:${email}`, token);
    console.log(
      `Token created for ${email} — packages: ${packages.join(", ")}`,
    );
  }

  // Re-read final record to get accurate package list for the email
  const finalRecord = await env.TOKENS.get<TokenRecord>(
    `token:${token}`,
    "json",
  );
  const allPackages = finalRecord?.packages ?? packages;

  await sendConfirmationEmail(env, {
    to: email,
    token,
    packages: allPackages,
    isNewToken,
  });
}

// ── Email ─────────────────────────────────────────────────────────────────────

async function sendConfirmationEmail(
  env: Env,
  opts: {
    to: string;
    token: string;
    packages: PackageId[];
    isNewToken: boolean;
  },
) {
  const { to, token, packages, isNewToken } = opts;

  const packageList = packages.map((p) => `@codecanon/${p}`).join(" and ");

  const npmrcLines = [
    `@codecanon:registry=https://registry.codecanon.dev/`,
    `//registry.codecanon.dev/:_authToken=${token}`,
  ].join("\n");

  const installLines = packages
    .map((p) => `npm install @codecanon/${p}`)
    .join("\n");

  const heading = isNewToken
    ? "You're in 🎉"
    : "Your access has been updated 🎉";
  const intro = isNewToken
    ? `Thanks for purchasing ${packageList}! Follow the steps below to get set up.`
    : `You now have access to ${packageList}. Your token is unchanged — update your <code>.npmrc</code> if needed and install the new package(s) below.`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;color:#111">
  <h1 style="font-size:24px;font-weight:700;margin-bottom:8px">${heading}</h1>
  <p style="color:#555;margin-bottom:24px">${intro}</p>

  <h2 style="font-size:16px;font-weight:600;margin-bottom:8px">1. Add to your <code>.npmrc</code></h2>
  <p style="color:#555;margin-bottom:8px">
    In your project root (or <code>~/.npmrc</code> for global access), add:
  </p>
  <pre style="background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:13px;overflow-x:auto">${npmrcLines}</pre>

  <h2 style="font-size:16px;font-weight:600;margin:24px 0 8px">2. Install the package(s)</h2>
  <pre style="background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:13px;overflow-x:auto">${installLines}</pre>

  <h2 style="font-size:16px;font-weight:600;margin:24px 0 8px">3. Read the docs</h2>
  <a href="https://codecanon.dev/docs" style="color:#6d28d9;font-weight:500">
    codecanon.dev/docs →
  </a>

  <div style="margin-top:24px;padding:12px 16px;background:#fefce8;border:1px solid #fde68a;border-radius:8px;font-size:13px;color:#92400e">
    <strong>Keep your token private.</strong> It is tied to your purchase and allows up to 3 unique machines.
    Do not commit it to version control — use environment variables or a secrets manager instead.
  </div>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0">
  <p style="font-size:13px;color:#888">
    Questions? Reply to this email or reach us at
    <a href="mailto:codecanonllc@gmail.com" style="color:#6d28d9">codecanonllc@gmail.com</a>.
  </p>
</body>
</html>`.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to,
      subject: `Your CodeCanon access token — ${packageList}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API ${res.status}: ${text}`);
  }
}

// ── Stripe webhook verification ───────────────────────────────────────────────

async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
): Promise<boolean> {
  const parts = header.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const signatures = parts
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));

  if (!timestamp || signatures.length === 0) return false;

  // Reject if timestamp is >5 minutes old (replay protection)
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const buf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload),
  );
  const expected = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signatures.some((sig) => sig === expected);
}

// ── Stripe event types (minimal) ──────────────────────────────────────────────

interface StripeEvent {
  type: string;
  data: { object: CheckoutSession };
}

interface CheckoutSession {
  id: string;
  customer_details?: { email?: string };
  metadata?: Record<string, string>;
}
