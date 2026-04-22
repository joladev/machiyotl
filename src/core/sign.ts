import { createHmac, timingSafeEqual } from "node:crypto";

function getMainSecret(): string | undefined {
  return process.env.SECRET_KEY;
}

export function siteSignature(site: string): string | null {
  const secret = getMainSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(site).digest("hex");
}

export function verify(site: string, params: URLSearchParams): boolean {
  const provided = params.get("sig");
  if (!provided) return false;

  const expected = siteSignature(site);
  if (!expected) return false;

  const a = Buffer.from(provided, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || a.length === 0) return false;

  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
