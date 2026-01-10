import { Card } from "../Card";
import { HiTag } from "react-icons/hi";

interface TagsProps {
  onSelectTag: (tag: string) => void;
  activeTag?: string;
}

export function Tags({ onSelectTag, activeTag }: TagsProps) {
  const tags = [
    "JavaScript", "TypeScript", "React", "Node.js", "CSS", "HTML",
    "API", "Database", "Security", "DevOps", "Tutorial", "Tips",
    "Best Practices", "Web Design", "Performance", "Testing"
  ];

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <HiTag className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-bold uppercase tracking-wider">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              activeTag === tag
                ? "bg-accent text-black"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-text"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </Card>
  );
}

