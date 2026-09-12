"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Calendar, Clock, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/types/blog";

export default function BlogListingPage() {
  const t = useTranslations("Blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  // Filter posts by search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-3">
                Insights & Writing
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                {t("title")}
              </h1>
              <p className="mt-2 text-muted-foreground max-w-xl text-sm md:text-base">
                {t("description")}
              </p>
            </div>

            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
            >
              <ShieldCheck size={16} className="text-accent" />
              {t("adminLink")}
            </Link>
          </div>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-accent text-white"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat === "All" ? t("allCategories") : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card/50 p-6 animate-pulse"
                >
                  <div className="w-full h-48 bg-muted rounded-xl mb-4"></div>
                  <div className="h-4 w-1/3 bg-muted rounded mb-2"></div>
                  <div className="h-6 w-3/4 bg-muted rounded mb-4"></div>
                  <div className="h-4 w-full bg-muted rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mt-16 text-center py-16 border border-dashed border-border rounded-2xl bg-card/30">
              <p className="text-muted-foreground">{t("noArticles")}</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => {
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
                  <article
                    key={post.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
                  >
                    <div>
                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                          />
                          <span className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-accent border border-border">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {readTime} min read
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
                      >
                        {t("readMore")}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
