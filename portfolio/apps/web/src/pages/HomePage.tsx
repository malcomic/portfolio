import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { AnimatedSection, StaggerChildren, staggerItem } from "../components/AnimatedSection";
import { useProfile, useProjects, useServices, usePosts } from "../hooks/public";

export function HomePage() {
  const profileQ = useProfile();
  const servicesQ = useServices();
  const projectsQ = useProjects();
  const postsQ = usePosts();

  if (profileQ.isLoading) return <LoadingState />;
  if (profileQ.error) return <ErrorState error={profileQ.error} />;

  const profile = profileQ.data;

  return (
    <div className="grid gap-10">
      <AnimatedSection>
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold text-muted">{profile?.heroHello ?? "Hello, I'm"}</div>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              <span className="text-accent">{profile?.heroName ?? "Malcom Rono"}</span>
              <span className="block text-2xl font-extrabold text-text/90 sm:text-3xl">{profile?.heroTitle ?? ""}</span>
            </h1>
            <p className="mt-5 max-w-prose text-muted">
              {profile?.heroTagline ??
                "I create beautiful, functional digital experiences that help businesses grow and succeed in the online world."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects">
                <Button>View My Work</Button>
              </Link>
              <a href="/Malcom-Rono-Resume.pdf" download>
                <Button variant="ghost">
                  <HiDownload className="h-4 w-4" />
                  Download CV
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="ghost">Contact Me</Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-accent/10 blur-2xl" />
            <Card className="overflow-hidden p-0">
              {profile?.avatarUrl ? (
                <img className="aspect-[4/3] w-full object-cover" src={profile.avatarUrl} alt="Portrait" />
              ) : (
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-white/10 to-white/5" />
              )}
            </Card>
            <div className="mt-3 text-xs text-muted">Malcom Rono.</div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="grid gap-4">
          <h2 className="text-xl font-bold">Services</h2>
          <StaggerChildren className="grid gap-4 md:grid-cols-3">
            {servicesQ.isLoading ? (
              <LoadingState label="Loading services…" />
            ) : servicesQ.error ? (
              <ErrorState error={servicesQ.error} />
            ) : (
              (servicesQ.data ?? []).slice(0, 3).map((s) => (
                <motion.div key={s.id} variants={staggerItem}>
                  <Card>
                    <div className="text-sm font-semibold text-accent">{s.title}</div>
                    <p className="mt-2 text-sm text-muted">{s.description}</p>
                  </Card>
                </motion.div>
              ))
            )}
          </StaggerChildren>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Portfolio</h2>
            <Link className="text-sm font-semibold text-accent hover:brightness-110" to="/projects">
              View all
            </Link>
          </div>
          <StaggerChildren className="grid gap-4 md:grid-cols-3">
            {projectsQ.isLoading ? (
              <LoadingState label="Loading projects…" />
            ) : projectsQ.error ? (
              <ErrorState error={projectsQ.error} />
            ) : (
              (projectsQ.data ?? []).slice(0, 3).map((p) => (
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
              ))
            )}
          </StaggerChildren>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Blog Posts</h2>
            <Link className="text-sm font-semibold text-accent hover:brightness-110" to="/blog">
              View all
            </Link>
          </div>
          <StaggerChildren className="grid gap-4 md:grid-cols-3">
            {postsQ.isLoading ? (
              <LoadingState label="Loading posts…" />
            ) : postsQ.error ? (
              <ErrorState error={postsQ.error} />
            ) : (
              (postsQ.data ?? []).slice(0, 3).map((post) => (
                <motion.div key={post.id} variants={staggerItem}>
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden p-0">
                      {/* Blog Image */}
                      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                        {post.coverImageUrl ? (
                          <img
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            src={post.coverImageUrl}
                            alt={post.title}
                            onError={(e) => {
                              e.currentTarget.src = `https://via.placeholder.com/600x400/0C1111/22C55E?text=${encodeURIComponent(post.title)}`;
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                            <div className="text-4xl">📝</div>
                          </div>
                        )}
                      </div>

                      {/* Blog Info */}
                      <div className="p-4">
                        <div className="mb-1 text-xs text-accent">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                        </div>
                        <div className="line-clamp-2 text-sm font-semibold">{post.title}</div>
                        <div className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </StaggerChildren>
        </section>
      </AnimatedSection>
    </div>
  );
}


