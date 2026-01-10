import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const adminRouter = Router();
adminRouter.use(requireAdmin);

const profileUpsertSchema = z.object({
  heroHello: z.string().min(1),
  heroName: z.string().min(1),
  heroTitle: z.string().min(1),
  heroTagline: z.string().min(1),
  avatarUrl: z.string().url().nullable().optional(),
  bio: z.string().min(1),
  contactEmail: z.string().email().nullable().optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string().min(1),
        label: z.string().optional(),
        url: z.string().url(),
      }),
    )
    .default([]),
  aboutSkills: z.array(z.any()).default([]),
  aboutEducation: z.array(z.any()).default([]),
  aboutExperience: z.array(z.any()).default([]),
});

adminRouter.get("/profile", async (_req, res) => {
  const profile = await prisma.profile.findFirst();
  return res.json(profile);
});

adminRouter.put("/profile", async (req, res) => {
  const parsed = profileUpsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const existing = await prisma.profile.findFirst();
  const data = parsed.data;

  const profile = existing
    ? await prisma.profile.update({ where: { id: existing.id }, data })
    : await prisma.profile.create({ data });

  return res.json(profile);
});

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().nullable().optional(),
  order: z.coerce.number().int().min(0).default(0),
});

adminRouter.get("/services", async (_req, res) => {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return res.json(services);
});

adminRouter.post("/services", async (req, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const created = await prisma.service.create({ data: parsed.data });
  return res.status(201).json(created);
});

adminRouter.put("/services/:id", async (req, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const updated = await prisma.service.update({ where: { id: req.params.id }, data: parsed.data });
  return res.json(updated);
});

adminRouter.delete("/services/:id", async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  return res.json({ ok: true });
});

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  techStack: z.array(z.string().min(1)).default([]),
  coverImageUrl: z.string().url().nullable().optional(),
  repoUrl: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  body: z.string().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

adminRouter.get("/projects", async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return res.json(projects);
});

adminRouter.post("/projects", async (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const data = { ...parsed.data, publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null };
  const created = await prisma.project.create({ data });
  return res.status(201).json(created);
});

adminRouter.put("/projects/:id", async (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const data = { ...parsed.data, publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null };
  const updated = await prisma.project.update({ where: { id: req.params.id }, data });
  return res.json(updated);
});

adminRouter.delete("/projects/:id", async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  return res.json({ ok: true });
});

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().nullable().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

adminRouter.get("/posts", async (_req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return res.json(posts);
});

adminRouter.post("/posts", async (req, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const data = { ...parsed.data, publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null };
  const created = await prisma.post.create({ data });
  return res.status(201).json(created);
});

adminRouter.put("/posts/:id", async (req, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const data = { ...parsed.data, publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null };
  const updated = await prisma.post.update({ where: { id: req.params.id }, data });
  return res.json(updated);
});

adminRouter.delete("/posts/:id", async (req, res) => {
  await prisma.post.delete({ where: { id: req.params.id } });
  return res.json({ ok: true });
});


