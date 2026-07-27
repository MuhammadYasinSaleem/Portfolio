// Shared enrichment for tracking endpoints
import { UAParser } from "ua-parser-js";

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// A loopback/private address can't be geolocated. In production the visitor IP
// is public so this is always true; only local dev hits the false branch.
function isPublicIp(ip: string): boolean {
  if (!ip || ip === "unknown") return false;
  if (ip === "::1" || ip.startsWith("127.")) return false;
  if (/^10\./.test(ip)) return false;
  if (/^192\.168\./.test(ip)) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return false;
  if (/^f[cd]/i.test(ip) || /^fe80:/i.test(ip)) return false; // IPv6 ULA / link-local
  return true;
}

export async function geoLookup(ip: string) {
  // Real deploy: look up the visitor's public IP.
  // Local dev (loopback/private): self-lookup — ipapi resolves the caller's own
  // public IP, so you still see real data while testing on localhost.
  const target = isPublicIp(ip) ? ip : "";
  const url = target
    ? `https://ipapi.co/${target}/json/`
    : `https://ipapi.co/json/`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "portfolio-tracker/1.0" } });
    if (!r.ok) {
      console.error("[geo] ipapi HTTP", r.status);
      // Try fallback to ipinfo.io
      return await fallbackGeoLookup(target);
    }
    const g = await r.json();
    if (g.error) {
      console.error("[geo] ipapi error:", g.reason || g.message);
      // Try fallback to ipinfo.io
      return await fallbackGeoLookup(target);
    }
    return {
      city: g.city ?? null,
      region: g.region ?? null,
      country: g.country_name ?? null,
      isp: g.org ?? null,
      org: g.org ?? null,
      lat: g.latitude ?? null,
      lon: g.longitude ?? null,
      timezone: g.timezone ?? null,
      postal: g.postal ?? null,
    };
  } catch (e) {
    console.error("[geo] lookup failed:", e instanceof Error ? e.message : String(e));
    // Try fallback to ipinfo.io
    return await fallbackGeoLookup(target);
  }
}

async function fallbackGeoLookup(ip: string) {
  const target = isPublicIp(ip) ? ip : "";
  const url = target
    ? `https://ipinfo.io/${target}/json`
    : `https://ipinfo.io/json`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "portfolio-tracker/1.0" } });
    if (!r.ok) {
      console.error("[geo] ipinfo HTTP", r.status);
      return {};
    }
    const g = await r.json();
    if (g.error) {
      console.error("[geo] ipinfo error:", g.error);
      return {};
    }
    return {
      city: g.city ?? null,
      region: g.region ?? null,
      country: g.country ?? null,
      isp: g.org ?? null,
      org: g.org ?? null,
      lat: g.loc ? parseFloat(g.loc.split(',')[0]) : null,
      lon: g.loc ? parseFloat(g.loc.split(',')[1]) : null,
      timezone: g.timezone ?? null,
      postal: g.postal ?? null,
    };
  } catch (e) {
    console.error("[geo] ipinfo fallback failed:", e instanceof Error ? e.message : String(e));
    return {};
  }
}

export function parseUA(uaString: string | null) {
  const ua = new UAParser(uaString || undefined).getResult();
  return {
    browser: [ua.browser.name, ua.browser.version].filter(Boolean).join(" ") || null,
    os: [ua.os.name, ua.os.version].filter(Boolean).join(" ") || null,
    device: ua.device.type || "desktop",
  };
}
