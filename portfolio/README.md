# Malcom Rono Portfolio

Modern portfolio website with React frontend and Node.js CMS backend. Built with TypeScript, Tailwind CSS, Express, Prisma, and PostgreSQL.

## 🎨 Design

Dark theme with neon-green accent inspired by the GLINT template. Clean, modern interface optimized for portfolio showcase.

## 🏗️ Architecture

**Monorepo structure:**

- `apps/web/` - React + Vite + TailwindCSS frontend
- `apps/api/` - Express + Prisma backend with admin CMS
- `packages/shared/` - Shared TypeScript types and Zod schemas

## ✨ Features

- **Multi-page routing**: Home, About, Services, Projects, Blog, Contact
- **CMS Admin Panel**: Login and edit all content (profile, services, projects, blog posts)
- **Type-safe API**: End-to-end TypeScript with Zod validation
- **Modern UI**: Dark theme, smooth animations, responsive design
- **SEO-friendly**: Clean slugs, meta tags, semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (see [Database Setup](#database-setup))

### Installation

```bash
# Install all dependencies
npm install

# Build shared package
npm run build -w packages/shared
```

### Database Setup

You need a PostgreSQL database. Choose one:

1. **Docker** (easiest for local dev):
   ```bash
   docker run --name portfolio-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:16
   ```

2. **Cloud** (recommended for production):
   - [Neon](https://neon.tech) - Free PostgreSQL
   - [Supabase](https://supabase.com) - Free tier
   - [Railway](https://railway.app) or [Render](https://render.com)

3. **Local** Postgres installation

### Environment Setup

Create `.env` files:

**`apps/api/.env`:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
JWT_SECRET="your-secret-key-here"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

**`apps/web/.env`:**
```env
VITE_API_URL=http://localhost:3001
```

### Run Migrations & Seed

```bash
cd apps/api
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### Start Development Servers

Open two terminals:

**Terminal 1 - API:**
```bash
npm run dev:api
```

**Terminal 2 - Web:**
```bash
npm run dev:web
```

Visit:
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

### Default Admin Login

After seeding:
- Email: `admin@local.dev`
- Password: `ChangeMe123!`

Navigate to `/admin` to edit content.

## 📦 Scripts

From monorepo root:

```bash
npm run dev:web        # Start React dev server
npm run dev:api        # Start Express dev server
npm run build          # Build all packages
npm run lint           # Lint web app
npm run typecheck      # Type-check all packages
```

## 🗂️ Project Structure

```
portfolio/
├── apps/
│   ├── api/                # Express API
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── src/
│   │       ├── routes/     # Auth, public, admin routes
│   │       ├── lib/        # Auth, env helpers
│   │       ├── middleware/
│   │       └── index.ts
│   └── web/                # React SPA
│       └── src/
│           ├── app/        # Router
│           ├── components/ # UI components
│           ├── pages/      # Route pages
│           ├── hooks/      # Data fetching hooks
│           └── lib/        # API client, React Query
└── packages/
    └── shared/             # Shared types & schemas
        └── src/
            ├── types.ts
            └── schemas.ts
```

## 🚀 Deployment

### Frontend (Vercel / Netlify)

1. Connect your repo
2. Set build command: `npm run build -w apps/web`
3. Set output directory: `apps/web/dist`
4. Add environment variable: `VITE_API_URL=https://your-api.com`

### Backend (Render / Railway / Fly.io)

1. Connect your repo
2. Set build command: `npm install && npm run build -w packages/shared && npm run build -w apps/api`
3. Set start command: `npm start -w apps/api`
4. Set root directory: `apps/api`
5. Add environment variables:
   - `DATABASE_URL` (from your cloud database provider)
   - `JWT_SECRET` (generate a secure random string)
   - `CORS_ORIGIN` (your frontend URL)
   - `PORT` (usually auto-set by platform)

### Database (Neon / Supabase)

Use a managed PostgreSQL service. Copy the connection string to `DATABASE_URL` in your backend environment.

## 📝 Content Management

1. Log in at `/admin` with your admin credentials
2. Edit:
   - **Profile**: Hero section, bio, avatar, social links, skills, education, experience
   - **Services**: Add/edit/delete service offerings
   - **Projects**: Portfolio items with slug, tech stack, images, links
   - **Blog Posts**: Create posts with slug, excerpt, body content

All changes reflect immediately on the public pages.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query
- **Backend**: Node.js, Express, TypeScript, Prisma, JWT auth, Zod validation
- **Database**: PostgreSQL
- **Tooling**: npm workspaces, ESLint, tsup

## 📄 License

MIT

---

**Built by Malcom Rono**
