# Portfolio API

Node.js + Express + Prisma + PostgreSQL API for the portfolio CMS.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

## Database Setup

You have several options for running PostgreSQL:

### Option 1: Docker (Recommended for Local Development)

```bash
docker run --name portfolio-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  -d postgres:16
```

### Option 2: Cloud Database (Recommended for Production)

- **Neon** (https://neon.tech) - Free PostgreSQL with generous limits
- **Supabase** (https://supabase.com) - Free tier with 500MB database
- **Railway** (https://railway.app) - Simple deployment + database
- **Render** (https://render.com) - Free PostgreSQL (expires after 90 days)

Copy your connection string and update `DATABASE_URL` in `.env`.

### Option 3: Local PostgreSQL Installation

Install PostgreSQL locally and create a database:

```bash
createdb portfolio
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
JWT_SECRET="your-secure-random-secret-here"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

## Installation & Setup

From the monorepo root:

```bash
npm install
```

Then run migrations and seed:

```bash
cd apps/api
npm run prisma:migrate
npm run seed
```

## Development

Start the API server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## Default Admin Credentials

After seeding, you can log in with:

- **Email**: `admin@local.dev`
- **Password**: `ChangeMe123!`

**⚠️ Change these immediately in production!**

## API Endpoints

### Public Endpoints (No Auth Required)

- `GET /public/profile` - Get profile/hero content
- `GET /public/services` - List all services
- `GET /public/projects` - List all projects
- `GET /public/projects/:slug` - Get single project
- `GET /public/posts` - List all blog posts
- `GET /public/posts/:slug` - Get single post

### Auth Endpoints

- `POST /auth/login` - Login (returns JWT in httpOnly cookie)
- `GET /auth/me` - Get current admin user
- `POST /auth/logout` - Logout

### Admin Endpoints (Requires Auth)

- `PATCH /admin/profile` - Update profile
- `POST /admin/services` - Create service
- `PATCH /admin/services/:id` - Update service
- `DELETE /admin/services/:id` - Delete service
- `POST /admin/projects` - Create project
- `PATCH /admin/projects/:id` - Update project
- `DELETE /admin/projects/:id` - Delete project
- `POST /admin/posts` - Create post
- `PATCH /admin/posts/:id` - Update post
- `DELETE /admin/posts/:id` - Delete post

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed the database
npm run seed
```

## Build & Production

```bash
npm run build
npm start
```

Make sure to set proper environment variables in production and use a secure `JWT_SECRET`.
