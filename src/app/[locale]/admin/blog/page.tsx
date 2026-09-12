"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  FileText,
  Search,
  X,
  Sparkles,
  ArrowLeft,
  Globe,
  FileCode,
  LogOut,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { BlogPost, PostStatus } from "@/types/blog";
import { slugify } from "@/lib/slug";

export default function AdminBlogPage() {
  const router = useRouter();
  const locale = useLocale();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Form Fields State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "DevOps",
    tags: "",
    status: "draft" as PostStatus,
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Fetch all posts for admin
  const fetchAdminPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blog");
      if (res.status === 401) {
        // Unauthorized, redirect to login page
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to load admin posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminPosts();
  }, []);

  // Show feedback alert temporarily
  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Reset form
  const handleOpenCreate = () => {
    setEditingPostId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "DevOps",
      tags: "DevOps, Cloud",
      status: "draft",
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  // Open edit modal with existing data
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category,
      tags: post.tags.join(", "),
      status: post.status,
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  // Auto generate slug from title
  const handleAutoSlug = () => {
    if (formData.title) {
      setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  };

  // Save/Update Post handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showFeedback("error", "Title is required!");
      return;
    }

    setSaving(true);
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: formData.title,
      slug: formData.slug || slugify(formData.title),
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage,
      category: formData.category,
      tags: tagsArray,
      status: formData.status,
    };

    try {
      const url = editingPostId ? `/api/admin/blog/${editingPostId}` : "/api/admin/blog";
      const method = editingPostId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        showFeedback(
          "success",
          editingPostId ? "Article updated successfully!" : "Article created successfully!"
        );
        setIsModalOpen(false);
        fetchAdminPosts();
      } else {
        showFeedback("error", data.error || "Failed to save article.");
      }
    } catch (err: any) {
      showFeedback("error", err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  // Quick toggle status (draft <-> published)
  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus: PostStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `Status changed to ${nextStatus === "published" ? "Published" : "Draft"}`
        );
        fetchAdminPosts();
      } else {
        showFeedback("error", data.error || "Failed to toggle status.");
      }
    } catch (err) {
      showFeedback("error", "Error updating status.");
    }
  };

  // Delete post
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        showFeedback("success", "Article deleted successfully.");
        fetchAdminPosts();
      } else {
        showFeedback("error", data.error || "Failed to delete article.");
      }
    } catch (err) {
      showFeedback("error", "Error deleting article.");
    }
  };

  // Filtered posts for admin list
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Top Feedback Banner */}
          {feedback && (
            <div
              className={`mb-6 rounded-xl p-4 text-sm font-medium border flex items-center justify-between transition-all ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              <span>{feedback.message}</span>
              <button onClick={() => setFeedback(null)}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Public Blog
                </Link>
                <span className="text-border">|</span>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Admin Dashboard
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
                Blog Article Manager
              </h1>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-accent/90 transition-all"
              >
                <Plus size={18} />
                Create Article
              </button>

              <button
                onClick={handleLogout}
                title="Sign out of Admin Session"
                className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">Total Articles</span>
                <FileText size={18} className="text-accent" />
              </div>
              <p className="mt-2 text-3xl font-extrabold text-foreground">{totalPosts}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">Published</span>
                <CheckCircle size={18} className="text-emerald-400" />
              </div>
              <p className="mt-2 text-3xl font-extrabold text-emerald-400">{publishedCount}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase">Drafts</span>
                <Clock size={18} className="text-amber-400" />
              </div>
              <p className="mt-2 text-3xl font-extrabold text-amber-400">{draftCount}</p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Filter by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {(["all", "published", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                    statusFilter === status
                      ? "bg-accent text-white"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Article List Table / Cards */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl border border-border bg-card/40 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/20">
                <p className="text-muted-foreground">No articles match the criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  const formattedDate = new Date(
                    post.publishedAt || post.createdAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border/80"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              post.status === "published"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span className="text-xs font-semibold text-accent">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">• {formattedDate}</span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground line-clamp-1">
                          {post.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-1 font-mono">
                          /blog/{post.slug}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {/* Status Toggle */}
                        <button
                          onClick={() => handleToggleStatus(post)}
                          title={
                            post.status === "published" ? "Unpublish to draft" : "Publish article"
                          }
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            post.status === "published"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                          }`}
                        >
                          {post.status === "published" ? "Published" : "Publish"}
                        </button>

                        {/* View Link if published */}
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View public article"
                            className="rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                          >
                            <Eye size={16} />
                          </Link>
                        )}

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(post)}
                          title="Edit article"
                          className="rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          title="Delete article"
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingPostId ? "Edit Blog Article" : "Create New Blog Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Automating Infrastructure with Ansible"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-muted-foreground">Slug</label>
                    <button
                      type="button"
                      onClick={handleAutoSlug}
                      className="text-[11px] font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <Sparkles size={12} /> Auto Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="automating-infrastructure-with-ansible"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground font-mono focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Category, Tags, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="DevOps, Cloud, IoT, Tutorial"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Kubernetes, Docker, CI/CD"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as PostStatus })
                    }
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="draft">Draft (Hidden from Public)</option>
                    <option value="published">Published (Visible on /blog)</option>
                  </select>
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                />
                {formData.coverImage && (
                  <div className="mt-2 relative h-32 w-full overflow-hidden rounded-xl border border-border bg-muted">
                    <Image
                      src={formData.coverImage}
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Short Excerpt
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of the article..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                />
              </div>

              {/* Content Editor with Tab Switcher */}
              <div>
                <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Content (Markdown Supported)
                  </label>

                  <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("write")}
                      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                        activeTab === "write"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <FileCode size={13} /> Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                        activeTab === "preview"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Globe size={13} /> Live Preview
                    </button>
                  </div>
                </div>

                {activeTab === "write" ? (
                  <textarea
                    rows={12}
                    required
                    placeholder="Write article content using Markdown (# Heading, **bold**, ```code```)..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full rounded-xl border border-border bg-muted/30 p-3.5 text-sm font-mono text-foreground focus:border-accent focus:outline-none"
                  />
                ) : (
                  <div className="min-h-[280px] max-h-[400px] overflow-y-auto rounded-xl border border-border bg-muted/20 p-4">
                    <MarkdownRenderer content={formData.content || "*No content written yet.*"} />
                  </div>
                )}
              </div>

              {/* Form Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : editingPostId ? "Update Article" : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
