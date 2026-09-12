"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AnimatedSection from "./AnimatedSection";
import { BlogPost } from "@/types/blog";

export default function BlogPreview() {
  const t = useTranslations("BlogPreview");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success && Array.isArray(data.posts)) {
          // Take top 3 published articles
          setPosts(data.posts.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load blog preview:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestPosts();
  }, []);

  return (
    <section id="blog-preview" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <AnimatedSection>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>

            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground md:self-auto"
            >
              {t("viewAll")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </AnimatedSection>

        {/* Slim article list — no cover images on the homepage */}
        <AnimatedSection delay={0.1}>
          <div className="mt-12 md:mt-16">
            {loading ? (
              <div className="animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 border-t border-border py-6 last:border-b"
                  >
                    <div className="h-[72px] w-24 shrink-0 rounded-xl bg-muted md:h-24 md:w-32" />
                    <div className="min-w-0 flex-1">
                      <div className="h-3 w-32 rounded bg-muted" />
                      <div className="mt-3 h-5 w-2/3 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/30 px-4 py-12 text-center">
                <BookOpen
                  size={36}
                  className="mx-auto mb-3 text-muted-foreground/60"
                />
                <p className="text-sm text-muted-foreground">{t("empty")}</p>
              </div>
            ) : (
              posts.map((post) => {
                const readTime = Math.max(
                  1,
                  Math.ceil(post.content.split(/\s+/).length / 200)
                );
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently";

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-5 border-t border-border py-6 transition-colors last:border-b hover:bg-card/60"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-[72px] w-24 shrink-0 overflow-hidden rounded-xl bg-muted md:h-24 md:w-32">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 96px, 128px"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground/60">
                          <BookOpen size={20} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 px-1">
                      <p className="font-mono text-xs text-muted-foreground">
                        {formattedDate} · {readTime} {t("minRead")} ·{" "}
                        {post.category}
                      </p>
                      <h3 className="mt-1.5 truncate text-base font-semibold text-foreground transition-transform duration-200 group-hover:translate-x-1 sm:text-lg">
                        {post.title}
                      </h3>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-foreground group-hover:text-foreground">
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
