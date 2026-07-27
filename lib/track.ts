// Lightweight, privacy-aware client tracker.
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const ENDPOINT = "/api/track";

function dntEnabled(): boolean {
  const dnt =
    navigator.doNotTrack ||
    (window as any).doNotTrack ||
    (navigator as any).msDoNotTrack;
  return dnt === "1" || dnt === "yes" || dnt === true;
}

let fpPromise: Promise<any> | null = null;
async function getFingerprint(): Promise<string | null> {
  try {
    if (!fpPromise) fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const { visitorId } = await fp.get();
    return visitorId;
  } catch {
    return null;
  }
}

async function send(payload: any): Promise<void> {
  if (dntEnabled()) return; // honor DNT

  try {
    const fingerprint = await getFingerprint();
    const body = JSON.stringify({
      ...payload,
      fingerprint,
      referrer: document.referrer || null,
    });

    // sendBeacon survives page unloads (important for CV-download clicks).
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* never surface tracking errors */
  }
}

export function trackPageView(page: string): void {
  send({ page, event: "pageview" });
}

export function trackEvent(event: string, page?: string): void {
  send({ page: page || window.location.pathname, event });
}
