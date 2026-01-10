import { Card } from "../Card";
import { HiCalendar } from "react-icons/hi";

interface ArchiveProps {
  posts: Array<{ publishedAt: string | null }>;
  onSelectMonth: (month: string) => void;
}

export function Archive({ posts, onSelectMonth }: ArchiveProps) {
  // Group posts by month
  const archiveData = posts
    .filter((p) => p.publishedAt)
    .reduce((acc: Record<string, number>, post) => {
      const date = new Date(post.publishedAt!);
      const monthYear = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

  const sortedArchive = Object.entries(archiveData)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 6);

  if (sortedArchive.length === 0) return null;

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <HiCalendar className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Archive</h3>
      </div>
      <ul className="space-y-2">
        {sortedArchive.map(([monthYear, count]) => (
          <li key={monthYear}>
            <button
              onClick={() => onSelectMonth(monthYear)}
              className="group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-muted transition-all hover:bg-white/5 hover:text-text"
            >
              <span>{monthYear}</span>
              <span className="text-xs opacity-60">({count})</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

