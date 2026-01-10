export function ErrorState({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : "Something went wrong";
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
      {message}
    </div>
  );
}


