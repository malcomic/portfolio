export type Id = string;

export type SocialLink = {
  platform: "github" | "linkedin" | "twitter" | "instagram" | "facebook" | "youtube" | "website" | "other";
  label?: string;
  url: string;
};

export type ProfilePublic = {
  heroHello: string;
  heroName: string;
  heroTitle: string;
  heroTagline: string;
  avatarUrl?: string | null;
  bio: string;
  contactEmail?: string | null;
  socialLinks: SocialLink[];
  aboutSkills?: unknown[];
  aboutEducation?: unknown[];
  aboutExperience?: unknown[];
};

export type ServicePublic = {
  id: Id;
  title: string;
  description: string;
  icon?: string | null;
  order: number;
};

export type ProjectPublic = {
  id: Id;
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
  coverImageUrl?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  body?: string | null;
  publishedAt?: string | null;
};

export type PostPublic = {
  id: Id;
  title: string;
  slug: string;
  excerpt: string;
  body?: string | null;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};

// Admin types (with timestamps and full fields)
export type AdminUser = {
  id: Id;
  email: string;
};

export type Profile = ProfilePublic & {
  id?: Id;
  createdAt?: string;
  updatedAt?: string;
};

export type Service = ServicePublic & {
  createdAt?: string;
  updatedAt?: string;
};

export type Project = ProjectPublic & {
  createdAt?: string;
  updatedAt?: string;
};

export type Post = PostPublic & {
  createdAt?: string;
  updatedAt?: string;
};

export type LoginData = {
  email: string;
  password: string;
};


