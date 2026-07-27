import { XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";

// Replace with your Medium username
const FEED = "https://medium.com/feed/@m.yaseensalim";
const parser = new XMLParser({ ignoreAttributes: false });

// Pragmatic scrub for trusted (own) Medium HTML before rendering client-side.
function sanitize(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<(iframe|object|embed|form)[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function slugify(link: string): string {
  return link.split("?")[0].split("#")[0].split("/").filter(Boolean).pop() || "post";
}

export async function GET() {
  try {
    const upstream = await fetch(FEED, {
      headers: { "User-Agent": "portfolio-rss/1.0" },
    });
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);

    const xml = await upstream.text();
    const channel = parser.parse(xml)?.rss?.channel ?? {};
    const raw = channel.item ?? [];
    const items = Array.isArray(raw) ? raw : [raw];

    const posts = items.map((it: any) => {
      const html = it["content:encoded"] || it.description || "";
      const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return {
        title: it.title ?? "Untitled",
        link: typeof it.link === "string" ? it.link : it.link?.["#text"] ?? "",
        slug: slugify(typeof it.link === "string" ? it.link : it.link?.["#text"] ?? ""),
        date: it.pubDate ?? null,
        thumb: html.match(/<img[^>]+src="([^">]+)"/)?.[1] ?? null,
        snippet: text.length > 160 ? text.slice(0, 160).trim() + "…" : text,
        content: sanitize(html),
        tags: [].concat(it.category ?? []).slice(0, 4),
      };
    });

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "feed_unavailable" }, { status: 502 });
  }
}
