# Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Database

### Option A: Docker (Easiest for local dev)

```bash
docker run --name portfolio-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  -d postgres:16
```

### Option B: Cloud Database (Free)

- **Neon**: https://neon.tech (recommended)
- **Supabase**: https://supabase.com
- Copy your connection string

## 3. Configure Environment

Create **`apps/api/.env`**:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
JWT_SECRET="dev-secret-change-in-production"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

Create **`apps/web/.env`**:

```env
VITE_API_URL=http://localhost:3001
```

## 4. Set Up Database Schema

```bash
cd apps/api
npm run prisma:generate
npm run prisma:migrate
npm run seed
cd ../..
```

## 5. Start Development Servers

Open **two terminals**:

**Terminal 1 - Backend:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev:web
```

## 6. Access Your Portfolio

- **Frontend**: http://localhost:5173
- **API Health**: http://localhost:3001/health
- **Admin Panel**: http://localhost:5173/admin/login

### Default Admin Credentials

- **Email**: `admin@local.dev`
- **Password**: `ChangeMe123!`

## 7. Edit Your Content

1. Go to `/admin/login` and log in
2. Navigate to **Profile** to edit your hero section and bio
3. Add/edit **Services**, **Projects**, and **Blog Posts**
4. Changes appear immediately on the public pages!

## Next Steps

- **Customize theme**: Edit `apps/web/tailwind.config.js` (change accent color)
- **Add your photo**: Upload image to Cloudinary/Imgur, paste URL in Profile > Avatar URL
- **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- **Content**: Use the admin panel to manage all your portfolio content

## Troubleshooting

### Database connection failed
- Verify Docker container is running: `docker ps`
- Or check your cloud database connection string

### Port already in use
- API: Change `PORT` in `apps/api/.env`
- Web: Vite will auto-increment (usually 5174)

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Prisma errors
```bash
cd apps/api
npm run prisma:generate
npm run prisma:migrate
cd ../..
```

## Project Structure

```
portfolio/
├── apps/
│   ├── api/          # Express + Prisma backend
│   └── web/          # React frontend
├── packages/
│   └── shared/       # Shared types
├── README.md         # Full documentation
├── DEPLOYMENT.md     # Production deployment guide
└── ARCHITECTURE.md   # Technical architecture
```

## Helpful Commands

```bash
# Development
npm run dev:web       # Start React dev server
npm run dev:api       # Start Express dev server

# Build
npm run build         # Build all packages

# Database
npm run prisma:studio -w apps/api    # Open Prisma Studio GUI
npm run seed -w apps/api             # Re-seed database

# Type-checking
npm run typecheck     # Check types across all packages
```

## Need Help?

- Check [README.md](./README.md) for full docs
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting options
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details

---

**Built by Malcom Rono** • Styled after GLINT template • React + Node + PostgreSQL

