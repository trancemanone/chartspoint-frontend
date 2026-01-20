# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chartspoint.com is an Arabic technical analysis education platform using a headless architecture:
- **Frontend**: Astro 5.x SSG (this repo) deployed to `chartspoint.com`
- **Backend**: WordPress CMS at `cms.chartspoint.com` serving content via WPGraphQL API
- **Target Audience**: Arabic-speaking traders learning technical analysis

## Development Commands

```bash
npm run dev      # Start development server (localhost:4321)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally

# Testing
npm test              # Run Playwright tests
npm run test:ui       # Run tests with UI
npm run test:report   # View test report
```

## Architecture

### Content Structure - 4 Pillars

Content is organized into a pillar/cluster/article hierarchy defined in `src/lib/types.ts`:

| Pillar | Slug | Color | Clusters |
|--------|------|-------|----------|
| Basics (أساسيات) | `basics` | Blue #3B82F6 | intro, patterns, action, methods |
| Indicators (المؤشرات) | `indicators` | Orange #F97316 | momentum, trend, volatility, volume |
| Tools (الأدوات) | `tools` | Green #10B981 | calc, charts, data |
| Tactics (الاستراتيجيات) | `tactics` | Purple #8B5CF6 | trend-tactics, reversion, intraday, risk |

### URL Structure

```
/                              # Homepage
/{pillar}/                     # Pillar index (e.g., /basics/)
/{pillar}/{cluster}/           # Cluster page (e.g., /basics/patterns/)
/{pillar}/{cluster}/{slug}/    # Article page
/author/{slug}/                # Author profile
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/types.ts` | Pillar/cluster definitions, WordPress category ID mappings, TypeScript types |
| `src/lib/wordpress.ts` | WPGraphQL client with JWT auth, caching, data fetching |
| `src/layouts/BaseLayout.astro` | Base HTML with SEO, Schema.org, RTL support |
| `.env` | WordPress GraphQL URL and JWT credentials |
| `tailwind.config.mjs` | CHARTSPOINT design system tokens |

### WordPress Integration

Content is fetched from `cms.chartspoint.com/graphql` via WPGraphQL.

**Key functions in `src/lib/wordpress.ts`:**
- `getAllPosts()` - Fetch all posts with cursor-based pagination
- `getPostsByPillar(pillar)` - Fetch posts by pillar category
- `getPostsByCluster(cluster)` - Fetch posts by cluster category
- `getPostBySlug(slug)` - Fetch single post by slug
- `transformToArticle(post)` - Transform WP post to frontend Article type

**Category ID mappings** are in `types.ts` via `PILLAR_CATEGORY_IDS` (2-5) and `CLUSTER_CATEGORY_IDS` (6-20).

### Design System

See `DESIGN_TOKENS.md` for full specification. Key values:

- **Primary Navy**: #102941 (authority backgrounds)
- **Accent Gold**: #d5a035 (CTAs, premium highlights)
- **Typography**: Noto Kufi Arabic (headings), Tajawal (body)
- **Minimum body font**: 18px (accessibility for ages 40-70)
- **Touch targets**: 48px minimum

## Deployment

```bash
# Build and deploy to VPS at 178.63.238.194
npm run build
# Upload dist/ to /home/chartspoint.com/public_html/
```

Cloudflare CDN is in front; purge cache after deployment.

## RTL Considerations

- All layouts use `dir="rtl"` and `lang="ar"`
- Navigation arrows rotated 180° for RTL flow
- Line heights generous (1.7) for Arabic script readability
- Link underlines use 10px offset for Arabic descenders
- TOC sticky with 96px scroll offset for fixed header
