"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  title: string
  link: string
  slug: string
  date: string | null
  thumb: string | null
  snippet: string
  content: string
  tags: string[]
}

function fmtDate(d: string | null): string {
  if (!d) return ""
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [error, setError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch("/api/medium")
      .then((r) => r.json())
      .then((posts) => {
        const found = Array.isArray(posts) ? posts.find((p: Post) => p.slug === slug) : null
        setPost(found || null)
      })
      .catch(() => setError(true))
  }, [slug])

  useEffect(() => {
    if (post) document.title = `${post.title} · Muhammad Yasin`
    return () => {
      document.title = "Muhammad Yasin"
    }
  }, [post])

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        .blog-content * {
          color: white !important;
        }
        .blog-content {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.8;
          color: white;
          padding-top: 14px;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          color: white !important;
          line-height: 1.3;
          margin: 28px 0 12px;
          font-weight: 700;
        }
        .blog-content h1 { font-size: 24px; }
        .blog-content h2 { font-size: 20px; }
        .blog-content h3 { font-size: 17px; }
        .blog-content p { margin: 16px 0; }
        .blog-content a {
          color: hsl(var(--primary)) !important;
          text-decoration: underline;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          display: block;
          margin: 20px auto;
        }
        .blog-content figure { margin: 20px 0; }
        .blog-content figcaption {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7) !important;
          text-align: center;
          margin-top: 6px;
        }
        .blog-content blockquote {
          border-left: 3px solid hsl(var(--primary));
          margin: 20px 0;
          padding: 4px 16px;
          color: rgba(255, 255, 255, 0.7) !important;
          font-style: italic;
        }
        .blog-content pre {
          background: hsl(var(--card)) !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 14px 16px;
          overflow-x: auto;
          margin: 18px 0;
        }
        .blog-content code {
          font-family: monospace;
          font-size: 13px;
          background: hsl(var(--card)) !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2px 6px;
        }
        .blog-content pre code {
          border: none;
          padding: 0;
          background: none !important;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        .blog-content li { margin: 7px 0; }
        .blog-content hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 28px 0;
        }
        .blog-content strong {
          font-weight: 700;
        }
        .blog-content em {
          font-style: italic;
        }
      `}</style>
      <div className="container px-4 md:px-6 py-12 max-w-4xl">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          back to blog
        </Link>

        {post === undefined && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading post…</p>
          </div>
        )}

        {(error || post === null) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Post not found.</p>
            <a
              href="https://medium.com/@m.yaseensalim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Browse all posts on Medium ↗
            </a>
          </div>
        )}

        {post && (
          <article className="max-w-3xl mx-auto">
            <header className="mb-8 pb-8 border-b">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {fmtDate(post.date)}
                  </span>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="mt-12 pt-8 border-t">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline transition-colors"
              >
                View original on Medium <ExternalLink className="h-4 w-4" />
              </a>
            </footer>
          </article>
        )}
      </div>
    </div>
  )
}
