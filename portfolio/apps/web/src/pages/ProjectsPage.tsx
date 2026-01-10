import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { StaggerChildren, staggerItem } from "../components/AnimatedSection";
import { cn } from "../utils/cn";
import { useProjects } from "../hooks/public";

export function ProjectsPage() {
  const q = useProjects();
  const [filter, setFilter] = useState<string>("all");

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    (q.data ?? []).forEach((p) => p.techStack.forEach((t) => techs.add(t)));
    return ["all", ...Array.from(techs).sort()];
  }, [q.data]);

  const filtered = useMemo(() => {
    if (filter === "all") return q.data ?? [];
    return (q.data ?? []).filter((p) => p.techStack.includes(filter));
  }, [q.data, filter]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Portfolio</h1>
        <p className="mt-2 text-muted">A few things I've built recently.</p>
      </div>

      {q.isLoading ? <LoadingState /> : null}
      {q.error ? <ErrorState error={q.error} /> : null}

      {allTechs.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {allTechs.map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setFilter(tech)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-semibold transition-all",
                filter === tech
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-white/10 bg-white/5 text-muted hover:bg-white/10",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech === "all" ? "All" : tech}
            </motion.button>
          ))}
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <StaggerChildren key={filter} className="grid gap-4 md:grid-cols-3">
          {filtered.map((p) => (
            <motion.div key={p.id} variants={staggerItem}>
              <Link to={`/projects/${p.slug}`}>
                <Card className="h-full overflow-hidden p-0">
                  {/* Project Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                    {p.coverImageUrl ? (
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        src={p.coverImageUrl}
                        alt={p.title}
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/600x400/0C1111/22C55E?text=${encodeURIComponent(p.title)}`;
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                        <div className="text-center p-4">
                          <div className="text-4xl font-black text-accent/30">{p.title.charAt(0)}</div>
                          <div className="mt-2 text-xs text-muted">{p.techStack[0]}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted">
                          +{p.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>
      </AnimatePresence>
    </div>
  );
}


