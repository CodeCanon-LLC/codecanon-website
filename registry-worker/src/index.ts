interface Env {
  TOKENS: KVNamespace;
  NPM_ORG_TOKEN: string;
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

const ALLOWED_PACKAGES: PackageId[] = ["waraq", "nuska"];

// ── Entry point ──────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    const authHeader = request.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return registryUnauthorized("Missing Authorization header");
    }

    const record = await env.TOKENS.get<TokenRecord>(`token:${token}`, "json");

    if (!record) {
      return registryUnauthorized("Invalid token");
    }

    if (record.revoked) {
      return registryUnauthorized("Token has been revoked");
    }

    // ── Package check ─────────────────────────────────────────────────────────
    const url = new URL(request.url);
    // Decode %2F in scoped package names: /@codecanon%2Fwaraq → /@codecanon/waraq
    const pathname = decodeURIComponent(url.pathname);

    const pkg = parsePackageName(pathname);

    if (!pkg) {
      return new Response("Not found", { status: 404 });
    }

    if (!record.packages.includes(pkg)) {
      console.warn(`Token ${token.slice(0, 8)}... attempted to access @codecanon/${pkg} — not in purchased packages`);
      return registryForbidden(`Your token does not include access to @codecanon/${pkg}`);
    }

    // ── Seat / IP enforcement ─────────────────────────────────────────────────
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";

    if (!record.ips.includes(clientIp)) {
      if (record.ips.length >= record.seats) {
        console.warn(`Token ${token.slice(0, 8)}... exceeded seat limit (${record.seats}) — blocked IP ${clientIp}`);
        return registryForbidden(
          `Seat limit reached (${record.seats} unique IPs allowed). Contact codecanonllc@gmail.com to increase your seats.`
        );
      }
      record.ips.push(clientIp);
    }

    // Update lastUsed and IPs (fire-and-forget — don't block the proxy)
    record.lastUsed = new Date().toISOString();
    env.TOKENS.put(`token:${token}`, JSON.stringify(record)).catch((err) =>
      console.error("KV update failed:", err)
    );

    // ── Proxy to npm registry ─────────────────────────────────────────────────
    const npmUrl = `https://registry.npmjs.org${pathname}${url.search}`;

    const npmRes = await fetch(npmUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${env.NPM_ORG_TOKEN}`,
        Accept: request.headers.get("Accept") ?? "application/json",
        "User-Agent": request.headers.get("User-Agent") ?? "codecanon-registry/1.0",
      },
    });

    const responseHeaders = new Headers(npmRes.headers);
    responseHeaders.delete("www-authenticate");

    // Rewrite tarball URLs in metadata responses so npm fetches tarballs
    // back through our proxy (with auth) instead of directly from registry.npmjs.org
    const isTarball = pathname.endsWith(".tgz");
    const contentType = npmRes.headers.get("content-type") ?? "";

    if (!isTarball && contentType.includes("application/json")) {
      const proxyOrigin = `https://${url.hostname}`;
      const body = await npmRes.text();
      const rewritten = body.replaceAll("https://registry.npmjs.org", proxyOrigin);
      responseHeaders.set("content-type", "application/json");
      responseHeaders.delete("content-encoding");
      return new Response(rewritten, {
        status: npmRes.status,
        headers: responseHeaders,
      });
    }

    return new Response(npmRes.body, {
      status: npmRes.status,
      headers: responseHeaders,
    });
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Parses the package name from an npm registry URL path.
 * Handles:
 *   /@codecanon/waraq              → "waraq"
 *   /@codecanon/waraq/1.0.0        → "waraq"
 *   /@codecanon/waraq/-/waraq-1.0.0.tgz → "waraq"
 */
function parsePackageName(pathname: string): PackageId | null {
  // Match /@codecanon/<pkg> optionally followed by more path segments
  const match = pathname.match(/^\/@codecanon\/([^/]+)/);
  if (!match) return null;

  const name = match[1] as PackageId;
  return ALLOWED_PACKAGES.includes(name) ? name : null;
}

function registryUnauthorized(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
      "WWW-Authenticate": 'Bearer realm="codecanon-registry"',
    },
  });
}

function registryForbidden(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  });
}
