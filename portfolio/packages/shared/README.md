# @portfolio/shared

**Shared TypeScript types and Zod validation schemas**

This package contains shared code used by both the frontend (`apps/web`) and backend (`apps/api`) to ensure type safety and consistent validation across the entire application.

## 📦 What's Inside

### TypeScript Types (`types.ts`)
Reusable TypeScript type definitions for all data models:

- `Id` - String identifier type
- `SocialLink` - Social media link structure
- `ProfilePublic` - User profile data
- `ServicePublic` - Service offering data
- `ProjectPublic` - Portfolio project data
- `PostPublic` - Blog post data

### Zod Schemas (`schemas.ts`)
Runtime validation schemas using Zod:

- `socialLinkSchema` - Validates social link objects
- `profilePublicSchema` - Validates profile data
- `servicePublicSchema` - Validates service data
- `projectPublicSchema` - Validates project data
- `postPublicSchema` - Validates blog post data
- `loginSchema` - Validates login credentials

## 🎯 Purpose

### Type Safety
- **Frontend**: Type-safe API responses and data handling
- **Backend**: Type-safe database queries and API responses
- **Shared**: Single source of truth for all data structures

### Runtime Validation
- Backend validates incoming request data using Zod schemas
- Ensures data integrity before database operations
- Provides clear error messages for invalid data

### DRY Principle
- No duplicate type definitions
- Changes propagate to both frontend and backend
- Reduces maintenance burden

## 📁 Structure

```
packages/shared/
├── src/
│   ├── index.ts       # Main exports
│   ├── types.ts       # TypeScript type definitions
│   └── schemas.ts     # Zod validation schemas
├── dist/              # Compiled output
│   ├── index.js       # Compiled JavaScript
│   └── index.d.ts     # Type declarations
├── package.json       # Package configuration
└── tsconfig.json      # TypeScript config
```

## 🔧 Usage

### In Backend (`apps/api`)

**Validate incoming data:**
```typescript
import { loginSchema, projectPublicSchema } from "@portfolio/shared";

// Validate login request
const result = loginSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: result.error });
}
const { email, password } = result.data;

// Validate project data before saving
const projectData = projectPublicSchema.parse(req.body);
await prisma.project.create({ data: projectData });
```

**Type database queries:**
```typescript
import { ProjectPublic, PostPublic } from "@portfolio/shared";

const projects: ProjectPublic[] = await prisma.project.findMany({
  where: { publishedAt: { not: null } }
});
```

### In Frontend (`apps/web`)

**Type API responses:**
```typescript
import { ProfilePublic, ProjectPublic, PostPublic } from "@portfolio/shared";

// Type-safe API hook
export function useProfile() {
  return useQuery<ProfilePublic>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await apiClient.get("/api/profile");
      return await res.json();
    },
  });
}

// Type-safe component props
interface ProjectCardProps {
  project: ProjectPublic;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div>{project.techStack.join(", ")}</div>
    </div>
  );
}
```

## 🛠️ Development

### Build Package
```bash
npm run build
```

Compiles TypeScript to JavaScript and generates type declarations.

### Watch Mode
```bash
npm run dev
```

Rebuilds automatically on file changes - useful during development.

### Type Check
```bash
npm run typecheck
```

Checks types without emitting files.

## 📦 Package Configuration

### Exports
- **Main**: `dist/index.js` (ESM)
- **Types**: `dist/index.d.ts`

### Dependencies
- `zod` - Runtime validation library

### Dev Dependencies
- `tsup` - TypeScript bundler (fast, zero-config)
- `typescript` - TypeScript compiler

## 🔄 Build System

This package uses **tsup** for bundling:
- Fast compilation
- Automatic `.d.ts` generation
- ESM output format
- Watch mode for development

## 🎨 Type Examples

### Profile Type
```typescript
type ProfilePublic = {
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
```

### Project Type
```typescript
type ProjectPublic = {
  id: string;
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
```

### Social Link Type
```typescript
type SocialLink = {
  platform: "github" | "linkedin" | "twitter" | "instagram" | 
            "facebook" | "youtube" | "website" | "other";
  label?: string;
  url: string;
};
```

## ✅ Validation Examples

### Login Schema
```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Valid
loginSchema.parse({
  email: "user@example.com",
  password: "password123"
}); // ✅

// Invalid - throws ZodError
loginSchema.parse({
  email: "invalid-email",
  password: "short"
}); // ❌
```

### Project Schema
```typescript
const projectPublicSchema = z.object({
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
```

## 🔗 Workspace Integration

This package is part of an npm workspace:

```json
// Root package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

Both apps automatically have access via:
```json
{
  "dependencies": {
    "@portfolio/shared": "^0.1.0"
  }
}
```

## 🚀 Adding New Types

1. **Add TypeScript type** in `src/types.ts`:
```typescript
export type NewFeature = {
  id: string;
  name: string;
  // ... other fields
};
```

2. **Add Zod schema** in `src/schemas.ts`:
```typescript
export const newFeatureSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  // ... match the type
});
```

3. **Export from index** in `src/index.ts` (if needed):
```typescript
export * from "./schemas";
export * from "./types";
```

4. **Rebuild package**:
```bash
npm run build
```

5. **Use in apps** - types are now available!

## 📋 Best Practices

### 1. Keep Types and Schemas in Sync
- Every type should have a corresponding Zod schema
- Schemas should exactly match type structure
- Use `z.infer<typeof schema>` to derive types from schemas if needed

### 2. Use Public-Facing Types
- Types are designed for API responses
- Don't expose internal database fields (like `passwordHash`)
- Suffix types with `Public` to indicate API-safe data

### 3. Validate at Boundaries
- **Backend**: Validate all incoming request data
- **Frontend**: Use types for API responses (validated by backend)

### 4. Version Carefully
- Changes to types/schemas affect both apps
- Consider backward compatibility
- Test both frontend and backend after changes

## 🔧 Troubleshooting

### Type Errors After Changes
```bash
# Rebuild shared package
npm -w packages/shared run build

# Restart dev servers
npm run dev:api
npm run dev:web
```

### Import Errors
- Ensure package is built: `npm -w packages/shared run build`
- Check workspace is installed: `npm install`
- Verify import path: `@portfolio/shared`

### Zod Version Mismatch
All packages should use the same Zod version. Check `package.json` files.

## 📚 Resources

- [Zod Documentation](https://zod.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [tsup Documentation](https://tsup.egoist.dev/)

## 🎯 Benefits

✅ **Type Safety**: Catch errors at compile time  
✅ **Runtime Validation**: Catch errors at runtime  
✅ **Single Source of Truth**: No duplicate definitions  
✅ **Maintainability**: Change once, update everywhere  
✅ **Developer Experience**: Autocomplete and IntelliSense  
✅ **API Contract**: Clear contract between frontend and backend  

---

This shared package is the **glue** that keeps the frontend and backend in perfect sync! 🎯

