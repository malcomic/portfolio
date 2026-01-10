import { Link, useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useProject } from "../hooks/public";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const q = useProject(slug);

  if (q.isLoading) return <LoadingState />;
  if (q.error) return <ErrorState error={q.error} />;
  if (!q.data) return <ErrorState error={new Error("Not found")} />;

  const p = q.data;

  return (
    <div className="grid gap-6">
      <div className="text-sm">
        <Link className="text-accent hover:brightness-110" to="/projects">
          ← Back to projects
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-black">{p.title}</h1>
        <p className="mt-2 text-muted">{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.techStack.map((t) => (
            <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>

      {p.coverImageUrl ? (
        <Card className="overflow-hidden p-0">
          <img className="w-full object-cover" src={p.coverImageUrl} alt={p.title} />
        </Card>
      ) : null}

      <Card>
        <div className="prose prose-invert max-w-none">
          {p.body ? <p>{p.body}</p> : <p className="text-muted">No long description yet (editable via admin).</p>}
        </div>
      </Card>

      {(p.repoUrl || p.liveUrl) && (
        <div className="flex flex-wrap gap-3">
          {p.liveUrl ? (
            <a className="text-sm font-semibold text-accent hover:brightness-110" href={p.liveUrl} target="_blank">
              Live Demo
            </a>
          ) : null}
          {p.repoUrl ? (
            <a className="text-sm font-semibold text-accent hover:brightness-110" href={p.repoUrl} target="_blank">
              Source Code
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}


