import { Router } from "express";
import { prisma } from "../prisma.js";
import type { Service, Project, Post } from "@prisma/client";

export const publicRouter = Router();

publicRouter.get("/profile", async (_req, res) => {
  const profile = await prisma.profile.findFirst();
  if (!profile) return res.json(null);

  return res.json({
    heroHello: profile.heroHello,
    heroName: profile.heroName,
    heroTitle: profile.heroTitle,
    heroTagline: profile.heroTagline,
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    contactEmail: profile.contactEmail,
    socialLinks: profile.socialLinks,
    aboutSkills: profile.aboutSkills,
    aboutEducation: profile.aboutEducation,
    aboutExperience: profile.aboutExperience,
  });
});

publicRouter.get("/services", async (_req, res) => {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return res.json(
    services.map((s: Service) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      icon: s.icon,
      order: s.order,
    })),
  );
});

publicRouter.get("/projects", async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return res.json(
    projects.map((p: Project) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      techStack: p.techStack,
      coverImageUrl: p.coverImageUrl,
      repoUrl: p.repoUrl,
      liveUrl: p.liveUrl,
      body: p.body,
      publishedAt: p.publishedAt?.toISOString() ?? null,
    })),
  );
});

publicRouter.get("/projects/:slug", async (req, res) => {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
  if (!project) return res.status(404).json({ error: "Not found" });
  return res.json({
    id: project.id,
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    techStack: project.techStack,
    coverImageUrl: project.coverImageUrl,
    repoUrl: project.repoUrl,
    liveUrl: project.liveUrl,
    body: project.body,
    publishedAt: project.publishedAt?.toISOString() ?? null,
  });
});

publicRouter.get("/posts", async (_req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return res.json(
    posts.map((p: Post) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      body: p.body,
      coverImageUrl: p.coverImageUrl,
      publishedAt: p.publishedAt?.toISOString() ?? null,
    })),
  );
});

publicRouter.get("/posts/:slug", async (req, res) => {
  const post = await prisma.post.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ error: "Not found" });
  return res.json({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    coverImageUrl: post.coverImageUrl,
    publishedAt: post.publishedAt?.toISOString() ?? null,
  });
});


