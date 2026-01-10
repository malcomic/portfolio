import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import {
  useAdminPosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "../../hooks/admin";
import type { Post } from "@portfolio/shared";

export function AdminPostsPage() {
  const postsQ = useAdminPosts();
  const create = useCreatePost();
  const update = useUpdatePost();
  const remove = useDeletePost();

  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setBody("");
    setCoverImageUrl("");
  };

  const loadPost = (post: Post) => {
    setEditing(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setBody(post.body ?? "");
    setCoverImageUrl(post.coverImageUrl ?? "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      slug,
      excerpt,
      body: body || null,
      coverImageUrl: coverImageUrl || null,
      publishedAt: new Date().toISOString(),
    };

    if (editing) {
      await update.mutateAsync({ id: editing, data });
    } else {
      await create.mutateAsync(data);
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this post?")) {
      await remove.mutateAsync(id);
    }
  };

  if (postsQ.isLoading) return <LoadingState />;
  if (postsQ.error) return <ErrorState error={postsQ.error} />;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Blog Posts</h1>
          <p className="mt-2 text-muted">Write and publish blog content</p>
        </div>
        <Link to="/admin/dashboard">
          <Button variant="ghost">← Dashboard</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold">{editing ? "Edit Post" : "Create Post"}</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-semibold">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="My Blog Post Title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Slug (URL)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="my-blog-post-title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Excerpt</label>
              <textarea
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="A short excerpt that appears in listings..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Cover Image URL (optional)</label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Body (optional)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="Write the full post content here..."
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={create.isPending || update.isPending}>
                {editing ? "Update" : "Create"}
              </Button>
              {editing ? (
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </form>
        </Card>

        <div className="grid gap-4 content-start">
          <h2 className="text-lg font-bold">All Posts</h2>
          {(postsQ.data ?? []).map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.title}</div>
                  <p className="mt-1 text-xs text-muted">{p.excerpt}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadPost(p)}
                    className="text-xs text-accent hover:brightness-110"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs text-red-400 hover:brightness-110"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

