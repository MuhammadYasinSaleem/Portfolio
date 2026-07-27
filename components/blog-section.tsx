"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
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

function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card">
        {post.thumb ? (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={post.thumb}
              alt=""
              loading="lazy"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/20">Blog</span>
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {post.date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {fmtDate(post.date)}
              </span>
            )}
            <span className="flex items-center gap-1 text-primary">
              Read <ArrowRight className="h-3 w-3" />
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {post.snippet}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/medium")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => {
        setError(true)
        setPosts([])
      })
  }, [])

  return (
    <section id="blog" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my journey as a software engineer
          </p>
          {posts !== null && !error && (
            <p className="text-sm text-muted-foreground mt-2">
              {posts.length} posts
            </p>
          )}
        </div>

        {posts === null && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Fetching posts from Medium…</p>
          </div>
        )}

        {posts !== null && error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Couldn't load posts right now —{" "}
              <a
                href="https://medium.com/@muhammadyasinsaleem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                read on Medium ↗
              </a>
            </p>
          </div>
        )}

        {posts !== null && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts published yet.</p>
          </div>
        )}

        {posts !== null && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.slug || i} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
