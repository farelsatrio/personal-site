"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { BlogPost } from "@/types/blog";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations("Blog");

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();
        if (data.success && data.post) {
          setPost(data.post);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching article detail:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-28 pb-20 px-6 max-w-3xl mx-auto w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="h-10 w-3/4 bg-muted rounded"></div>
            <div className="h-64 w-full bg-muted rounded-2xl"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-6 text-center max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8">
            The article you are looking for does not exist or has not been published yet.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <ArrowLeft size={16} />
            {t("backToBlog")}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const readTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <article className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            {t("backToBlog")}
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent border border-accent/20">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 py-4 text-xs text-muted-foreground border-y border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent font-semibold text-xs">
                  <User size={14} />
                </div>
                <span className="font-medium text-foreground">Farel Satrio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {readTime} min read
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative my-8 h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                unoptimized
              />
            </div>
          )}

          {/* Excerpt Lead */}
          {post.excerpt && (
            <p className="text-base sm:text-lg font-medium text-muted-foreground italic leading-relaxed mb-8 border-l-2 border-accent pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Body Content */}
          <MarkdownRenderer content={post.content} />

          {/* Article Tags Footer */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-card border border-border px-3 py-1 text-xs font-mono text-muted-foreground"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
