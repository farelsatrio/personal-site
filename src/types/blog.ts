export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export type CreatePostInput = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "publishedAt"> & {
  status?: PostStatus;
};

export type UpdatePostInput = Partial<CreatePostInput>;
