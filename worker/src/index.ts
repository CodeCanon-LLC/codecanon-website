interface Env {
  STRIPE_WEBHOOK_SECRET: string;
  NPM_TOKEN: string;
  RESEND_API_KEY: string;
  // e.g. "CodeCanon <noreply@codecanon.com>" — must be a verified Resend domain
  RESEND_FROM_EMAIL: string;
}

// ── Entry point ──────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const sig = request.headers.get("stripe-signature");
    if (!sig) return new Response("Missing Stripe-Signature", { status: 400 });

    const body = await request.text();

    const valid = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
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

// ── Handler ───────────────────────────────────────────────────────────────────

async function handleCheckout(session: CheckoutSession, env: Env) {
  const email = session.customer_details?.email;
  const npmUsername = session.custom_fields?.find(
    (f) => f.key === "npm_username",
  )?.text?.value;

  // packages is set via Payment Link metadata, e.g. "waraq" | "nuska" | "waraq,nuska"
  const packages = (session.metadata?.packages ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as PackageId[];

  if (!npmUsername || packages.length === 0) {
    console.error("Missing npm_username or packages in session", session.id);
    return;
  }

  // Grant npm access for each package
  const granted: PackageId[] = [];
  const failed: PackageId[] = [];

  for (const pkg of packages) {
    try {
      await grantNpmAccess(env.NPM_TOKEN, pkg, npmUsername);
      granted.push(pkg);
    } catch (err) {
      console.error(`Failed to grant npm access for ${pkg}:`, err);
      failed.push(pkg);
    }
  }

  if (email) {
    await sendConfirmationEmail(env, {
      to: email,
      npmUsername,
      granted,
      failed,
    });
  }
}

// ── npm access ────────────────────────────────────────────────────────────────

type PackageId = "waraq" | "nuska";

const NPM_TEAMS: Record<PackageId, string> = {
  waraq: "buyers-waraq",
  nuska: "buyers-nuska",
};

// Adds the user to the npm org team for the given package.
// Prereqs in npm dashboard:
//   1. Create org teams "buyers-waraq" and "buyers-nuska" under the "codecanon" org
//   2. Grant each team read access to the respective @codecanon/* package
async function grantNpmAccess(token: string, pkg: PackageId, username: string) {
  const team = NPM_TEAMS[pkg];
  const url = `https://registry.npmjs.org/-/team/codecanon/${team}/user`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: username }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`npm API ${res.status}: ${text}`);
  }
}

// ── Email ─────────────────────────────────────────────────────────────────────

async function sendConfirmationEmail(
  env: Env,
  opts: {
    to: string;
    npmUsername: string;
    granted: PackageId[];
    failed: PackageId[];
  },
) {
  const { to, npmUsername, granted, failed } = opts;

  const packageList = granted
    .map((p) => `@codecanon/${p}`)
    .join(" and ");

  const installLines = granted
    .map((p) => `npm install @codecanon/${p}`)
    .join("\n");

  const failedNote =
    failed.length > 0
      ? `<p style="color:#ef4444;margin-top:16px">We had trouble granting access to: ${failed.map((p) => `@codecanon/${p}`).join(", ")}. We'll sort this out manually and follow up shortly.</p>`
      : "";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;color:#111">
  <h1 style="font-size:24px;font-weight:700;margin-bottom:8px">You're in 🎉</h1>
  <p style="color:#555;margin-bottom:24px">
    Thanks for purchasing ${packageList}! Your npm account
    <strong>${npmUsername}</strong> now has read access.
  </p>

  <h2 style="font-size:16px;font-weight:600;margin-bottom:8px">Getting started</h2>

  <p style="color:#555;margin-bottom:8px">Make sure you're logged in to npm:</p>
  <pre style="background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:13px;overflow-x:auto">npm login</pre>

  <p style="color:#555;margin:16px 0 8px">Install the package(s):</p>
  <pre style="background:#f4f4f5;padding:12px 16px;border-radius:8px;font-size:13px;overflow-x:auto">${installLines}</pre>

  <p style="color:#555;margin:16px 0 8px">Then head to the docs:</p>
  <a href="https://codecanon-llc.github.io/docs" style="color:#6d28d9;font-weight:500">
    codecanon-llc.github.io/docs →
  </a>

  ${failedNote}

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
      subject: `Your CodeCanon purchase — ${packageList}`,
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
  custom_fields?: Array<{
    key: string;
    type: string;
    text?: { value?: string };
  }>;
  metadata?: Record<string, string>;
}
