"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Footer from "@/components/site/footer"
import Nav from "@/components/site/nav"

interface Post {
  title: string
  link: string
  slug: string
  date: string | null
  content: string
  tags: string[]
}

function fmtDate(d: string | null): string {
  if (!d) return ""
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date)
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<Post | null | undefined>(undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch("/api/medium")
      .then((r) => r.json())
      .then((posts) => setPost(Array.isArray(posts) ? posts.find((p: Post) => p.slug === slug) || null : null))
      .catch(() => setPost(null))
  }, [slug])

  useEffect(() => {
    if (post) document.title = `${post.title} | Muhammad Yasin`
  }, [post])

  return (
    <>
      <Nav home={false} />
      <main className="mx-auto max-w-[760px] px-5 py-12 md:py-20">
        <Link href="/#writing" className="mb-8 inline-flex min-h-11 items-center font-mono text-[13px] text-muted hover:text-accent">
          ← Back to writing
        </Link>
        {post === undefined && <p className="text-muted">Loading…</p>}
        {post === null && (
          <p className="text-muted">
            Couldn&apos;t load this post.{" "}
            <a href="https://medium.com/@m.yaseensalim" className="text-accent hover:underline">
              Read on Medium ↗
            </a>
          </p>
        )}
        {post && (
          <article>
            <div className="font-mono text-xs uppercase tracking-wider text-muted">{fmtDate(post.date)}</div>
            <h1 className="mb-8 mt-3 font-display text-[40px] leading-[1.05] md:text-[56px]">{post.title}</h1>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-11 items-center text-accent hover:underline">
              Read on Medium ↗
            </a>
          </article>
        )}
      </main>
      <Footer />
    </>
  )
}
