export function PlaceholderPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="grid gap-3">
      <h1 className="text-3xl font-black">{title}</h1>
      {subtitle ? <p className="text-muted">{subtitle}</p> : null}
    </div>
  );
}


