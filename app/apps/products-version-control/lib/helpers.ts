export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}

export function getType(v: unknown) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "object";
  return typeof v;
}

export function parseValue(raw: string, type: string): unknown {
  if (type === "number") return Number(raw);
  if (type === "boolean") return raw === "true";
  if (type === "null") return null;
  if (type === "json") {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

export function renderVal(v: unknown): string {
  if (v === undefined) return "—";
  if (v === null) return "null";
  if (typeof v === "string") return `"${v}"`;
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

export function avatarColor(name: string): string {
  const palette = [
    "#1f6feb",
    "#238636",
    "#8957e5",
    "#da3633",
    "#9e6a03",
    "#0550ae",
  ];
  let n = 0;
  for (let i = 0; i < name.length; i++)
    n = (n + name.charCodeAt(i)) % palette.length;
  return palette[n];
}
