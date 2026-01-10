# Deployment Guide

This guide covers deploying your portfolio to production. The recommended stack is:
- **Frontend**: Vercel or Netlify
- **Backend**: Render, Railway, or Fly.io
- **Database**: Neon, Supabase, or Railway

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Render (Backend + DB)

**1. Deploy Database (Render PostgreSQL)**
- Go to [Render Dashboard](https://dashboard.render.com)
- New → PostgreSQL
- Copy the "Internal Database URL" (faster for backend on same platform)

**2. Deploy Backend (Render Web Service)**
- New → Web Service → Connect your repo
- Settings:
  - Root Directory: `apps/api`
  - Build Command: `cd ../.. && npm install && npm run build -w packages/shared && npm run build -w apps/api`
  - Start Command: `npm start`
  - Environment:
    ```
    DATABASE_URL=<your-render-postgres-url>
    JWT_SECRET=<generate-random-32-char-string>
    PORT=3001
    CORS_ORIGIN=<your-vercel-url>
    NODE_ENV=production
    ```
- Deploy and note your backend URL (e.g., `https://portfolio-api.onrender.com`)

**3. Run Migrations**
- In Render dashboard → Shell
  ```bash
  npm run prisma:generate
  npm run prisma:migrate
  npm run seed
  ```

**4. Deploy Frontend (Vercel)**
- Import your repo on [Vercel](https://vercel.com)
- Settings:
  - Root Directory: `apps/web`
  - Build Command: `cd ../.. && npm install && npm run build -w packages/shared && npm run build -w apps/web`
  - Output Directory: `apps/web/dist`
  - Environment Variables:
    ```
    VITE_API_URL=https://portfolio-api.onrender.com
    ```
- Deploy!

### Option 2: Netlify (Frontend) + Railway (Backend + DB)

**1. Deploy on Railway**
- Connect repo to [Railway](https://railway.app)
- Add PostgreSQL database (automatic)
- Deploy backend:
  - Root: `apps/api`
  - Build: `cd ../.. && npm install && npm run build -w packages/shared && npm run build -w apps/api`
  - Start: `npm start -w apps/api`
  - Variables:
    ```
    DATABASE_URL=${{Postgres.DATABASE_URL}}
    JWT_SECRET=<random-string>
    CORS_ORIGIN=<your-netlify-url>
    PORT=3001
    ```
- Run migrations in Railway shell or via GitHub Actions

**2. Deploy on Netlify**
- Import repo on [Netlify](https://netlify.com)
- Build settings:
  - Base: `apps/web`
  - Build: `cd ../.. && npm install && npm run build -w packages/shared && npm run build -w apps/web`
  - Publish: `apps/web/dist`
  - Environment:
    ```
    VITE_API_URL=https://your-railway-backend.up.railway.app
    ```

## Environment Variables

### Backend (apps/api/.env)

```env
# Required
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
JWT_SECRET="your-secure-random-secret-min-32-chars"
CORS_ORIGIN="https://your-frontend.vercel.app"
PORT=3001
NODE_ENV="production"

# Optional
ADMIN_EMAIL="your-admin@example.com"
ADMIN_PASSWORD="YourSecurePassword123!"
```

### Frontend (apps/web/.env)

```env
VITE_API_URL="https://your-backend.onrender.com"
```

## Database Providers

### Neon (Recommended - Free Tier)
- Sign up at [neon.tech](https://neon.tech)
- Create project → copy connection string
- Includes branching, auto-scaling, generous free tier

### Supabase (Free Tier)
- Sign up at [supabase.com](https://supabase.com)
- Create project → Database → Connection String (Transaction Mode)
- 500MB free, includes auth/storage if needed later

### Railway (Paid after trial)
- Built-in Postgres when you create a service
- `${{Postgres.DATABASE_URL}}` auto-injected
- $5/month after trial

## Running Migrations in Production

### Method 1: Manual (One-time setup)

Connect to your deployed backend shell and run:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### Method 2: GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run prisma:generate -w apps/api
      - run: npm run prisma:migrate -w apps/api
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

Add `DATABASE_URL` to your repo secrets.

## Post-Deployment Checklist

- [ ] Database is accessible from backend
- [ ] Migrations have run successfully
- [ ] Seed data has been created (admin user)
- [ ] Backend `/health` endpoint returns `{"ok":true}`
- [ ] Frontend can fetch `/public/profile`
- [ ] Admin login works at `/admin/login`
- [ ] CORS is configured (backend accepts requests from frontend origin)
- [ ] Environment variables are set correctly
- [ ] JWT_SECRET is strong and unique (32+ random characters)

## Security Recommendations

1. **Change default admin password** immediately after first login
2. **Use strong JWT_SECRET** (generate with `openssl rand -base64 32`)
3. **Enable HTTPS** (automatic on Vercel/Netlify/Render)
4. **Set secure CORS_ORIGIN** (your actual frontend URL, not "*")
5. **Use environment variables** for all secrets (never commit `.env`)
6. **Review database connection strings** (use "Transaction Mode" for serverless)

## Monitoring & Logs

- **Backend logs**: Check your hosting platform (Render/Railway) dashboard
- **Frontend errors**: Use Vercel/Netlify Analytics or add Sentry
- **Database**: Use Prisma Studio locally or platform GUI

## Scaling Considerations

- **Database**: Start with smallest tier, upgrade if needed
- **Backend**: Render/Railway auto-scale; consider caching (Redis) for high traffic
- **Frontend**: CDN-served, scales automatically on Vercel/Netlify
- **Images**: Use Cloudinary/Uploadcare instead of storing URLs (future enhancement)

## Troubleshooting

### "Connection refused" or CORS errors
- Verify CORS_ORIGIN matches your frontend URL exactly
- Check backend is deployed and accessible
- Ensure VITE_API_URL uses `https://` (not `http://`)

### Database connection errors
- Verify DATABASE_URL is correct
- Check if Prisma Client is generated (`npm run prisma:generate`)
- Ensure database allows connections from your backend's IP

### Admin login fails
- Run seed script: `npm run seed -w apps/api`
- Check JWT_SECRET is set
- Verify cookies are enabled (httpOnly cookies require HTTPS in production)

### Build failures
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Rebuild shared package first: `npm run build -w packages/shared`
- Check Node version (requires 18+)

## Cost Estimates (Free Tiers)

| Service | Free Tier | Paid Starts At |
|---------|-----------|----------------|
| **Vercel** | Unlimited sites, 100GB bandwidth | $20/mo (Pro) |
| **Netlify** | 100GB bandwidth | $19/mo (Pro) |
| **Render** | 750 hrs/mo (1 service), sleeps after 15min | $7/mo (Starter) |
| **Railway** | $5 credit/mo (trial), then pay-as-you-go | ~$5-10/mo typical |
| **Neon** | 0.5GB storage, 3GB transfer | $19/mo (Scale) |
| **Supabase** | 500MB database | $25/mo (Pro) |

**Recommended for zero-cost start**: Vercel + Render (free tier) + Neon

---

Need help? Check the main [README.md](./README.md) or open an issue on GitHub.

