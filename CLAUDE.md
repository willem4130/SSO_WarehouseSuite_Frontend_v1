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
  └── schema.prisma         # Database models (NextAuth + custom)

tests/
  ├── unit/                  # Vitest unit tests
  └── e2e/                   # Playwright E2E tests
```

**Tech Stack:** Next.js 16, React 19, TypeScript, tRPC, Prisma, PostgreSQL, NextAuth.js, Tailwind CSS, shadcn/ui

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
