# SCEX Application Suite

A comprehensive warehouse management suite with SSO authentication, providing a centralized hub for accessing SCEX custom applications and external platforms with detailed usage guides for team collaboration.

## Project Structure

```
src/
  ├── app/                    # Next.js App Router (pages, layouts, API routes)
  │   ├── layout.tsx         # Root layout with theme provider
  │   ├── page.tsx           # Home page - App directory with info modals
  │   ├── globals.css        # Global styles & theme CSS variables
  │   ├── pick-location-calculator/  # Calculator feature page
  │   └── api/               # Backend API routes
  │       ├── auth/[...nextauth]/   # NextAuth.js authentication
  │       └── trpc/[trpc]/   # tRPC API endpoint router
  │
  ├── components/            # Reusable React components
  │   ├── theme-provider.tsx # Dark/light theme context
  │   ├── theme-toggle.tsx   # Theme switcher UI
  │   └── ui/                # Shadcn/ui component library
  │
  ├── lib/                   # Client-side utilities
  │   ├── trpc-client.tsx    # tRPC + React Query setup
  │   └── utils.ts           # Helper functions (cn, etc.)
  │
  ├── server/                # Server-side logic
  │   ├── api/               # tRPC routers and context
  │   ├── auth.ts            # NextAuth configuration
  │   └── db.ts              # Prisma client instance
  │
  └── env.ts                 # Environment variable validation

public/
  └── branding/              # SCEX logos and mascot assets

prisma/
  ├── schema.prisma         # Database models (NextAuth + Feedback)
  └── prisma.config.ts      # Prisma configuration

tests/
  ├── unit/                  # Vitest unit tests
  └── e2e/                   # Playwright E2E tests
```

**Tech Stack:** Next.js 16, React 19, TypeScript, tRPC, Prisma, PostgreSQL (Vercel Postgres/Neon), NextAuth.js, Tailwind CSS, shadcn/ui

## 🚀 Production Deployment

**Production URL:** https://scex-application-suite.vercel.app/

**Aliases:**

- https://scex-application-suite-willem4130s-projects.vercel.app
- https://scex-application-suite-git-main-willem4130s-projects.vercel.app

**Deployment Process:**

- Connected to GitHub repo: `willem4130/SSO_WarehouseSuite_Frontend_v1`
- Auto-deploys on every push to `main` branch
- Build time: ~1-2 minutes
- Database migrations run automatically via `prisma generate` in build command

**Manual Deployment (if GitHub webhook fails):**

```bash
vercel --prod --force --scope willem4130s-projects --yes
```

**⚠️ IMPORTANT:**

- **ONLY** use https://scex-application-suite.vercel.app/ for production
- If you see a project named "ssowhsuitev1" in Vercel dashboard, DELETE IT (redundant duplicate)
- Any other Vercel projects pointing to this repo should be removed

## Key Features

### Feedback & Issue Tracking System

- **User Submission**: All app tiles have feedback buttons for users to submit bugs, features, issues, questions, and improvements
- **Admin Dashboard**: Fullscreen modal (98vw × 98vh) with filtering by status/type, responses, and status management
- **Components**: `FeedbackModal` (user submission), `FeedbackAdminModal` (admin dashboard)
- **Backend**: tRPC router at `src/server/api/routers/feedback.ts` with CRUD operations
- **Database**: Prisma models for `Feedback` and `FeedbackResponse` in `schema.prisma`

### GitHub Integration

- **Repo Stats**: Displays lines of code and dev hours for custom builds
- **Releases**: Shows latest 5 GitHub releases with dates and notes in app info modals
- **API Route**: `src/app/api/repo-stats/route.ts` fetches data from GitHub API
- **Static Data**: `src/data/repo-stats.ts` stores stats (manual updates via UpdateStatsButton)
- **Environment**: Requires `GITHUB_TOKEN` in `.env.local` and Vercel environment

### Interactive App Tiles

- **Clickable Stats**: Complexity/Interfaces/Repo stats section opens AppInfoModal on click
- **Hover Animations**: Scale effects, background changes, and color transitions for better UX
- **Status Badges**: Production/In Progress/Beta with color coding
- **Complexity Rating**: 0-100% color-coded badges (Purple 91-100%, Red 76-90%, Orange 61-75%, Blue 41-60%, Green 0-40%)

### Database & Authentication

- **PostgreSQL**: Vercel Postgres (Neon) for production
- **Database Name**: `sso-warehouse-db`
- **Models**: NextAuth (Account, Session, User, VerificationToken) + Feedback system
- **Migration**: Use `npx prisma db push` for development, `npx prisma migrate deploy` for production

## Organization Rules

**Keep code organized and modularized:**

- API routes → `app/api/`, one route per resource
- Pages → `app/[route]/page.tsx`, use App Router conventions
- Components → `components/`, one component per file
- UI components → `components/ui/`, managed by shadcn/ui CLI
- Server logic → `server/`, grouped by functionality (auth, db, api)
- Types → Co-locate with usage or in separate `.types.ts` files
- Tests → `tests/unit/` or `tests/e2e/`, mirror src structure

**Modularity principles:**

- Single responsibility per file
- Clear, descriptive file names (lowercase-with-dashes.tsx)
- Group related functionality together
- Separate client and server code (use 'use client' directive)
- Keep components small and composable

## Code Quality - Zero Tolerance

After editing ANY file, run all checks:

```bash
npm run lint           # ESLint with auto-fix
npm run type-check     # TypeScript compiler check
npm run format         # Prettier formatting
```

Fix ALL errors/warnings before continuing. No exceptions.

**When changes require server restart:**

1. Stop dev server (Ctrl+C)
2. Restart: `npm run dev`
3. Check server output at http://localhost:3010
4. Fix ALL warnings/errors in terminal before continuing

**Pre-commit:** Husky + lint-staged automatically runs linting and formatting on staged files.

**Database changes:**

```bash
npx prisma generate    # Regenerate Prisma client
npx prisma db push     # Push schema changes (dev)
npx prisma migrate dev # Create migration (production-ready)
```
