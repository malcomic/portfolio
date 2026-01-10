import { useState } from "react";
import { HiSearch } from "react-icons/hi";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search articles..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value === "") onSearch(""); // Clear search on empty
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-text placeholder-muted outline-none transition-all focus:border-accent/50 focus:bg-white/10"
      />
      <HiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            onSearch("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-text"
        >
          Clear
        </button>
      )}
    </form>
  );
}

