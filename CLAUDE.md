# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Itqqan.com is an Arabic financial education website using a headless architecture:
- **Frontend**: Astro SSG (this repo) deployed to `itqqan.com`
- **Backend**: WordPress CMS at `cms.itqqan.com` serving content via WPGraphQL API with JWT Authentication
- **Target Audience**: Arabic-speaking investors (Saudi Arabia, GCC) aged 40-70

## Development Commands

```bash
# Start development server (localhost:4321)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Content Structure - 3 Pillars

The site organizes content into a pillar/cluster/article hierarchy:

| Pillar | Slug | Color | Purpose |
|--------|------|-------|---------|
| Learn (تعلم) | `learn` | Blue #3B82F6 | Education, concepts, financial literacy |
| Accounts (حسابات) | `accounts` | Gold #d5a035 | Execution, platforms, account setup |
| Trust (ثقة) | `trust` | Burgundy #7C2D3C | Verification, safety, YMYL compliance |

Each pillar contains **clusters** (topic categories), and each cluster contains **articles**.

### URL Structure

```
/                           # Homepage
/{pillar}/                  # Pillar index (e.g., /learn/)
/{pillar}/{cluster}/        # Cluster page (e.g., /learn/stocks/)
/{pillar}/{cluster}/{slug}/ # Article page (e.g., /learn/stocks/basics/)
/author/{slug}/             # Author page (e.g., /author/haitham/)
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/types.ts` | Content types, pillar/cluster definitions, WordPress category ID mappings |
| `src/lib/wordpress.ts` | WPGraphQL client with JWT auth, caching, data fetching functions |
| `src/layouts/BaseLayout.astro` | Base HTML with SEO, Schema.org, RTL support |
| `src/pages/{pillar}/[...slug].astro` | Dynamic routing for clusters and articles |
| `src/pages/author/[slug].astro` | Dynamic author profile pages |
| `.env` | WordPress GraphQL URL and JWT credentials |
| `tailwind.config.mjs` | Comprehensive design system with fintech tokens |
| `src/styles/global.css` | Global styles including unified link styling |

### WordPress Integration

Content is fetched from the WordPress WPGraphQL API (`cms.itqqan.com/graphql`) with JWT Authentication.

**Required WordPress Plugins:**
- WPGraphQL
- WPGraphQL JWT Authentication
- WPGraphQL for Rank Math SEO
- WPGraphQL for ACF (optional, for custom fields)

**Key functions in `src/lib/wordpress.ts`:**
- `getAllPosts()` - Fetch all posts with cursor-based pagination
- `getPostsByPillar(pillar)` - Fetch posts by pillar category
- `getPostsByCluster(cluster)` - Fetch posts by cluster category
- `getPostBySlug(slug)` - Fetch single post by slug
- `transformToArticle(post)` - Transform WP post to frontend Article type
- `searchPosts(query)` - Search posts by keyword
- `getAuthorBySlug(slug)` - Fetch author profile with their posts
- `getAllAuthors()` - Fetch all authors for static path generation

**GraphQL Features:**
- Automatic JWT token management with 55-minute expiry caching
- Response caching (5-minute TTL)
- RankMath SEO data via `seo { title, metaDesc, canonical, focusKeywords, opengraphImage, schema }`
- Author data with avatars and slugs via `author { node { name, slug, description, avatar { url } } }`

Category IDs are mapped in `types.ts` via `PILLAR_CATEGORY_IDS` and `CLUSTER_CATEGORY_IDS`.

### Design System

The Tailwind config (`tailwind.config.mjs`) defines a comprehensive fintech design system:

- **Colors**: Navy (authority), Gold #d5a035 (premium accent), pillar-specific colors
- **Pillar Colors**: Learn (Blue #3B82F6), Accounts (Gold #d5a035), Trust (Burgundy #7C2D3C)
- **Typography**: Noto Kufi Arabic (headings), Tajawal (body) - optimized for Arabic readability
- **Accessibility**: 48px minimum touch targets, high contrast ratios for ages 40-70
- **Effects**: Glassmorphism utilities (`.glass`, `.glass-dark`), premium shadows
- **Link Styling**: Golden underline (#d5a035) with 10px offset for Arabic descenders (ی، ق، ن، ب، ت، ث، ج، ح، خ)

### Hero Sections

Cluster and article pages feature sophisticated hero sections with:
- Multi-layer gradients in pillar colors
- Geometric mesh patterns (SVG backgrounds)
- Radial glow effects
- Glassmorphism content containers
- Gold accent bars
- Author info with avatar, linked name, date, and reading time

## Deployment

Deploy to VPS at `178.63.238.194` (Virtualmin):
```bash
# Build locally
npm run build

# Upload dist/ to /home/itqqan/public_html/
```

The site is served via Apache with Cloudflare CDN in front.

## Testing

Playwright is configured for UI verification testing:

```bash
# Run all tests
npx playwright test

# Run tests against local dev server
PLAYWRIGHT_BASE_URL=http://localhost:4321 npx playwright test
```

Tests capture screenshots at mobile (375px), tablet (768px), and desktop (1280px) viewports for visual verification after deployments.

## RTL Considerations

- All layouts use `dir="rtl"` and `lang="ar"`
- Navigation arrows are rotated 180° for RTL flow
- Flexbox uses logical properties where needed
- Line heights are generous (1.7) for Arabic script readability
- Link underlines use 10px offset (`text-underline-offset`) to ensure clear separation from Arabic descenders
- TOC (Table of Contents) is sticky with clickable anchor links and smooth scrolling (96px offset for fixed header)
