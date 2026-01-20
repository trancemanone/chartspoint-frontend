# Itqqan.com - Arabic Financial Education Platform

A headless WordPress + Astro frontend for Arabic financial education content.

## Tech Stack

- **Frontend**: Astro 5.x with Tailwind CSS
- **CMS**: WordPress with WPGraphQL
- **CDN**: Cloudflare
- **Hosting**: Hetzner VPS

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── navigation/     # Header, Footer, Breadcrumbs
│   │   ├── content/        # ArticleCard, TOC, FAQ, RelatedArticles
│   │   ├── author/         # AuthorBio (E-E-A-T)
│   │   └── trust/          # TrustBadge, LicenseBadge
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   ├── PillarLayout.astro
│   │   └── ClusterLayout.astro
│   ├── lib/
│   │   ├── wordpress.ts    # GraphQL client
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── content-structure.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── learn/
│   │   ├── accounts/
│   │   └── trust/
│   └── styles/
│       ├── global.css
│       ├── fonts.css
│       └── rtl.css
└── public/
    ├── fonts/
    └── images/
```

## Content Pillars

1. **تعلم (Learn)** - Financial education and concepts
2. **حسابات (Accounts)** - Platforms, brokers, execution
3. **ثقة (Trust)** - Verification, safety, YMYL compliance

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Environment Variables

Create a `.env` file:

```env
WORDPRESS_API_URL=https://cms.itqqan.com/graphql
```

## Deployment

Deployment is automatic via GitHub Actions when pushing to `main` branch.

### Required GitHub Secrets

- `WORDPRESS_API_URL` - WordPress GraphQL endpoint
- `VPS_HOST` - VPS IP address (49.12.45.124)
- `VPS_USERNAME` - SSH username (root)
- `VPS_PASSWORD` - SSH password
- `CLOUDFLARE_ZONE_ID` - Cloudflare zone ID for itqqan.com
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token

## Design System

### Colors

- **Brand Navy**: #1B365D
- **Primary Gold**: #d5a035
- **Learn Blue**: #3B82F6
- **Accounts Gold**: #d5a035
- **Trust Burgundy**: #7C2D3C

### Typography

- **Headings**: Noto Kufi Arabic
- **Body**: Tajawal
- **Line Height**: 1.7 (Arabic optimized)

### Accessibility

- Minimum 18px body text (40-70 age group)
- 48px touch targets
- WCAG AA contrast ratios
- RTL layout support

## License

Private - All rights reserved
