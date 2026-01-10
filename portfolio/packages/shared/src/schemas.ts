import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.enum(["github", "linkedin", "twitter", "instagram", "facebook", "youtube", "website", "other"]),
  label: z.string().optional(),
  url: z.string().url(),
});

export const profilePublicSchema = z.object({
  heroHello: z.string().min(1),
  heroName: z.string().min(1),
  heroTitle: z.string().min(1),
  heroTagline: z.string().min(1),
  avatarUrl: z.string().url().nullable().optional(),
  bio: z.string().min(1),
  contactEmail: z.string().email().nullable().optional(),
  socialLinks: z.array(socialLinkSchema),
  aboutSkills: z.array(z.unknown()).optional(),
  aboutEducation: z.array(z.unknown()).optional(),
  aboutExperience: z.array(z.unknown()).optional(),
});

export const servicePublicSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().nullable().optional(),
  order: z.number().int().min(0),
});

export const projectPublicSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  techStack: z.array(z.string().min(1)),
  coverImageUrl: z.string().url().nullable().optional(),
  repoUrl: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  body: z.string().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

export const postPublicSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().nullable().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


