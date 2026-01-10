# Portfolio Web (Frontend)

**React + TypeScript + Vite + TailwindCSS**

This is the frontend application for the portfolio website - a modern, responsive single-page application (SPA) that consumes the Portfolio API.

## 🏗️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS + CSS Modules
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Fetch API
- **State Management**: React Query cache + React hooks

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component
│   ├── app/
│   │   └── router.tsx        # Route definitions
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx      # Landing/hero page
│   │   ├── AboutPage.tsx     # About me page
│   │   ├── ServicesPage.tsx  # Services offered
│   │   ├── ProjectsPage.tsx  # Projects listing
│   │   ├── ProjectDetailPage.tsx
│   │   ├── BlogPage.tsx      # Blog posts listing
│   │   ├── PostDetailPage.tsx
│   │   ├── ContactPage.tsx   # Contact form/info
│   │   ├── AdminLandingPage.tsx
│   │   └── PlaceholderPage.tsx
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Site footer
│   │   ├── SiteLayout.tsx    # Layout wrapper
│   │   ├── Button.tsx        # Custom button
│   │   ├── Card.tsx          # Card component
│   │   ├── LoadingState.tsx  # Loading spinner
│   │   └── ErrorState.tsx    # Error display
│   ├── hooks/                # Custom React hooks
│   │   └── public.ts         # API hooks (useProfile, useProjects, etc.)
│   ├── lib/                  # Utility libraries
│   │   ├── api.ts            # API client configuration
│   │   ├── env.ts            # Environment variables
│   │   └── queryClient.ts    # React Query setup
│   ├── utils/                # Helper functions
│   │   └── cn.ts             # Tailwind class merging
│   └── assets/               # Static assets (images, icons)
├── public/                   # Public static files
├── dist/                     # Production build output
├── index.html                # HTML template
├── .env                      # Environment variables (not in git)
├── env.example               # Example environment configuration
├── tailwind.config.js        # Tailwind configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Hero section with profile info |
| `/about` | AboutPage | About me, skills, education, experience |
| `/services` | ServicesPage | Services offered |
| `/projects` | ProjectsPage | Portfolio projects listing |
| `/projects/:slug` | ProjectDetailPage | Individual project details |
| `/blog` | BlogPage | Blog posts listing |
| `/blog/:slug` | PostDetailPage | Individual blog post |
| `/contact` | ContactPage | Contact information |
| `/admin` | AdminLandingPage | Admin dashboard (future) |

## 🔌 API Integration

The frontend communicates with the backend API through custom React Query hooks:

### Public Hooks (in `hooks/public.ts`)
- `useProfile()` - Fetch profile data
- `useServices()` - Fetch services list
- `useProjects()` - Fetch published projects
- `useProject(slug)` - Fetch single project
- `usePosts()` - Fetch published blog posts
- `usePost(slug)` - Fetch single blog post

### API Client Setup
Configuration in `lib/api.ts` handles:
- Base URL configuration
- Credentials (cookies) management
- Error handling
- Response parsing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend API running (see `apps/api/README.md`)
- npm or pnpm

### Setup

1. **Install dependencies** (from project root):
   ```bash
   npm install
   ```

2. **Configure environment** (optional):
   ```bash
   cd apps/web
   cp env.example .env
   ```
   
   Edit `.env` if you need a custom API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
```

Built files will be in `dist/` directory.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

### TailwindCSS
- Utility-first CSS framework
- Configuration in `tailwind.config.js`
- Custom theme colors, fonts, and breakpoints

### CSS Modules
- Component-specific styles in `*.css` files
- Imported and used in components

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

**Note**: Vite requires `VITE_` prefix for environment variables to be exposed to the client.

## 📦 Shared Package

This app uses `@portfolio/shared` package for:
- TypeScript type definitions (Profile, Project, Post, etc.)
- Ensures type safety with the backend API
- No need to duplicate types

## 🔍 Data Fetching Strategy

### React Query Configuration
- **Stale Time**: 5 minutes (data considered fresh)
- **Cache Time**: 10 minutes (cached data lifetime)
- **Refetch**: On window focus disabled by default
- **Retry**: Automatic retry on failed requests

### Loading States
- `LoadingState` component shown during data fetching
- Skeleton loaders for better UX (can be added)

### Error Handling
- `ErrorState` component displays user-friendly errors
- Network errors are caught and displayed gracefully
- Failed queries can be retried

## 🧪 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR - changes appear immediately without full page reload.

### React DevTools
Install React DevTools browser extension for debugging:
- Component tree inspection
- Props and state viewing
- Performance profiling

### React Query DevTools
React Query DevTools are enabled in development:
- View query cache
- Inspect query states
- Manually trigger refetch

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `apps/web/dist`
4. Set environment variable: `VITE_API_URL`

### Deploy to Static Hosting
Upload contents of `dist/` to:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Any static hosting service

### Environment Variables in Production
Make sure to set `VITE_API_URL` to your production API URL.

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dynamic content from CMS
- ✅ Client-side routing with React Router
- ✅ Optimistic UI updates
- ✅ Automatic data caching and refetching
- ✅ SEO-friendly (can add React Helmet)
- ✅ Fast page loads with Vite
- ✅ TypeScript for type safety

## 🔜 Future Enhancements

- [ ] Admin panel for content management
- [ ] Authentication UI (login form)
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Blog post categories/tags
- [ ] Contact form with email integration
- [ ] Markdown rendering for blog posts
- [ ] Image optimization and lazy loading
- [ ] Progressive Web App (PWA)
- [ ] Analytics integration

## 📝 Code Quality

### Linting
ESLint configured with:
- React hooks rules
- React Refresh rules
- TypeScript ESLint rules

Run lint checks:
```bash
npm run lint
```

### Type Checking
TypeScript strict mode enabled for maximum type safety:
```bash
npm run build  # Includes type checking
```

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on correct port
- Check `VITE_API_URL` in `.env`
- Verify CORS settings in backend

### Build Failures
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Ensure all dependencies are installed

### Styling Issues
- Clear TailwindCSS cache
- Check class name syntax
- Verify `tailwind.config.js` paths
