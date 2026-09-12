import fs from "fs/promises";
import path from "path";
import { BlogPost, CreatePostInput, UpdatePostInput } from "@/types/blog";
import { slugify } from "@/lib/slug";

export { slugify };

const DATA_FILE_PATH = path.join(process.cwd(), "data", "posts.json");

/**
 * Reads all posts from local JSON file.
 * Creates the file if it does not exist.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const posts: BlogPost[] = JSON.parse(fileContent);
    return posts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // Ensure folder exists and return empty array
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    console.error("Error reading posts.json:", error);
    return [];
  }
}

/**
 * Saves posts array to local JSON file.
 */
async function savePosts(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

/**
 * Gets published posts only.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.status === "published");
}

/**
 * Gets a post by slug.
 * By default returns published posts only. Pass includeDraft = true for admin/previews.
 */
export async function getPostBySlug(
  slug: string,
  includeDraft = false
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  if (!includeDraft && post.status !== "published") return null;
  return post;
}

/**
 * Gets a post by ID.
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) || null;
}

/**
 * Creates a new blog post.
 */
export async function createPost(input: CreatePostInput): Promise<BlogPost> {
  const posts = await getAllPosts();
  const now = new Date().toISOString();
  const status = input.status || "draft";
  const slug = input.slug ? slugify(input.slug) : slugify(input.title);

  const newPost: BlogPost = {
    id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: input.title,
    slug,
    excerpt: input.excerpt || "",
    content: input.content || "",
    coverImage: input.coverImage || "",
    category: input.category || "General",
    tags: Array.isArray(input.tags) ? input.tags : [],
    status,
    createdAt: now,
    updatedAt: now,
    publishedAt: status === "published" ? now : null,
  };

  posts.unshift(newPost);
  await savePosts(posts);
  return newPost;
}

/**
 * Updates an existing blog post.
 */
export async function updatePost(
  id: string,
  input: UpdatePostInput
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) return null;

  const current = posts[index];
  const now = new Date().toISOString();
  const status = input.status !== undefined ? input.status : current.status;

  let publishedAt = current.publishedAt;
  if (status === "published" && current.status !== "published") {
    publishedAt = now;
  } else if (status === "draft") {
    publishedAt = null;
  }

  const updatedPost: BlogPost = {
    ...current,
    ...input,
    slug: input.slug ? slugify(input.slug) : input.title ? slugify(input.title) : current.slug,
    status,
    updatedAt: now,
    publishedAt,
  };

  posts[index] = updatedPost;
  await savePosts(posts);
  return updatedPost;
}

/**
 * Deletes a post by ID.
 */
export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);

  if (filtered.length === posts.length) {
    return false;
  }

  await savePosts(filtered);
  return true;
}
