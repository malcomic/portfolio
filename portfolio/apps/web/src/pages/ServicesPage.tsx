import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useServices } from "../hooks/public";

export function ServicesPage() {
  const q = useServices();
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Services</h1>
        <p className="mt-2 text-muted">What I can help you build.</p>
      </div>

      {q.isLoading ? <LoadingState /> : null}
      {q.error ? <ErrorState error={q.error} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {(q.data ?? []).map((s) => (
          <Card key={s.id}>
            <div className="text-sm font-semibold text-accent">{s.title}</div>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


