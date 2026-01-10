import { Card } from "../Card";
import { HiFolder } from "react-icons/hi";

interface Category {
  name: string;
  count: number;
  color: string;
}

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string;
}

export function Categories({ onSelectCategory, activeCategory }: CategoriesProps) {
  const categories: Category[] = [
    { name: "Web Development", count: 12, color: "text-blue-400" },
    { name: "JavaScript", count: 8, color: "text-yellow-400" },
    { name: "React", count: 6, color: "text-cyan-400" },
    { name: "Cybersecurity", count: 5, color: "text-red-400" },
    { name: "Best Practices", count: 7, color: "text-green-400" },
    { name: "Tutorials", count: 9, color: "text-purple-400" },
    { name: "Career", count: 4, color: "text-pink-400" },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name}>
            <button
              onClick={() => onSelectCategory(category.name)}
              className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-all ${
                activeCategory === category.name
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-white/5 hover:text-text"
              }`}
            >
              <span className="flex items-center gap-2">
                <HiFolder className={`h-4 w-4 ${category.color}`} />
                <span>{category.name}</span>
              </span>
              <span className="text-xs opacity-60">({category.count})</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

