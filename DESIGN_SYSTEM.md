# CHARTSPOINT Design System

## Complete Institutional Fintech Design Specification

**Version:** 2.0
**Last Updated:** 2026-01-20
**Platform:** chartspoint.com - Arabic Technical Analysis Education

---

## Brand Vision

> "Towards a deeper understanding of how prices move, why signals fail, and how traders manage risk before thinking about profits."

ChartsPoint is an Arabic-first (RTL) educational platform for technical analysis. The design embodies calm authority, analytical precision, and institutional trust. We do NOT sell trading opportunities - we teach analytical thinking.

---

## A) DESIGN SYSTEM TOKENS

### 1. Color Palette

#### Primary: Deep Navy - Institutional Authority
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
| `navy-900` | `#102941` | **KEY** - Dark backgrounds, brand |
| `navy-950` | `#0a1f33` | Deepest dark navy |

#### Accent: Premium Gold - Exclusivity & Trust
| Token | HEX | Usage |
|-------|-----|-------|
| `gold-50` | `#FDF8ED` | Warmest white, subtle gold tint |
| `gold-100` | `#FAF0D8` | Light gold backgrounds |
| `gold-200` | `#F5E2B5` | Hover states, highlights |
| `gold-300` | `#e8bc5a` | Light gold - decorative |
| `gold-400` | `#deb049` | Bright gold for emphasis |
| `gold-500` | `#d5a035` | **PRIMARY** - Main accent, CTAs |
| `gold-600` | `#b8892a` | Dark gold for contrast |
| `gold-700` | `#9a7223` | Rich gold, AAA links |
| `gold-800` | `#7c5c1c` | Dark gold for depth |
| `gold-900` | `#5e4515` | Deepest gold |

#### Pillar Colors - Content Category Identification
| Pillar | Primary | Light | Dark | Usage |
|--------|---------|-------|------|-------|
| **Basics** (أساسيات) | `#3B82F6` | `#EFF6FF` | `#1D4ED8` | Foundational concepts |
| **Indicators** (المؤشرات) | `#F97316` | `#FFF7ED` | `#C2410C` | Technical indicators |
| **Tools** (الأدوات) | `#10B981` | `#ECFDF5` | `#047857` | Charting tools |
| **Tactics** (الاستراتيجيات) | `#8B5CF6` | `#F5F3FF` | `#6D28D9` | Risk management |

#### Surface Colors
| Token | Value | Usage |
|-------|-------|-------|
| `surface-page` | `#F6F8FA` | Main page background |
| `surface-card` | `#FFFFFF` | Card backgrounds |
| `surface-elevated` | `#FFFFFF` | Elevated surfaces |
| `surface-overlay` | `rgba(15, 23, 42, 0.6)` | Modal overlays |
| `surface-glass` | `rgba(255, 255, 255, 0.85)` | Glassmorphism |
| `surface-glass-dark` | `rgba(16, 42, 67, 0.95)` | Dark glass |

#### Semantic Colors
| Token | HEX | Usage |
|-------|-----|-------|
| `success-500` | `#10B981` | Success states |
| `success-700` | `#047857` | Success text (muted) |
| `warning-500` | `#F59E0B` | Warning states |
| `warning-700` | `#B45309` | Warning text (muted) |
| `error-500` | `#EF4444` | Error states |
| `error-700` | `#B91C1C` | Error text (muted) |

### 2. Typography Scale

#### Font Families
```css
--font-heading: 'Noto Kufi Arabic', system-ui, sans-serif;
--font-body: 'Tajawal', system-ui, sans-serif;
--font-mono: 'IBM Plex Mono', Consolas, monospace;
```

**Rationale:** Noto Kufi Arabic provides strong, authoritative headlines. Tajawal offers elegant, highly readable body text optimized for Arabic readers aged 40-70.

#### Font Size Scale (Optimized for Ages 40-70)
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `display-2xl` | `4.5rem` (72px) | 1.1 | 800 | Hero sections |
| `display-xl` | `3.75rem` (60px) | 1.15 | 800 | Major headlines |
| `display-lg` | `3rem` (48px) | 1.2 | 700 | Section titles |
| `h1` | `2.5rem` (40px) | 1.2 | 800 | Page titles |
| `h2` | `2rem` (32px) | 1.25 | 700 | Section headers |
| `h3` | `1.5rem` (24px) | 1.35 | 600 | Subsection headers |
| `h4` | `1.25rem` (20px) | 1.4 | 600 | Card titles |
| `h5` | `1.125rem` (18px) | 1.45 | 600 | Small headers |
| `body-xl` | `1.375rem` (22px) | 1.75 | 400 | Lead paragraphs |
| `body-lg` | `1.25rem` (20px) | 1.7 | 400 | Desktop body |
| `body` | `1.125rem` (18px) | 1.7 | 400 | **MINIMUM** body |
| `body-sm` | `1rem` (16px) | 1.65 | 400 | Secondary text |
| `caption` | `0.9375rem` (15px) | 1.5 | 400 | **MINIMUM** small text |

**CRITICAL:** Body text NEVER smaller than 18px. Small text NEVER smaller than 15px. This is non-negotiable for WCAG AAA compliance targeting readers aged 40-70.

#### Numeral Handling
- **Financial data:** Western Arabic numerals (0-9) with `font-feature-settings: "tnum"` for tabular alignment
- **General Arabic text:** Standard Arabic presentation

### 3. Spacing Scale (4px Base Unit)

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-1` | `0.25rem` (4px) | Tight internal spacing |
| `spacing-2` | `0.5rem` (8px) | Compact spacing |
| `spacing-3` | `0.75rem` (12px) | Small gaps |
| `spacing-4` | `1rem` (16px) | Standard spacing |
| `spacing-6` | `1.5rem` (24px) | Medium spacing |
| `spacing-8` | `2rem` (32px) | Large spacing |
| `spacing-12` | `3rem` (48px) | Section internal |
| `spacing-16` | `4rem` (64px) | Section small |
| `spacing-20` | `5rem` (80px) | Section medium |
| `spacing-24` | `6rem` (96px) | Section large |

#### Touch Target Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `touch-target-min` | `48px` | WCAG AAA minimum |
| `touch-target-comfortable` | `56px` | Comfortable touch |
| `touch-target-large` | `64px` | Primary actions |

### 4. Border Radius (Conservative)

| Token | Value | Usage |
|-------|-------|-------|
| `radius-xs` | `2px` | Subtle rounding |
| `radius-sm` | `4px` | Tags, badges |
| `radius-md` | `6px` | Inputs, buttons |
| `radius-lg` | `8px` | **MAX** for cards |
| `radius-xl` | `12px` | Modal corners |
| `radius-card` | `8px` | Card standard |
| `radius-button` | `6px` | Button standard |
| `radius-input` | `6px` | Input standard |
| `radius-full` | `9999px` | Pills, circles |

### 5. Shadow System (Subtle, Layered)

```css
/* Elevation Scale */
--shadow-xs: 0 1px 2px 0 rgba(15, 23, 42, 0.04);
--shadow-sm: 0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06);
--shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.07);
--shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.08);
--shadow-xl: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08);

/* Component Shadows */
--shadow-card: 0 2px 8px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04);
--shadow-card-hover: 0 8px 24px rgba(15, 23, 42, 0.08), 0 16px 48px rgba(15, 23, 42, 0.06);
--shadow-header: 0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 24px rgba(15, 23, 42, 0.04);
--shadow-dropdown: 0 10px 40px rgba(15, 23, 42, 0.12);

/* Brand-tinted Shadows */
--shadow-gold: 0 4px 14px rgba(213, 160, 53, 0.2);
--shadow-gold-lg: 0 8px 24px rgba(213, 160, 53, 0.35);
```

### 6. Border/Divider Rules

```css
/* Default Border */
border: 1px solid #E2E8F0;  /* slate-200 */

/* Subtle Border */
border: 1px solid #F1F5F9;  /* slate-100 */

/* Strong Border */
border: 1px solid #CBD5E1;  /* slate-300 */

/* Dark Background Borders */
border: 1px solid rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.15);

/* Gold Accent Border */
border: 1px solid rgba(213, 160, 53, 0.25);
```

### 7. Motion Tokens

```css
/* Duration */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 400ms;

/* Easing */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);

/* FORBIDDEN - No bouncy/spring animations for institutional feel */
/* --ease-bounce: NEVER USE */
/* --ease-spring: NEVER USE */
```

#### Standard Transitions
```css
/* Hover states */
transition: all 200ms ease;

/* Color changes */
transition: color 150ms ease;

/* Transform + opacity */
transition: transform 200ms ease, opacity 200ms ease;

/* Slide animations */
transform: translateY(6px);  /* MAX 6-8px translation */
opacity: 0;
```

### 8. Focus/Hover State Definitions

#### Focus States (WCAG AAA - High Visibility)
```css
/* Default focus ring */
box-shadow:
  0 0 0 3px #FFFFFF,
  0 0 0 6px rgba(213, 160, 53, 0.6);

/* Error focus ring */
box-shadow:
  0 0 0 3px #FFFFFF,
  0 0 0 6px rgba(220, 38, 38, 0.6);

/* Dark background focus */
box-shadow:
  0 0 0 3px transparent,
  0 0 0 6px #FFFFFF;
```

#### Hover States
```css
/* Card hover */
transform: translateY(-2px);
box-shadow: var(--shadow-card-hover);

/* Link hover */
color: var(--color-gold-700);

/* Button hover */
background: linear-gradient(135deg, #d5a035 0%, #b8892a 100%);
transform: translateY(-1px);
```

---

## B) COMPONENT SPECIFICATIONS

### Header Component (Glass Navigation)

#### Purpose
Premium institutional navigation with glassmorphism effect, providing access to all 4 pillars via mega menu.

#### Structure
```
Header
├── Skip-to-content link (a11y)
├── Header inner
│   ├── Container
│   │   └── Nav
│   │       ├── Logo (right in RTL)
│   │       ├── Nav triggers (4 pillars)
│   │       └── Actions (CTA button, mobile toggle)
│   └── Gold accent line (::after)
└── Mega Menu Panel
```

#### Visual Specifications

**Default State:**
```css
background: rgba(255, 255, 255, 0.92);
backdrop-filter: blur(20px) saturate(180%);
border-bottom: 1px solid rgba(226, 232, 240, 0.6);
box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 24px rgba(15, 23, 42, 0.04);
```

**Gold Accent Line:**
```css
height: 2px;
background: linear-gradient(90deg, transparent 0%, #d5a035 20%, #d5a035 80%, transparent 100%);
opacity: 0.5;
```

**Scrolled State:**
```css
background: rgba(255, 255, 255, 0.98);
box-shadow: 0 4px 30px rgba(15, 23, 42, 0.08);
```

#### Dimensions
- Height: `120px` mobile, `104px` desktop
- Container: max-width `1280px`, padding `16px` mobile, `24px` desktop
- Logo: `96px` mobile, `80px` desktop

#### Nav Trigger States
- Default: `text-navy-700`
- Hover: `bg-slate-100`
- Active: Pillar-specific background (`bg-basics-50`, etc.)
- Underline indicator: 3px height, pillar color, `scaleX(0)` to `scaleX(1)`

#### RTL Considerations
- Logo positioned on RIGHT
- Navigation flows RTL
- Chevrons rotate correctly
- CTA arrow points LEFT (RTL direction)

### Footer Component (Trust Signature)

#### Purpose
The footer is Google's "trust signature" - it must contain all trust-building links and the educational disclaimer.

#### Structure
```
Footer
├── Main content (4 columns)
│   ├── Col 1: Logo, description, newsletter, social
│   ├── Col 2: Pillar navigation
│   ├── Col 3: Resources
│   └── Col 4: Legal + Trust badges
└── Bottom bar
    ├── Copyright
    └── Financial disclaimer
```

#### Visual Specifications

**Background:**
```css
background: linear-gradient(180deg, #102941 0%, #0a1f33 100%);
```

**Section Padding:**
- Main: `64px 0 48px` mobile, `80px 0 64px` desktop

**Column Headings:**
```css
font-family: var(--font-heading);
font-size: 1.125rem;
font-weight: 700;
color: white;
padding-right: 12px;  /* Space for vertical bar */

/* Gold vertical bar */
::before {
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, #d5a035 0%, rgba(213, 160, 53, 0.4) 100%);
}
```

**Required Links (CRITICAL):**
1. About (من نحن)
2. Privacy Policy (سياسة الخصوصية)
3. Terms & Conditions (الشروط والأحكام)
4. Risk Disclaimer (إخلاء المسؤولية)
5. How We Make Money (كيف نحقق دخلا) - IMPORTANT for trust

**Trust Badges:**
```css
background: rgba(213, 160, 53, 0.12);
border: 1px solid rgba(213, 160, 53, 0.25);
color: rgba(255, 255, 255, 0.9);
```

**Financial Disclaimer (Bottom):**
```css
color: var(--color-navy-400);
font-size: 0.8125rem;
max-width: 56rem;
text-align: center;
```

Required text:
> "المعلومات المقدمة على هذا الموقع هي لأغراض تعليمية فقط ولا تشكل نصيحة مالية أو استثمارية. يرجى استشارة مستشار مالي مرخص قبل اتخاذ أي قرارات استثمارية."

### Button Component

#### Variants

**Primary (Gold CTA):**
```css
background: linear-gradient(135deg, #e8bc5a 0%, #d5a035 100%);
color: #102941;
box-shadow: 0 4px 14px rgba(213, 160, 53, 0.25);
border: 1px solid rgba(213, 160, 53, 0.3);
padding: 12px 20px;
border-radius: 10px;
font-weight: 600;

/* Hover */
background: linear-gradient(135deg, #d5a035 0%, #b8892a 100%);
box-shadow: 0 6px 20px rgba(213, 160, 53, 0.4);
transform: translateY(-1px);
```

**Secondary (Ghost):**
```css
background: transparent;
color: #334E68;
border: 1px solid #E2E8F0;
padding: 12px 20px;
border-radius: 10px;

/* Hover */
background: #F1F5F9;
border-color: #CBD5E1;
```

**Tertiary (Text only):**
```css
background: transparent;
color: #d5a035;
padding: 8px 16px;
text-decoration: underline;
text-underline-offset: 4px;

/* Hover */
color: #9a7223;
```

#### Sizes
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| `sm` | `8px 16px` | `14px` | `40px` |
| `md` | `12px 20px` | `15px` | `48px` |
| `lg` | `16px 28px` | `16px` | `56px` |

#### Educational CTA Text (From Vision)
**ALLOWED:**
- ابدأ من الأساسيات
- تعلّم قراءة الشارت
- افهم المؤشرات خطوة بخطوة
- استكشف أدوات التحليل
- تعلّم إدارة المخاطر

**FORBIDDEN:**
- اشترك الآن
- ابدأ التداول
- أرباح / فرص
- لا تفوّت الفرصة

### Card Component

#### Base Card
```css
background: white;
border-radius: 8px;
border: 1px solid #E2E8F0;
box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04);
padding: 24px;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08), 0 16px 48px rgba(15, 23, 42, 0.06);
```

#### Pillar Card (for Pillar Grid)
```css
/* Add pillar-specific top border */
border-top: 3px solid var(--pillar-color);

/* Pillar icon container */
.pillar-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--pillar-light);
  color: var(--pillar-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Breadcrumb Component

#### Visual Specification
```css
/* Container */
font-size: 0.9375rem;
color: #627D98;

/* Link */
text-decoration: underline;
text-underline-offset: 4px;
transition: color 200ms ease;

/* Link hover */
color: #d5a035;

/* Separator */
margin: 0 8px;
color: #94A3B8;
content: '/';  /* or chevron icon */

/* Current (last item) */
color: #0F172A;
text-decoration: none;
font-weight: 500;
```

---

## C) PAGE BLOCK BLUEPRINTS

### Homepage Hero Section

#### Purpose
Calm, analytical introduction. NO hype, NO promises. Set the educational tone.

#### Layout (12-col grid)
```
Desktop: Full-width background
├── Container (max-1280px, centered)
│   ├── Content (col-span-7)
│   │   ├── Badge: "التحليل الفني للأسواق المالية"
│   │   ├── H1: Main headline
│   │   ├── Subtitle paragraph
│   │   └── CTA row
│   └── Visual (col-span-5)
│       └── Chart illustration or abstract pattern

Mobile: Stacked
├── Content (full width)
└── Visual (hidden or simplified)
```

#### Typography
- Badge: `overline` size, gold color
- H1: `display-lg` (48px), navy-900
- Subtitle: `body-lg` (20px), slate-600
- CTA: Primary button

#### Approved Hero Headlines (From Vision)
- "تعليم التحليل الفني بعيدا عن الضجيج"
- "فهم الشارت قبل مطاردة الإشارات"
- "التحليل الفني كمنهج لا كحظ"

### Pillars Grid Section

#### Purpose
Clear navigation to 4 content pillars. Each card links to pillar hub.

#### Layout
```
Desktop: 4 columns (col-span-3 each)
Tablet: 2 columns
Mobile: 1 column

Grid gap: 24px desktop, 16px mobile
```

#### Card Structure
```
Pillar Card
├── Icon (56x56, pillar background)
├── Title (h3, font-heading)
├── Description (2-3 lines, slate-600)
└── Link ("استكشف" + arrow)
```

#### Pillar Definitions
| Pillar | Arabic | Icon | Color |
|--------|--------|------|-------|
| Basics | أساسيات التحليل الفني | chart-candlestick | Blue |
| Indicators | المؤشرات الفنية | indicator | Orange |
| Tools | الأدوات والحاسبات | calculator | Green |
| Tactics | الاستراتيجيات وإدارة المخاطر | shield-check | Purple |

### Trust Signals Section

#### Purpose
Build institutional credibility. Calm, factual trust indicators.

#### Layout
```
Full-width subtle background (navy-50 or gold-50)
├── Container
│   ├── Section title (centered)
│   │   └── H2 with underline system
│   └── Trust items (3-4 columns)
│       └── Icon + Text pairs
```

#### Trust Items (Examples)
- محتوى تعليمي موثق
- التركيز على إدارة المخاطر
- بدون توصيات مالية
- منهجية تحليلية واضحة

### Hub Page Template (Pillar Index)

#### Structure
```
Hub Page
├── Header (sticky)
├── Pillar Hero
│   ├── Breadcrumb
│   ├── Pillar badge
│   ├── H1: Pillar title
│   ├── Description
│   └── Pillar stats (optional)
├── Cluster Grid
│   └── Cards linking to clusters
├── Featured Articles
│   └── Article cards
└── Footer
```

#### Pillar Hero Specifications
```css
/* Background - pillar-specific gradient */
background: linear-gradient(135deg, var(--pillar-light) 0%, white 100%);
padding: 64px 0 48px;

/* Pillar badge */
background: var(--pillar-light);
color: var(--pillar-dark);
padding: 6px 12px;
border-radius: 4px;
font-size: 14px;
font-weight: 600;
```

### Article Page Template

#### Structure
```
Article Page
├── Header (sticky)
├── Article Header
│   ├── Breadcrumb
│   ├── H1: Article title
│   ├── Meta (date, reading time, author)
│   └── Table of Contents (sticky sidebar)
├── Article Content
│   ├── Prose container (max-width 840px)
│   └── Typography with proper heading hierarchy
├── Related Articles
└── Footer
```

#### TOC Styling
```css
/* Container */
position: sticky;
top: 96px;  /* Header height + padding */
background: #F8FAFC;
border-radius: 8px;
padding: 24px;
border: 1px solid #E2E8F0;

/* Links */
font-size: 0.9375rem;
color: #64748B;
padding: 8px 0;
border-right: 2px solid transparent;

/* Active link */
color: var(--pillar-color);
border-right-color: var(--pillar-color);
```

---

## D) SVG ICON LIBRARY

### Specifications
- Grid: 24x24 consistent
- Stroke width: 1.75px (slightly heavier than standard for older readers)
- Style: Stroke-only with rounded joins
- Color: `currentColor` for inheritance

### Icon Component Template (Astro)
```astro
---
interface Props {
  class?: string;
  size?: number;
  strokeWidth?: number;
}

const { class: className = '', size = 24, strokeWidth = 1.75 } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  width={size}
  height={size}
  aria-hidden="true"
>
  <!-- paths here -->
</svg>
```

### Required Icons for ChartsPoint

#### Financial/Chart Icons
1. **icon-chart-candlestick** - Candlestick chart pattern
2. **icon-trend-up** - Upward trend arrow
3. **icon-trend-down** - Downward trend arrow
4. **icon-chart-line** - Line chart
5. **icon-indicator** - Technical indicator (oscillator wave)

#### Educational Icons
6. **icon-book-open** - Open book for learning
7. **icon-academy** - Graduation cap
8. **icon-target** - Target/goal

#### Trust/Security Icons
9. **icon-shield-check** - Shield with checkmark
10. **icon-verification** - Badge verification
11. **icon-lock** - Security lock

#### Utility Icons
12. **icon-calculator** - Calculator tool
13. **icon-settings** - Gear/settings
14. **icon-filter** - Filter funnel
15. **icon-user** - User profile
16. **icon-globe-ar** - Arabic globe
17. **icon-warning** - Warning triangle
18. **icon-info** - Information circle

---

## E) TAILWIND CONFIGURATION REFERENCE

The complete Tailwind configuration is in `tailwind.config.mjs`. Key extensions:

### Custom Utilities (via plugin)

```js
// Touch target utilities
.touch-target { min-height: 48px; min-width: 48px; }
.touch-target-lg { min-height: 56px; min-width: 56px; }

// Focus ring utilities
.focus-ring { box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 6px rgba(213, 160, 53, 0.6); }

// Readable text (minimum font sizes)
.text-readable { font-size: 1.125rem; line-height: 1.7; }
.text-readable-lg { font-size: 1.25rem; line-height: 1.8; }

// Glassmorphism
.glass { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); }
.glass-dark { background: rgba(16, 41, 65, 0.95); backdrop-filter: blur(16px); }
.glass-navy { background: rgba(16, 41, 65, 0.98); backdrop-filter: blur(16px); }

// Gradients
.gradient-brand { background: linear-gradient(135deg, #e8bc5a 0%, #d5a035 100%); }
.gradient-navy { background: linear-gradient(135deg, #1a3a5c 0%, #102941 100%); }
.gradient-premium { background: linear-gradient(135deg, #102941 0%, #1a3a5c 50%, #d5a035 100%); }
```

---

## F) QUALITY GATES CHECKLIST

Before any component or page goes live, verify:

- [ ] No playful or cartoon icons
- [ ] No neon or marketing-bright colors
- [ ] Consistent spacing rhythm throughout (4px base)
- [ ] Shadows and gradients are subtle and purposeful
- [ ] Does NOT look like a template or generic theme
- [ ] Text contrast passes WCAG AA (preferably AAA) for older readers
- [ ] Body text minimum 18px, small text minimum 15px
- [ ] Touch targets minimum 48px
- [ ] RTL flow is natural and correct
- [ ] Arabic typography has generous line-height (1.7+)
- [ ] Feels like Bloomberg/Refinitiv, not Canva
- [ ] All CTAs are educational, not promotional
- [ ] Footer contains all trust links
- [ ] Financial disclaimer present where needed

---

## G) IMPLEMENTATION NOTES

### Font Loading
Fonts are locally hosted (not Google Fonts) for privacy and performance:
- `public/fonts/NotoKufiArabic-*.woff2`
- `public/fonts/Tajawal-*.woff2`

See `src/styles/fonts.css` for @font-face declarations.

### RTL Support
- All layouts use `dir="rtl"` and `lang="ar"`
- CSS Logical Properties where possible (`margin-inline-start`, etc.)
- Navigation arrows rotated for RTL
- See `src/styles/rtl.css` for RTL-specific overrides

### Performance Considerations
- Use `loading="lazy"` on images below fold
- Header images use `loading="eager"`
- Prefer CSS transitions over JS animations
- Shadow and blur effects use GPU-accelerated properties

---

**Document maintained by:** ChartsPoint Design Team
**Last review:** 2026-01-20
