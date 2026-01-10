import { useMemo, useState } from "react";
import { HiCode, HiDatabase, HiBeaker, HiCog, HiDownload } from "react-icons/hi";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { SkillBar } from "../components/SkillBar";
import { Timeline } from "../components/Timeline";
import { cn } from "../utils/cn";
import { useProfile } from "../hooks/public";

const skillIcons: Record<string, typeof HiCode> = {
  Frontend: HiCode,
  Backend: HiDatabase,
  Testing: HiBeaker,
  Tools: HiCog,
};

export function AboutPage() {
  const q = useProfile();
  const [tab, setTab] = useState<"skills" | "education" | "experience">("skills");

  const tabs = useMemo(
    () => [
      { key: "skills" as const, label: "Skills" },
      { key: "education" as const, label: "Education" },
      { key: "experience" as const, label: "Experience" },
    ],
    [],
  );

  if (q.isLoading) return <LoadingState />;
  if (q.error) return <ErrorState error={q.error} />;

  const profile = q.data;
  const skills = (profile?.aboutSkills ?? []) as Array<{ label?: string; items?: string[] }>;
  const education = (profile?.aboutEducation ?? []) as Array<{ title?: string; subtitle?: string }>;
  const experience = (profile?.aboutExperience ?? []) as Array<{ title?: string; subtitle?: string }>;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-black">About</h1>
          <p className="mt-2 text-muted">{profile?.bio ?? "Add your bio in the admin panel."}</p>
        </div>
        <a href="/Malcom-Rono-Resume.pdf" download>
          <Button>
            <HiDownload className="h-4 w-4" />
            Download CV
          </Button>
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-md border px-3 py-2 text-sm font-semibold transition",
              tab === t.key
                ? "border-accent/40 bg-accent/10 text-text"
                : "border-white/10 bg-white/5 text-muted hover:bg-white/10",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "skills" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {(skills.length ? skills : [{ label: "Skills", items: ["Add items via admin"] }]).map((s, idx) => {
            const Icon = skillIcons[s.label || ""] || HiCode;
            return (
              <Card key={idx}>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-accent" />
                  <div className="text-sm font-semibold text-accent">{s.label ?? "Skills"}</div>
                </div>
                <div className="mt-4 space-y-3">
                  {(s.items ?? []).map((item, i) => (
                    <SkillBar key={item} label={item} percentage={90 - i * 5} delay={i * 0.1} />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      ) : null}

      {tab === "education" ? (
        <Card>
          <Timeline
            items={education.length ? education : [{ title: "Education", subtitle: "Add items via admin" }]}
            type="education"
          />
        </Card>
      ) : null}

      {tab === "experience" ? (
        <Card>
          <Timeline
            items={experience.length ? experience : [{ title: "Experience", subtitle: "Add items via admin" }]}
            type="work"
          />
        </Card>
      ) : null}
    </div>
  );
}


