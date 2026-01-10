import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import {
  useAdminProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../../hooks/admin";
import type { Project } from "@portfolio/shared";

export function AdminProjectsPage() {
  const projectsQ = useAdminProjects();
  const create = useCreateProject();
  const update = useUpdateProject();
  const remove = useDeleteProject();

  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [techStack, setTechStack] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [body, setBody] = useState("");

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setTechStack("");
    setCoverImageUrl("");
    setRepoUrl("");
    setLiveUrl("");
    setBody("");
  };

  const loadProject = (project: Project) => {
    setEditing(project.id);
    setTitle(project.title);
    setSlug(project.slug);
    setSummary(project.summary);
    setTechStack(project.techStack.join(", "));
    setCoverImageUrl(project.coverImageUrl ?? "");
    setRepoUrl(project.repoUrl ?? "");
    setLiveUrl(project.liveUrl ?? "");
    setBody(project.body ?? "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      slug,
      summary,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      coverImageUrl: coverImageUrl || null,
      repoUrl: repoUrl || null,
      liveUrl: liveUrl || null,
      body: body || null,
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
    if (confirm("Delete this project?")) {
      await remove.mutateAsync(id);
    }
  };

  if (projectsQ.isLoading) return <LoadingState />;
  if (projectsQ.error) return <ErrorState error={projectsQ.error} />;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Projects</h1>
          <p className="mt-2 text-muted">Manage your portfolio projects</p>
        </div>
        <Link to="/admin/dashboard">
          <Button variant="ghost">← Dashboard</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold">{editing ? "Edit Project" : "Create Project"}</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-semibold">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="My Awesome Project"
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
                placeholder="my-awesome-project"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Summary</label>
              <textarea
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="A brief description..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Tech Stack (comma-separated)</label>
              <input
                type="text"
                required
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="React, TypeScript, Node.js"
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
              <label className="block text-sm font-semibold">Repo URL (optional)</label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Live URL (optional)</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Body (optional)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent/50"
                placeholder="Detailed project description..."
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
          <h2 className="text-lg font-bold">All Projects</h2>
          {(projectsQ.data ?? []).map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.title}</div>
                  <p className="mt-1 text-xs text-muted">{p.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadProject(p)}
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

