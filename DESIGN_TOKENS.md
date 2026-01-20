# CHARTSPOINT Design System - Token Reference

A comprehensive design token specification for Chartspoint.com, an Arabic-first technical analysis education platform.

## Brand Vision

> "Towards a deeper understanding of how prices move, why signals fail, and how traders manage risk before thinking about profits."

**Design Direction**: Calm, analytical, no hype. Focus on education and trust with a premium fintech aesthetic.

---

## Color System

### Primary Navy (Authority/Trust)

The foundation of institutional credibility. Used for backgrounds, headers, and text.

| Token | HEX | Usage |
|-------|-----|-------|
| `navy-50` | `#F0F4F8` | Lightest tint, subtle backgrounds |
| `navy-100` | `#D9E2EC` | Light backgrounds, hover states |
| `navy-200` | `#BCCCDC` | Borders, dividers |
| `navy-300` | `#9FB3C8` | Muted text, icons |
| `navy-400` | `#829AB1` | Secondary text |
| `navy-500` | `#627D98` | Body text on light backgrounds |
| `navy-600` | `#486581` | Emphasis text |
| `navy-700` | `#334E68` | Strong text, headers |
| `navy-800` | `#1a3a5c` | Light dark navy |
| `navy-900` | `#102941` | **KEY BRAND COLOR** - Dark backgrounds |
| `navy-950` | `#0a1f33` | Deepest dark navy |

### Accent Gold (Premium)

Premium accent color for CTAs, highlights, and brand elements.

| Token | HEX | Usage |
|-------|-----|-------|
| `gold-50` | `#FDF8ED` | Warmest white, subtle gold tint |
| `gold-100` | `#FAF0D8` | Light gold backgrounds |
| `gold-200` | `#F5E2B5` | Hover states, highlights |
| `gold-300` | `#e8bc5a` | Light gold - decorative accents |
| `gold-400` | `#deb049` | Bright gold for emphasis |
| `gold-500` | `#d5a035` | **PRIMARY GOLD** - Main accent, CTAs |
| `gold-600` | `#b8892a` | Dark gold for contrast |
| `gold-700` | `#9a7223` | Rich gold for premium elements |
| `gold-800` | `#7c5c1c` | Dark gold for depth |
| `gold-900` | `#5e4515` | Deepest gold |

---

## Pillar Colors (Content Categorization)

Four distinct colors for categorizing technical analysis content:

### Basics Pillar - Blue `#3B82F6`
**Purpose**: Education, learning, foundational concepts

| Token | HEX | Usage |
|-------|-----|-------|
| `basics-50` | `#EFF6FF` | Light background |
| `basics-500` | `#3B82F6` | Primary pillar color |
| `basics-700` | `#1D4ED8` | Dark variant |

**Content Types**: Terminology, market basics, beginner guides, foundational concepts

### Indicators Pillar - Orange `#F97316`
**Purpose**: Tools, technical indicators, oscillators

| Token | HEX | Usage |
|-------|-----|-------|
| `indicators-50` | `#FFF7ED` | Light background |
| `indicators-500` | `#F97316` | Primary pillar color |
| `indicators-700` | `#C2410C` | Dark variant |

**Content Types**: RSI, MACD, Moving Averages, Bollinger Bands, Volume indicators

### Tools Pillar - Green `#10B981`
**Purpose**: Practical utilities, charting platforms, applications

| Token | HEX | Usage |
|-------|-----|-------|
| `tools-50` | `#ECFDF5` | Light background |
| `tools-500` | `#10B981` | Primary pillar color |
| `tools-700` | `#047857` | Dark variant |

**Content Types**: TradingView tutorials, platform comparisons, charting tools, scanners

### Tactics Pillar - Purple `#8B5CF6`
**Purpose**: Strategy, advanced techniques, risk management

| Token | HEX | Usage |
|-------|-----|-------|
| `tactics-50` | `#F5F3FF` | Light background |
| `tactics-500` | `#8B5CF6` | Primary pillar color |
| `tactics-700` | `#6D28D9` | Dark variant |

**Content Types**: Trading strategies, risk management, position sizing, advanced analysis

---

## Typography

### Font Families

| Token | Font | Usage |
|-------|------|-------|
| `font-heading` | Noto Kufi Arabic | Headlines, titles |
| `font-body` | Tajawal | Body text, UI elements |
| `font-mono` | IBM Plex Mono | Code, technical data |

### Font Sizes (Optimized for Arabic, Ages 40-70)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `body-xs` | 0.875rem (14px) | 1.6 | Captions, metadata |
| `body-sm` | 1rem (16px) | 1.65 | Small body text |
| `body` | 1.125rem (18px) | 1.7 | **Default body text** |
| `body-lg` | 1.25rem (20px) | 1.7 | Large body text |
| `body-xl` | 1.375rem (22px) | 1.75 | Featured body text |
| `h6` | 1rem (16px) | 1.5 | Smallest heading |
| `h5` | 1.125rem (18px) | 1.45 | Small heading |
| `h4` | 1.25rem (20px) | 1.4 | Medium heading |
| `h3` | 1.5rem (24px) | 1.35 | Section heading |
| `h2` | 2rem (32px) | 1.25 | Major heading |
| `h1` | 2.5rem (40px) | 1.2 | Page title |

**Critical**: Minimum body font size is 18px for readability by users aged 40-70.

---

## Spacing

### Touch Targets (Accessibility)

| Token | Size | Usage |
|-------|------|-------|
| `touch-sm` | 44px | Absolute minimum (WCAG AAA) |
| `touch` | 48px | **Default minimum** |
| `touch-lg` | 56px | Comfortable target |
| `touch-xl` | 64px | Large primary actions |

### Section Spacing

| Token | Size | Usage |
|-------|------|-------|
| `section-sm` | 4rem (64px) | Compact sections |
| `section` | 6rem (96px) | Default section padding |
| `section-lg` | 8rem (128px) | Generous spacing |
| `section-xl` | 10rem (160px) | Hero sections |

---

## Shadows

### Elevation Scale

| Token | Usage |
|-------|-------|
| `shadow-xs` | Subtle lift |
| `shadow-sm` | Light elevation |
| `shadow-md` | Cards, containers |
| `shadow-lg` | Dropdowns, popovers |
| `shadow-xl` | Modals |
| `shadow-2xl` | Overlays |

### Specialty Shadows

| Token | Usage |
|-------|-------|
| `shadow-card` | Card default state |
| `shadow-card-hover` | Card hover state |
| `shadow-brand` | Gold-tinted shadow for CTAs |
| `shadow-gold` | Premium gold glow |
| `shadow-header` | Fixed header |
| `shadow-dropdown` | Navigation dropdowns |

---

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `radius-sm` | 0.25rem (4px) | Subtle rounding |
| `radius-md` | 0.5rem (8px) | **Default** |
| `radius-lg` | 0.75rem (12px) | Cards |
| `radius-xl` | 1rem (16px) | Large cards |
| `radius-card` | 1rem (16px) | Card containers |
| `radius-button` | 0.625rem (10px) | Buttons |
| `radius-full` | 9999px | Pills, avatars |

---

## CSS Custom Properties

Use these CSS variables for consistent theming:

```css
/* Colors */
--color-navy-900: #102941;
--color-gold-500: #d5a035;
--color-pillar-basics: #3B82F6;
--color-pillar-indicators: #F97316;
--color-pillar-tools: #10B981;
--color-pillar-tactics: #8B5CF6;

/* Typography */
--font-heading: 'Noto Kufi Arabic', system-ui, sans-serif;
--font-body: 'Tajawal', system-ui, sans-serif;
--font-size-min-body: 1.125rem;

/* Spacing */
--touch-target-min: 48px;
--spacing-nav-height: 80px;

/* Focus States (Gold accent) */
--focus-ring-color: rgba(213, 160, 53, 0.6);
```

---

## Tailwind Usage Examples

### Pillar-Specific Styling

```html
<!-- Basics pillar card -->
<div class="border-r-4 border-basics-500 bg-basics-50">
  <h3 class="text-basics-700">مقدمة في التحليل الفني</h3>
</div>

<!-- Indicators pillar card -->
<div class="border-r-4 border-indicators-500 bg-indicators-50">
  <h3 class="text-indicators-700">مؤشر القوة النسبية RSI</h3>
</div>

<!-- Tools pillar card -->
<div class="border-r-4 border-tools-500 bg-tools-50">
  <h3 class="text-tools-700">استخدام TradingView</h3>
</div>

<!-- Tactics pillar card -->
<div class="border-r-4 border-tactics-500 bg-tactics-50">
  <h3 class="text-tactics-700">إدارة المخاطر</h3>
</div>
```

### Premium Button

```html
<button class="btn-gold min-h-touch px-6 py-3 font-semibold">
  ابدأ التعلم
</button>
```

### Dark Navy Section

```html
<section class="bg-navy-900 text-white">
  <h2 class="text-gold-400">تحليل فني متقدم</h2>
</section>
```

---

## Accessibility Guidelines

1. **Minimum touch target**: 48px x 48px for all interactive elements
2. **Minimum body font**: 18px (1.125rem) for ages 40-70
3. **Color contrast**: WCAG AA minimum, AAA preferred
4. **Focus indicators**: 3px gold ring with white offset
5. **Line height**: 1.7 minimum for Arabic text
6. **RTL support**: All layouts flow right-to-left

---

## File Locations

| File | Purpose |
|------|---------|
| `tailwind.config.mjs` | Tailwind design tokens |
| `src/styles/global.css` | Global styles, CSS variables |
| `src/styles/rtl.css` | RTL-specific overrides |
| `src/styles/fonts.css` | Font-face declarations |

---

*Last updated: January 2026*
*Version: 1.0.0 - CHARTSPOINT Design System*
