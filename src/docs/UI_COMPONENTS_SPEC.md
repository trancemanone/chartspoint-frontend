# Chartspoint Interactive UI Components Specification

## Document Version: 1.0
## Last Updated: 2026-01-20
## Design System: Institutional Fintech (Arabic-First RTL)

---

# Table of Contents

1. [Design Foundation](#1-design-foundation)
2. [Buttons](#2-buttons)
3. [Navigation Components](#3-navigation-components)
4. [Cards](#4-cards)
5. [Form Elements](#5-form-elements)
6. [Feedback Components](#6-feedback-components)
7. [Overlay Components](#7-overlay-components)
8. [Data Display Components](#8-data-display-components)
9. [Accordion and Tabs](#9-accordion-and-tabs)
10. [Special Components](#10-special-components)
11. [Implementation Notes](#11-implementation-notes)

---

# 1. Design Foundation

## 1.1 Motion Tokens

All interactive components use these standardized motion values:

```css
:root {
  /* Duration Scale */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-moderate: 250ms;
  --duration-slow: 300ms;
  --duration-deliberate: 400ms;

  /* Easing Functions */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);

  /* Standard Transitions */
  --transition-colors: color var(--duration-normal) var(--ease-default),
                       background-color var(--duration-normal) var(--ease-default),
                       border-color var(--duration-normal) var(--ease-default);
  --transition-transform: transform var(--duration-fast) var(--ease-out);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-smooth);
  --transition-opacity: opacity var(--duration-normal) var(--ease-default);
}
```

## 1.2 Focus Ring System

All interactive elements use a consistent, high-visibility focus ring optimized for users aged 40-70:

```css
/* Standard Focus Ring (Gold) */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 6px rgba(213, 160, 53, 0.6);
}

/* Focus Ring on Dark Backgrounds */
.focus-ring-inverse {
  outline: none;
  box-shadow: 0 0 0 3px transparent, 0 0 0 6px #FFFFFF;
}

/* Focus Ring for Error States */
.focus-ring-error {
  outline: none;
  box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 6px rgba(185, 28, 28, 0.6);
}
```

## 1.3 Touch Target Requirements

WCAG 2.5.5 Level AAA compliance requires 44px minimum. Chartspoint uses 48px for comfort:

```css
:root {
  --touch-target-min: 48px;      /* Standard minimum */
  --touch-target-comfortable: 56px;  /* Comfortable touch */
  --touch-target-large: 64px;    /* Primary actions */
}
```

---

# 2. Buttons

## 2.1 Button Variants

### Primary Button (Gold)
- **Use Case**: Primary CTAs, form submissions, key actions
- **Background**: `#d5a035` (gold-500)
- **Text**: `#102941` (navy-900)
- **Shadow**: `0 4px 14px rgba(213, 160, 53, 0.2)`

### Secondary Button (Outline)
- **Use Case**: Secondary actions, cancel buttons, alternatives
- **Background**: `#FFFFFF`
- **Border**: `2px solid #243B53` (navy-700)
- **Text**: `#243B53`

### Ghost Button
- **Use Case**: Tertiary actions, navigation links styled as buttons
- **Background**: `transparent`
- **Text**: `#334E68` (navy-600)
- **Hover Background**: `#F1F5F9` (slate-100)

### Navy Button
- **Use Case**: Authority actions, premium features
- **Background**: `linear-gradient(135deg, #243B53 0%, #102A43 100%)`
- **Text**: `#FFFFFF`

### Danger Button
- **Use Case**: Destructive actions, deletions, warnings
- **Background**: `#B91C1C` (red-700, muted)
- **Text**: `#FFFFFF`
- **Shadow**: `0 4px 14px rgba(185, 28, 28, 0.2)`

## 2.2 Button Sizes

| Size | Min Height | Padding | Font Size | Use Case |
|------|------------|---------|-----------|----------|
| `sm` | 48px | `0.625rem 1.25rem` | 15px | Inline actions, tight spaces |
| `md` | 48px | `0.75rem 1.5rem` | 18px | Default, most buttons |
| `lg` | 56px | `1rem 2rem` | 20px | Hero CTAs, prominent actions |
| `xl` | 64px | `1.25rem 2.5rem` | 22px | Full-width mobile CTAs |

## 2.3 Button States

### Default State
```css
.btn {
  background-color: var(--btn-bg);
  border-color: var(--btn-border);
  color: var(--btn-text);
  box-shadow: var(--btn-shadow);
}
```

### Hover State
```css
.btn:hover:not(:disabled) {
  background-color: var(--btn-bg-hover);
  transform: translateY(-1px);
  box-shadow: var(--btn-shadow-hover);
}
```

### Active/Pressed State
```css
.btn:active:not(:disabled) {
  background-color: var(--btn-bg-active);
  transform: translateY(0);
}
```

### Disabled State
```css
.btn:disabled,
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Loading State
```css
.btn--loading {
  cursor: wait;
  pointer-events: none;
}

.btn--loading .btn__text {
  opacity: 0.7;
}

.btn__spinner {
  animation: spin 1s linear infinite;
}
```

### Focus State
```css
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px #FFFFFF, 0 0 0 6px rgba(213, 160, 53, 0.6);
}
```

## 2.4 Icon Button Variants

### Icon + Text (RTL)
In RTL, icons at "end" position appear on the left:

```html
<button class="btn btn--primary">
  <span class="btn__text">ابدأ الآن</span>
  <span class="btn__icon btn__icon--end">
    <IconArrowLeft />
  </span>
</button>
```

### Icon Only
```css
.btn--icon-only {
  padding: 0;
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  border-radius: 50%;
}

.btn--icon-only .btn__icon {
  margin: 0;
}
```

## 2.5 Tailwind Implementation

```html
<!-- Primary Button -->
<button class="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3
  bg-gold-500 hover:bg-gold-600 active:bg-gold-700
  text-navy-900 font-semibold text-lg
  border-2 border-gold-500 hover:border-gold-600
  rounded-[0.625rem] shadow-gold hover:shadow-gold-lg
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-gold-500/60 focus-visible:ring-offset-[3px] focus-visible:ring-offset-white
  disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none">
  <span>ابدأ الآن</span>
</button>

<!-- Secondary Button -->
<button class="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3
  bg-white hover:bg-navy-50 active:bg-navy-100
  text-navy-700 font-semibold text-lg
  border-2 border-navy-700 hover:border-navy-800
  rounded-[0.625rem] shadow-sm hover:shadow-md
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-gold-500/60 focus-visible:ring-offset-[3px]
  disabled:opacity-60 disabled:cursor-not-allowed">
  <span>المزيد</span>
</button>

<!-- Ghost Button -->
<button class="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3
  bg-transparent hover:bg-slate-100 active:bg-slate-200
  text-navy-600 hover:text-navy-800 font-semibold text-lg
  border-2 border-transparent
  rounded-[0.625rem]
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-gold-500/60 focus-visible:ring-offset-[3px]">
  <span>إلغاء</span>
</button>

<!-- Danger Button -->
<button class="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3
  bg-error-700 hover:bg-error-600 active:bg-error-800
  text-white font-semibold text-lg
  border-2 border-error-700 hover:border-error-600
  rounded-[0.625rem] shadow-md hover:shadow-lg
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-error-500/60 focus-visible:ring-offset-[3px]
  disabled:opacity-60 disabled:cursor-not-allowed">
  <span>حذف</span>
</button>
```

---

# 3. Navigation Components

## 3.1 Desktop Mega Menu

### Structure
```
Header (80px height, glass effect)
├── Logo
├── Primary Navigation
│   ├── Pillar Links (with dropdowns)
│   │   ├── Basics (blue indicator)
│   │   ├── Indicators (orange indicator)
│   │   ├── Tools (green indicator)
│   │   └── Tactics (purple indicator)
│   └── Utility Links
└── CTA Button
```

### Mega Menu Panel Specifications

**Container:**
- Background: `rgba(255, 255, 255, 0.98)`
- Backdrop Filter: `blur(16px)`
- Border: `1px solid #E2E8F0`
- Shadow: `0 10px 40px rgba(15, 23, 42, 0.12)`
- Border Radius: `0 0 1rem 1rem`
- Max Width: `1280px`
- Padding: `2rem`

**Columns:**
- Grid: `4 columns` for cluster links
- Gap: `2rem`
- Min Column Width: `240px`

**Link Styling:**
```css
.mega-menu__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  min-height: 48px; /* Touch target */
  border-radius: 0.5rem;
  color: #334155;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mega-menu__link:hover {
  background-color: #F8FAFC;
  color: #102941;
}

.mega-menu__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(213, 160, 53, 0.4);
}
```

**Animation:**
- Entry: `opacity 0 -> 1` + `translateY(-8px) -> 0`
- Duration: `200ms`
- Easing: `cubic-bezier(0.45, 0, 0.15, 1)`

### Tailwind Implementation

```html
<!-- Mega Menu Trigger -->
<button
  class="group inline-flex items-center gap-1.5 px-4 py-3 min-h-[48px]
    text-navy-700 hover:text-navy-900 font-medium text-lg
    transition-colors duration-200"
  aria-expanded="false"
  aria-haspopup="true">
  <span>أساسيات</span>
  <svg class="w-5 h-5 transition-transform duration-200 group-aria-expanded:rotate-180">
    <use href="#icon-chevron-down" />
  </svg>
</button>

<!-- Mega Menu Panel -->
<div
  class="absolute top-full right-0 left-0
    bg-white/98 backdrop-blur-lg
    border-t border-slate-200
    shadow-dropdown
    rounded-b-xl
    opacity-0 invisible -translate-y-2
    transition-all duration-200 ease-smooth
    group-aria-expanded:opacity-100 group-aria-expanded:visible group-aria-expanded:translate-y-0"
  role="menu">
  <div class="container mx-auto px-8 py-8">
    <div class="grid grid-cols-4 gap-8">
      <!-- Cluster columns -->
    </div>
  </div>
</div>
```

## 3.2 Mobile Slide-Out Drawer

### Specifications

**Drawer Container:**
- Width: `100%` (full screen) or `320px` minimum
- Background: `#FFFFFF`
- Shadow: `-10px 0 40px rgba(15, 23, 42, 0.15)`

**Overlay:**
- Background: `rgba(15, 23, 42, 0.6)`
- Backdrop Filter: `blur(4px)`

**Animation:**
- Entry: `translateX(100%) -> translateX(0)` (RTL slides from left)
- Duration: `300ms`
- Easing: `cubic-bezier(0.45, 0, 0.15, 1)`

**Close Button:**
- Position: Top-right (top-left in RTL)
- Size: `48px x 48px`
- Icon: X mark

**Navigation Items:**
```css
.mobile-nav__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #F1F5F9;
  font-size: 1.125rem;
  font-weight: 600;
  color: #102941;
}

.mobile-nav__item:active {
  background-color: #F8FAFC;
}
```

### Tailwind Implementation

```html
<!-- Mobile Menu Overlay -->
<div
  class="fixed inset-0 z-overlay bg-navy-900/60 backdrop-blur-sm
    opacity-0 invisible
    transition-all duration-300
    data-[open]:opacity-100 data-[open]:visible"
  data-mobile-overlay>
</div>

<!-- Mobile Menu Drawer -->
<nav
  class="fixed top-0 right-0 bottom-0 z-modal
    w-full max-w-sm
    bg-white shadow-2xl
    translate-x-full
    transition-transform duration-300 ease-smooth
    data-[open]:translate-x-0"
  data-mobile-menu
  aria-label="القائمة الرئيسية">

  <!-- Close Button -->
  <button
    class="absolute top-4 left-4 w-12 h-12
      flex items-center justify-center
      text-navy-600 hover:text-navy-900 hover:bg-slate-100
      rounded-full
      transition-colors duration-200"
    aria-label="إغلاق القائمة">
    <svg class="w-6 h-6"><use href="#icon-close" /></svg>
  </button>

  <!-- Navigation Items -->
  <div class="pt-20 pb-8 overflow-y-auto h-full">
    <ul class="divide-y divide-slate-100">
      <li>
        <a href="/basics/"
           class="flex items-center justify-between min-h-[56px] px-6 py-4
             text-navy-900 font-semibold text-lg
             hover:bg-slate-50 active:bg-slate-100
             transition-colors duration-150">
          <span>أساسيات</span>
          <svg class="w-5 h-5 text-basics-500 rtl:rotate-180">
            <use href="#icon-chevron-left" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</nav>
```

## 3.3 Tab Navigation

### Specifications

**Tab List Container:**
- Display: `flex`
- Gap: `0.5rem`
- Border Bottom: `2px solid #E2E8F0`
- Overflow-X: `auto` (for mobile)
- Scroll Snap: `x mandatory`

**Individual Tab:**
```css
.tab {
  position: relative;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #64748B;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.tab:hover {
  color: #334155;
}

.tab[aria-selected="true"] {
  color: #d5a035;
}

.tab[aria-selected="true"]::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 0;
  left: 0;
  height: 3px;
  background-color: #d5a035;
  border-radius: 3px 3px 0 0;
}
```

### Tailwind Implementation

```html
<div class="border-b-2 border-slate-200">
  <nav class="flex gap-2 overflow-x-auto scrollbar-hide" role="tablist">
    <button
      role="tab"
      aria-selected="true"
      class="relative min-h-[48px] px-6 py-3
        text-lg font-semibold whitespace-nowrap
        text-gold-500
        transition-colors duration-200
        after:absolute after:bottom-[-2px] after:inset-x-0 after:h-[3px]
        after:bg-gold-500 after:rounded-t-full">
      نظرة عامة
    </button>
    <button
      role="tab"
      aria-selected="false"
      class="relative min-h-[48px] px-6 py-3
        text-lg font-semibold whitespace-nowrap
        text-slate-500 hover:text-slate-700
        transition-colors duration-200">
      المقالات
    </button>
  </nav>
</div>
```

## 3.4 Breadcrumbs

### Specifications

**Container:**
- Font Size: `1rem` (16px minimum)
- Color: `#64748B` (slate-500)
- Separator: Chevron icon (rotated for RTL)

**Link Styling:**
```css
.breadcrumb__link {
  color: #64748B;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 6px;
  transition: all 0.2s ease;
}

.breadcrumb__link:hover {
  color: #334155;
  text-decoration-color: #d5a035;
}

.breadcrumb__current {
  color: #0F172A;
  font-weight: 600;
}
```

### Tailwind Implementation

```html
<nav aria-label="مسار التنقل" class="text-base">
  <ol class="flex items-center gap-2 flex-wrap">
    <li>
      <a href="/"
         class="text-slate-500 hover:text-slate-700
           underline decoration-transparent hover:decoration-gold-500
           underline-offset-[6px] decoration-2
           transition-all duration-200">
        الرئيسية
      </a>
    </li>
    <li class="text-slate-400" aria-hidden="true">
      <svg class="w-4 h-4 rtl:rotate-180"><use href="#icon-chevron-left" /></svg>
    </li>
    <li>
      <a href="/basics/"
         class="text-slate-500 hover:text-slate-700
           underline decoration-transparent hover:decoration-gold-500
           underline-offset-[6px] decoration-2
           transition-all duration-200">
        أساسيات
      </a>
    </li>
    <li class="text-slate-400" aria-hidden="true">
      <svg class="w-4 h-4 rtl:rotate-180"><use href="#icon-chevron-left" /></svg>
    </li>
    <li aria-current="page" class="text-slate-900 font-semibold">
      أنماط الشموع اليابانية
    </li>
  </ol>
</nav>
```

## 3.5 Pagination

### Specifications

**Container:**
- Display: `flex`
- Align: `center`
- Gap: `0.5rem`

**Page Button:**
```css
.pagination__btn {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  transition: all 0.2s ease;
}

.pagination__btn:hover:not(:disabled) {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}

.pagination__btn--active {
  background-color: #d5a035;
  border-color: #d5a035;
  color: #102941;
}

.pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Tailwind Implementation

```html
<nav aria-label="التنقل بين الصفحات" class="flex items-center justify-center gap-2">
  <!-- Previous -->
  <button
    class="min-w-[48px] min-h-[48px] flex items-center justify-center
      bg-white border border-slate-200 rounded-lg
      text-slate-600 hover:bg-slate-50 hover:border-slate-300
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label="الصفحة السابقة">
    <svg class="w-5 h-5 rtl:rotate-180"><use href="#icon-chevron-right" /></svg>
  </button>

  <!-- Page Numbers -->
  <button class="min-w-[48px] min-h-[48px] flex items-center justify-center
    bg-gold-500 border border-gold-500 rounded-lg
    text-navy-900 font-semibold text-lg
    transition-all duration-200"
    aria-current="page">
    1
  </button>
  <button class="min-w-[48px] min-h-[48px] flex items-center justify-center
    bg-white border border-slate-200 rounded-lg
    text-slate-700 font-semibold text-lg hover:bg-slate-50 hover:border-slate-300
    transition-all duration-200">
    2
  </button>

  <!-- Ellipsis -->
  <span class="px-2 text-slate-400">...</span>

  <!-- Next -->
  <button
    class="min-w-[48px] min-h-[48px] flex items-center justify-center
      bg-white border border-slate-200 rounded-lg
      text-slate-600 hover:bg-slate-50 hover:border-slate-300
      transition-all duration-200"
    aria-label="الصفحة التالية">
    <svg class="w-5 h-5 rtl:rotate-180"><use href="#icon-chevron-left" /></svg>
  </button>
</nav>
```

## 3.6 Back to Top Button

### Specifications

**Visibility:**
- Show when `scrollY > 400px`
- Fade in with `opacity` + `translateY(16px) -> 0`

**Button:**
```css
.back-to-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem; /* RTL: appears on left */
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #102941;
  color: #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(16, 41, 65, 0.25);
  opacity: 0;
  visibility: hidden;
  transform: translateY(16px);
  transition: all 0.3s ease;
}

.back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: #1a3a5c;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 41, 65, 0.35);
}
```

### Tailwind Implementation

```html
<button
  class="fixed bottom-8 left-8 z-sticky
    w-14 h-14 flex items-center justify-center
    bg-navy-900 hover:bg-navy-800 text-white
    rounded-full shadow-navy hover:shadow-navy-lg
    opacity-0 invisible translate-y-4
    transition-all duration-300
    data-[visible]:opacity-100 data-[visible]:visible data-[visible]:translate-y-0
    focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-white/60"
  aria-label="العودة للأعلى"
  data-back-to-top>
  <svg class="w-6 h-6"><use href="#icon-chevron-up" /></svg>
</button>
```

---

# 4. Cards

## 4.1 Article Card

### Specifications

**Container:**
- Background: `#FFFFFF`
- Border: `1px solid rgba(226, 232, 240, 0.8)`
- Border Radius: `1rem`
- Shadow: `0 2px 8px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)`

**Image:**
- Aspect Ratio: `16:9`
- Object Fit: `cover`
- Border Radius: `1rem 1rem 0 0`

**Content Padding:**
- Mobile: `1.5rem`
- Desktop: `2rem`

**Pillar Badge:**
- Position: Absolute top-right of image
- Padding: `0.5rem 1rem`
- Border Radius: `9999px`
- Font Size: `0.875rem`
- Font Weight: `600`

**Hover State:**
```css
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08), 0 16px 48px rgba(15, 23, 42, 0.06);
}
```

### Tailwind Implementation

```html
<article class="group relative bg-white border border-slate-200/80 rounded-xl overflow-hidden
  shadow-card hover:shadow-card-hover
  transition-all duration-300
  hover:-translate-y-1">

  <!-- Image Container -->
  <div class="relative aspect-video overflow-hidden">
    <img src="..." alt="..."
         class="w-full h-full object-cover
           transition-transform duration-500
           group-hover:scale-105" />

    <!-- Pillar Badge -->
    <span class="absolute top-4 right-4
      px-4 py-2 rounded-full
      bg-basics-500 text-white
      text-sm font-semibold">
      أساسيات
    </span>
  </div>

  <!-- Content -->
  <div class="p-6 lg:p-8">
    <h3 class="font-heading text-xl lg:text-2xl font-bold text-navy-900 mb-3
      line-clamp-2">
      <a href="..." class="hover:text-gold-600 transition-colors duration-200
        after:absolute after:inset-0">
        عنوان المقالة
      </a>
    </h3>

    <p class="text-slate-600 text-lg leading-relaxed line-clamp-3 mb-4">
      وصف المقالة...
    </p>

    <!-- Meta -->
    <div class="flex items-center gap-4 text-slate-500 text-base">
      <span class="flex items-center gap-1.5">
        <svg class="w-4 h-4"><use href="#icon-clock" /></svg>
        5 دقائق
      </span>
      <span class="flex items-center gap-1.5">
        <svg class="w-4 h-4"><use href="#icon-calendar" /></svg>
        20 يناير 2026
      </span>
    </div>
  </div>
</article>
```

## 4.2 Pillar Card

Large featured card for pillar landing pages.

### Specifications

**Container:**
- Min Height: `320px`
- Background: Gradient based on pillar color
- Border Radius: `1.5rem`
- Padding: `2.5rem`

**Icon:**
- Size: `80px x 80px`
- Background: `rgba(255, 255, 255, 0.15)`
- Border Radius: `1rem`

### Tailwind Implementation

```html
<a href="/basics/"
   class="group relative block min-h-[320px] p-8 lg:p-10
     bg-gradient-to-br from-basics-500 to-basics-700
     rounded-3xl overflow-hidden
     transition-all duration-300
     hover:shadow-2xl hover:-translate-y-1">

  <!-- Decorative Pattern -->
  <div class="absolute inset-0 opacity-10"
       style="background-image: url('/patterns/grid.svg')"></div>

  <!-- Icon -->
  <div class="w-20 h-20 flex items-center justify-center
    bg-white/15 rounded-2xl mb-6">
    <svg class="w-10 h-10 text-white"><use href="#icon-book" /></svg>
  </div>

  <!-- Content -->
  <h2 class="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
    أساسيات التحليل الفني
  </h2>

  <p class="text-white/90 text-lg leading-relaxed mb-6 max-w-md">
    تعلم الأساسيات الضرورية لفهم حركة الأسعار...
  </p>

  <!-- Arrow -->
  <span class="inline-flex items-center gap-2 text-white font-semibold
    transition-transform duration-200 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
    <span>استكشف</span>
    <svg class="w-5 h-5 rtl:rotate-180"><use href="#icon-arrow-left" /></svg>
  </span>
</a>
```

## 4.3 Cluster Card

Medium-sized card for cluster navigation.

### Specifications

- Border Left: `4px solid {pillar-color}` (RTL: border-right)
- Background: `#FFFFFF`
- Padding: `1.5rem`
- Icon: `48px x 48px` circle

### Tailwind Implementation

```html
<a href="/basics/patterns/"
   class="group flex items-start gap-4 p-6
     bg-white border border-slate-200/80 border-r-4 border-r-basics-500
     rounded-xl shadow-card hover:shadow-card-hover
     transition-all duration-300
     hover:-translate-y-1">

  <!-- Icon -->
  <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center
    bg-basics-50 text-basics-600 rounded-full
    transition-colors duration-200
    group-hover:bg-basics-100">
    <svg class="w-6 h-6"><use href="#icon-candles" /></svg>
  </div>

  <!-- Content -->
  <div class="flex-1 min-w-0">
    <h3 class="font-heading text-xl font-bold text-navy-900 mb-2
      group-hover:text-basics-600 transition-colors duration-200">
      أنماط الشموع اليابانية
    </h3>
    <p class="text-slate-600 text-base leading-relaxed line-clamp-2">
      اكتشف الأنماط الانعكاسية والاستمرارية...
    </p>
    <span class="inline-block mt-3 text-basics-600 font-semibold text-sm">
      12 مقالة
    </span>
  </div>
</a>
```

## 4.4 Feature Card

For tool features and highlights.

### Specifications

- Background: `#FFFFFF`
- Border Radius: `1rem`
- Text Alignment: Center
- Icon: `64px x 64px`, gold background

### Tailwind Implementation

```html
<div class="text-center p-8 bg-white rounded-xl shadow-card">
  <!-- Icon -->
  <div class="inline-flex items-center justify-center w-16 h-16
    bg-gold-100 text-gold-600 rounded-2xl mb-6">
    <svg class="w-8 h-8"><use href="#icon-calculator" /></svg>
  </div>

  <h3 class="font-heading text-xl font-bold text-navy-900 mb-3">
    حاسبة الأرباح
  </h3>

  <p class="text-slate-600 text-lg leading-relaxed">
    احسب أرباحك المتوقعة بناءً على حجم الصفقة ونسبة المخاطرة.
  </p>
</div>
```

## 4.5 Author Card

### Specifications

- Layout: Horizontal on desktop, vertical on mobile
- Avatar: `80px` circle
- Credentials badge: Gold accent

### Tailwind Implementation

```html
<div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6
  bg-white border border-slate-200/80 rounded-xl shadow-card">

  <!-- Avatar -->
  <img src="..." alt="..."
       class="w-20 h-20 rounded-full object-cover
         border-4 border-gold-200" />

  <!-- Info -->
  <div class="text-center sm:text-right flex-1">
    <h3 class="font-heading text-xl font-bold text-navy-900 mb-1">
      أحمد محمد
    </h3>
    <p class="text-gold-600 font-semibold text-base mb-3">
      محلل فني معتمد (CMT)
    </p>
    <p class="text-slate-600 text-base leading-relaxed">
      خبرة 15 عاماً في أسواق المال...
    </p>
  </div>
</div>
```

## 4.6 Stats Card

For displaying key metrics.

### Specifications

- Background: `linear-gradient(135deg, #102941 0%, #1a3a5c 100%)`
- Number: `display-lg` size, gold color
- Label: `body-sm` size, white/80

### Tailwind Implementation

```html
<div class="p-6 bg-gradient-to-br from-navy-900 to-navy-800 rounded-xl text-center">
  <p class="font-heading text-4xl lg:text-5xl font-bold text-gold-400 mb-2
    tabular-nums">
    50+
  </p>
  <p class="text-white/80 text-lg">
    مقالة تعليمية
  </p>
</div>
```

---

# 5. Form Elements

## 5.1 Text Input

### Specifications

**Container:**
- Min Height: `56px` (comfortable touch target)
- Padding: `1rem 1.25rem`
- Border: `2px solid #E2E8F0`
- Border Radius: `0.5rem`
- Font Size: `1.125rem` (18px minimum)

**States:**

```css
/* Default */
.input {
  background-color: #FFFFFF;
  border-color: #E2E8F0;
  color: #0F172A;
}

/* Hover */
.input:hover:not(:focus):not(:disabled) {
  border-color: #CBD5E1;
}

/* Focus */
.input:focus {
  border-color: #d5a035;
  box-shadow: 0 0 0 3px rgba(213, 160, 53, 0.2);
}

/* Error */
.input--error {
  border-color: #B91C1C;
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.15);
}

/* Disabled */
.input:disabled {
  background-color: #F8FAFC;
  color: #94A3B8;
  cursor: not-allowed;
}
```

**Placeholder:**
- Color: `#94A3B8`
- Font Style: Normal (not italic)

### Tailwind Implementation

```html
<!-- Text Input -->
<div class="space-y-2">
  <label for="email" class="block text-lg font-semibold text-navy-900">
    البريد الإلكتروني
    <span class="text-error-600">*</span>
  </label>
  <input
    type="email"
    id="email"
    class="w-full min-h-[56px] px-5 py-4
      bg-white border-2 border-slate-200 rounded-lg
      text-lg text-slate-900 placeholder:text-slate-400
      hover:border-slate-300
      focus:border-gold-500 focus:ring-[3px] focus:ring-gold-500/20 focus:outline-none
      disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
      transition-all duration-200"
    placeholder="example@domain.com"
    dir="ltr" />
  <p class="text-base text-slate-500">
    سنرسل إليك رسالة تأكيد
  </p>
</div>

<!-- Input with Error -->
<div class="space-y-2">
  <label for="phone" class="block text-lg font-semibold text-navy-900">
    رقم الهاتف
  </label>
  <input
    type="tel"
    id="phone"
    class="w-full min-h-[56px] px-5 py-4
      bg-white border-2 border-error-600 rounded-lg
      text-lg text-slate-900
      focus:ring-[3px] focus:ring-error-500/15 focus:outline-none
      transition-all duration-200"
    aria-invalid="true"
    aria-describedby="phone-error"
    dir="ltr" />
  <p id="phone-error" class="text-base text-error-600 flex items-center gap-2">
    <svg class="w-5 h-5"><use href="#icon-warning" /></svg>
    يرجى إدخال رقم هاتف صحيح
  </p>
</div>
```

## 5.2 Textarea

### Specifications

- Min Height: `150px`
- Resize: `vertical`
- Line Height: `1.7` (Arabic optimized)

### Tailwind Implementation

```html
<div class="space-y-2">
  <label for="message" class="block text-lg font-semibold text-navy-900">
    رسالتك
  </label>
  <textarea
    id="message"
    rows="5"
    class="w-full min-h-[150px] px-5 py-4
      bg-white border-2 border-slate-200 rounded-lg
      text-lg text-slate-900 leading-relaxed placeholder:text-slate-400
      hover:border-slate-300
      focus:border-gold-500 focus:ring-[3px] focus:ring-gold-500/20 focus:outline-none
      resize-y
      transition-all duration-200"
    placeholder="اكتب رسالتك هنا..."></textarea>
</div>
```

## 5.3 Select Dropdown

### Specifications

**Trigger:**
- Same dimensions as text input
- Custom chevron icon (not native)
- Truncate long text with ellipsis

**Dropdown Panel:**
- Max Height: `300px`
- Overflow: `auto`
- Shadow: `0 10px 40px rgba(15, 23, 42, 0.12)`

**Option:**
- Min Height: `48px`
- Padding: `0.75rem 1.25rem`

### Tailwind Implementation (Custom)

```html
<div class="relative" data-select>
  <label class="block text-lg font-semibold text-navy-900 mb-2">
    اختر الفئة
  </label>

  <!-- Trigger -->
  <button
    type="button"
    class="w-full min-h-[56px] px-5 py-4
      flex items-center justify-between gap-3
      bg-white border-2 border-slate-200 rounded-lg
      text-lg text-slate-900 text-right
      hover:border-slate-300
      focus:border-gold-500 focus:ring-[3px] focus:ring-gold-500/20 focus:outline-none
      transition-all duration-200"
    aria-haspopup="listbox"
    aria-expanded="false">
    <span class="truncate">اختر...</span>
    <svg class="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200
      aria-expanded:rotate-180">
      <use href="#icon-chevron-down" />
    </svg>
  </button>

  <!-- Dropdown -->
  <ul
    role="listbox"
    class="absolute top-full right-0 left-0 mt-2 z-dropdown
      max-h-[300px] overflow-auto
      bg-white border border-slate-200 rounded-lg shadow-dropdown
      opacity-0 invisible translate-y-2
      transition-all duration-200
      data-[open]:opacity-100 data-[open]:visible data-[open]:translate-y-0">

    <li role="option"
        class="min-h-[48px] px-5 py-3
          text-lg text-slate-700 cursor-pointer
          hover:bg-slate-50
          aria-selected:bg-gold-50 aria-selected:text-gold-700 aria-selected:font-semibold
          transition-colors duration-150"
        aria-selected="false">
      أساسيات
    </li>
    <li role="option"
        class="min-h-[48px] px-5 py-3
          text-lg text-slate-700 cursor-pointer
          hover:bg-slate-50
          aria-selected:bg-gold-50 aria-selected:text-gold-700 aria-selected:font-semibold
          transition-colors duration-150"
        aria-selected="true">
      المؤشرات
    </li>
  </ul>
</div>
```

## 5.4 Checkbox

### Specifications

**Box:**
- Size: `24px x 24px` (larger for accessibility)
- Border: `2px solid #CBD5E1`
- Border Radius: `6px`

**Checked State:**
- Background: `#d5a035`
- Border: `#d5a035`
- Check Icon: White

**Label:**
- Font Size: `1.125rem`
- Min Height: `48px` (touch target includes label)

### Tailwind Implementation

```html
<label class="group flex items-start gap-4 min-h-[48px] cursor-pointer">
  <span class="relative flex-shrink-0 w-6 h-6 mt-0.5">
    <input
      type="checkbox"
      class="peer sr-only" />

    <!-- Box -->
    <span class="absolute inset-0
      border-2 border-slate-300 rounded-md
      bg-white
      peer-checked:bg-gold-500 peer-checked:border-gold-500
      peer-focus-visible:ring-[6px] peer-focus-visible:ring-gold-500/20
      peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
      transition-all duration-200">
    </span>

    <!-- Check Icon -->
    <svg class="absolute inset-0 w-6 h-6 p-1
      text-white opacity-0 scale-75
      peer-checked:opacity-100 peer-checked:scale-100
      transition-all duration-200"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>

  <span class="text-lg text-slate-700 leading-relaxed
    group-hover:text-slate-900 transition-colors duration-200">
    أوافق على الشروط والأحكام
  </span>
</label>
```

## 5.5 Radio Buttons

### Specifications

Similar to checkbox but with `border-radius: 50%` and dot indicator.

### Tailwind Implementation

```html
<fieldset class="space-y-4">
  <legend class="text-lg font-semibold text-navy-900 mb-4">
    اختر نوع الحساب
  </legend>

  <label class="group flex items-start gap-4 min-h-[48px] cursor-pointer">
    <span class="relative flex-shrink-0 w-6 h-6 mt-0.5">
      <input
        type="radio"
        name="account-type"
        value="demo"
        class="peer sr-only" />

      <!-- Circle -->
      <span class="absolute inset-0
        border-2 border-slate-300 rounded-full
        bg-white
        peer-checked:border-gold-500
        peer-focus-visible:ring-[6px] peer-focus-visible:ring-gold-500/20
        transition-all duration-200">
      </span>

      <!-- Dot -->
      <span class="absolute inset-[5px]
        bg-gold-500 rounded-full
        opacity-0 scale-0
        peer-checked:opacity-100 peer-checked:scale-100
        transition-all duration-200">
      </span>
    </span>

    <span class="text-lg text-slate-700 leading-relaxed">
      حساب تجريبي
    </span>
  </label>

  <label class="group flex items-start gap-4 min-h-[48px] cursor-pointer">
    <span class="relative flex-shrink-0 w-6 h-6 mt-0.5">
      <input
        type="radio"
        name="account-type"
        value="real"
        class="peer sr-only" />
      <span class="absolute inset-0
        border-2 border-slate-300 rounded-full bg-white
        peer-checked:border-gold-500
        peer-focus-visible:ring-[6px] peer-focus-visible:ring-gold-500/20
        transition-all duration-200">
      </span>
      <span class="absolute inset-[5px]
        bg-gold-500 rounded-full
        opacity-0 scale-0
        peer-checked:opacity-100 peer-checked:scale-100
        transition-all duration-200">
      </span>
    </span>

    <span class="text-lg text-slate-700 leading-relaxed">
      حساب حقيقي
    </span>
  </label>
</fieldset>
```

## 5.6 Toggle Switch

### Specifications

**Track:**
- Width: `56px`
- Height: `32px`
- Border Radius: `9999px`
- Background (off): `#E2E8F0`
- Background (on): `#d5a035`

**Thumb:**
- Size: `24px`
- Border Radius: `50%`
- Background: `#FFFFFF`
- Shadow: `0 2px 4px rgba(0,0,0,0.1)`

### Tailwind Implementation

```html
<label class="flex items-center gap-4 min-h-[48px] cursor-pointer">
  <span class="relative inline-flex">
    <input
      type="checkbox"
      role="switch"
      class="peer sr-only" />

    <!-- Track -->
    <span class="w-14 h-8
      bg-slate-200 rounded-full
      peer-checked:bg-gold-500
      peer-focus-visible:ring-[6px] peer-focus-visible:ring-gold-500/20
      transition-colors duration-200">
    </span>

    <!-- Thumb -->
    <span class="absolute top-1 right-1
      w-6 h-6
      bg-white rounded-full shadow-md
      peer-checked:-translate-x-6 rtl:peer-checked:translate-x-6
      transition-transform duration-200">
    </span>
  </span>

  <span class="text-lg text-slate-700">
    تفعيل الإشعارات
  </span>
</label>
```

## 5.7 Search Input

### Specifications

- Icon: Magnifying glass on right (RTL)
- Clear button: X icon, appears when input has value
- Optional: Keyboard shortcut hint

### Tailwind Implementation

```html
<div class="relative">
  <!-- Search Icon -->
  <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none">
    <use href="#icon-search" />
  </svg>

  <input
    type="search"
    class="w-full min-h-[56px] pr-14 pl-14 py-4
      bg-white border-2 border-slate-200 rounded-lg
      text-lg text-slate-900 placeholder:text-slate-400
      hover:border-slate-300
      focus:border-gold-500 focus:ring-[3px] focus:ring-gold-500/20 focus:outline-none
      transition-all duration-200"
    placeholder="ابحث عن مقالة..." />

  <!-- Clear Button (shown when has value) -->
  <button
    type="button"
    class="absolute left-5 top-1/2 -translate-y-1/2
      w-8 h-8 flex items-center justify-center
      text-slate-400 hover:text-slate-600
      rounded-full hover:bg-slate-100
      transition-colors duration-200
      hidden data-[has-value]:flex"
    aria-label="مسح البحث">
    <svg class="w-4 h-4"><use href="#icon-close" /></svg>
  </button>
</div>
```

---

# 6. Feedback Components

## 6.1 Toast Notifications

### Specifications

**Container:**
- Position: Fixed, bottom-right (bottom-left in RTL)
- Z-Index: `800` (toast level)
- Max Width: `400px`
- Padding: `1rem 1.5rem`
- Border Radius: `0.75rem`
- Shadow: `0 10px 40px rgba(15, 23, 42, 0.15)`

**Variants:**
| Type | Background | Icon | Border Left |
|------|------------|------|-------------|
| Success | `#ECFDF5` | Check Circle | `4px solid #10B981` |
| Error | `#FEF2F2` | X Circle | `4px solid #B91C1C` |
| Warning | `#FFFBEB` | Warning | `4px solid #D97706` |
| Info | `#EFF6FF` | Info | `4px solid #3B82F6` |

**Animation:**
- Entry: `translateX(100%) -> 0` + `opacity 0 -> 1`
- Exit: `translateX(100%)` + `opacity 0`
- Duration: `300ms`
- Auto-dismiss: `5000ms`

### Tailwind Implementation

```html
<!-- Toast Container -->
<div class="fixed bottom-6 left-6 z-toast space-y-3 max-w-sm w-full">

  <!-- Success Toast -->
  <div role="alert"
       class="flex items-start gap-4 p-4 pr-6
         bg-success-50 border-r-4 border-success-500 rounded-xl
         shadow-lg
         animate-slide-in-left">
    <svg class="w-6 h-6 text-success-600 flex-shrink-0">
      <use href="#icon-check-circle" />
    </svg>
    <div class="flex-1 min-w-0">
      <p class="text-lg font-semibold text-slate-900">تم بنجاح!</p>
      <p class="text-base text-slate-600 mt-1">تم حفظ التغييرات بنجاح.</p>
    </div>
    <button class="flex-shrink-0 w-8 h-8 flex items-center justify-center
      text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full
      transition-colors duration-200"
      aria-label="إغلاق">
      <svg class="w-4 h-4"><use href="#icon-close" /></svg>
    </button>
  </div>

  <!-- Error Toast -->
  <div role="alert"
       class="flex items-start gap-4 p-4 pr-6
         bg-error-50 border-r-4 border-error-600 rounded-xl
         shadow-lg">
    <svg class="w-6 h-6 text-error-600 flex-shrink-0">
      <use href="#icon-warning" />
    </svg>
    <div class="flex-1 min-w-0">
      <p class="text-lg font-semibold text-slate-900">حدث خطأ</p>
      <p class="text-base text-slate-600 mt-1">يرجى المحاولة مرة أخرى.</p>
    </div>
    <button class="flex-shrink-0 w-8 h-8 flex items-center justify-center
      text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full
      transition-colors duration-200"
      aria-label="إغلاق">
      <svg class="w-4 h-4"><use href="#icon-close" /></svg>
    </button>
  </div>
</div>
```

## 6.2 Alert Boxes

### Specifications

Inline alerts for form errors, page messages, etc.

**Container:**
- Padding: `1.25rem 1.5rem`
- Border Radius: `0.75rem`
- Border: `1px solid {color-200}`

### Tailwind Implementation

```html
<!-- Info Alert -->
<div role="alert" class="flex items-start gap-4 p-5
  bg-basics-50 border border-basics-200 rounded-xl">
  <svg class="w-6 h-6 text-basics-600 flex-shrink-0 mt-0.5">
    <use href="#icon-info" />
  </svg>
  <div>
    <p class="text-lg font-semibold text-slate-900 mb-1">معلومة مهمة</p>
    <p class="text-base text-slate-600 leading-relaxed">
      هذه المعلومات تساعدك على فهم...
    </p>
  </div>
</div>

<!-- Warning Alert -->
<div role="alert" class="flex items-start gap-4 p-5
  bg-warning-50 border border-warning-200 rounded-xl">
  <svg class="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5">
    <use href="#icon-warning" />
  </svg>
  <div>
    <p class="text-lg font-semibold text-slate-900 mb-1">تحذير</p>
    <p class="text-base text-slate-600 leading-relaxed">
      يرجى الانتباه إلى...
    </p>
  </div>
</div>

<!-- Error Alert -->
<div role="alert" class="flex items-start gap-4 p-5
  bg-error-50 border border-error-200 rounded-xl">
  <svg class="w-6 h-6 text-error-600 flex-shrink-0 mt-0.5">
    <use href="#icon-warning" />
  </svg>
  <div>
    <p class="text-lg font-semibold text-slate-900 mb-1">خطأ</p>
    <p class="text-base text-slate-600 leading-relaxed">
      حدث خطأ أثناء...
    </p>
  </div>
</div>

<!-- Success Alert -->
<div role="alert" class="flex items-start gap-4 p-5
  bg-success-50 border border-success-200 rounded-xl">
  <svg class="w-6 h-6 text-success-600 flex-shrink-0 mt-0.5">
    <use href="#icon-check-circle" />
  </svg>
  <div>
    <p class="text-lg font-semibold text-slate-900 mb-1">تم بنجاح</p>
    <p class="text-base text-slate-600 leading-relaxed">
      تمت العملية بنجاح.
    </p>
  </div>
</div>
```

## 6.3 Loading Spinner

### Specifications

**Sizes:**
| Size | Dimensions | Stroke Width |
|------|------------|--------------|
| sm | 20px | 2px |
| md | 32px | 3px |
| lg | 48px | 3px |
| xl | 64px | 4px |

**Colors:**
- Primary: Gold (`#d5a035`)
- Inverse: White
- Track: 25% opacity

### Tailwind Implementation

```html
<!-- Medium Spinner (default) -->
<svg class="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none">
  <!-- Track -->
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"
    class="text-gold-500/25" />
  <!-- Spinner -->
  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3"
    stroke-linecap="round" class="text-gold-500" />
</svg>

<!-- With Label -->
<div class="flex flex-col items-center gap-4">
  <svg class="w-12 h-12 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"
      class="text-gold-500/25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3"
      stroke-linecap="round" class="text-gold-500" />
  </svg>
  <p class="text-lg text-slate-600">جاري التحميل...</p>
</div>
```

## 6.4 Skeleton Loaders

### Specifications

**Animation:**
- Type: Shimmer (gradient sweep)
- Duration: `2s`
- Timing: `linear`
- Direction: `right-to-left` (RTL)

**Base Styles:**
- Background: `#E2E8F0`
- Border Radius: `4px`

### Tailwind Implementation

```css
/* Add to global.css */
@keyframes shimmer-rtl {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #E2E8F0 25%,
    #F1F5F9 50%,
    #E2E8F0 75%
  );
  background-size: 200% 100%;
  animation: shimmer-rtl 2s linear infinite;
}
```

```html
<!-- Text Skeleton -->
<div class="space-y-4">
  <div class="skeleton h-8 w-3/4 rounded"></div>
  <div class="skeleton h-5 w-full rounded"></div>
  <div class="skeleton h-5 w-5/6 rounded"></div>
  <div class="skeleton h-5 w-4/5 rounded"></div>
</div>

<!-- Card Skeleton -->
<div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
  <!-- Image -->
  <div class="skeleton h-48 w-full"></div>
  <!-- Content -->
  <div class="p-6 space-y-4">
    <div class="skeleton h-6 w-3/4 rounded"></div>
    <div class="skeleton h-4 w-full rounded"></div>
    <div class="skeleton h-4 w-2/3 rounded"></div>
  </div>
</div>

<!-- Table Row Skeleton -->
<tr>
  <td class="p-4"><div class="skeleton h-5 w-24 rounded"></div></td>
  <td class="p-4"><div class="skeleton h-5 w-32 rounded"></div></td>
  <td class="p-4"><div class="skeleton h-5 w-16 rounded"></div></td>
</tr>
```

## 6.5 Progress Bar

### Specifications

**Track:**
- Height: `8px`
- Background: `#E2E8F0`
- Border Radius: `9999px`

**Fill:**
- Background: `#d5a035` (or pillar color)
- Transition: `width 0.3s ease`

### Tailwind Implementation

```html
<!-- Basic Progress Bar -->
<div class="space-y-2">
  <div class="flex justify-between items-center">
    <span class="text-base font-semibold text-slate-700">التقدم</span>
    <span class="text-base font-semibold text-gold-600">75%</span>
  </div>
  <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
    <div class="h-full bg-gold-500 rounded-full transition-all duration-300"
         style="width: 75%"
         role="progressbar"
         aria-valuenow="75"
         aria-valuemin="0"
         aria-valuemax="100">
    </div>
  </div>
</div>

<!-- Segmented Progress (Reading Progress) -->
<div class="fixed top-0 left-0 right-0 h-1 z-header">
  <div class="h-full bg-gold-500 transition-all duration-100"
       style="width: 30%">
  </div>
</div>
```

## 6.6 Empty States

### Specifications

**Container:**
- Text Align: Center
- Padding: `4rem 2rem`

**Icon:**
- Size: `64px`
- Color: `#CBD5E1`

**Title:**
- Font Size: `1.5rem`
- Font Weight: `700`
- Color: `#334155`

### Tailwind Implementation

```html
<div class="flex flex-col items-center justify-center py-16 px-8 text-center">
  <!-- Icon -->
  <svg class="w-16 h-16 text-slate-300 mb-6">
    <use href="#icon-search" />
  </svg>

  <!-- Title -->
  <h3 class="text-2xl font-bold text-slate-700 mb-3">
    لا توجد نتائج
  </h3>

  <!-- Description -->
  <p class="text-lg text-slate-500 max-w-md mb-8">
    لم نتمكن من العثور على ما تبحث عنه. جرب كلمات بحث مختلفة.
  </p>

  <!-- Action -->
  <button class="btn btn--primary">
    إعادة المحاولة
  </button>
</div>
```

---

# 7. Overlay Components

## 7.1 Modal Dialog

### Specifications

**Overlay:**
- Background: `rgba(15, 23, 42, 0.6)`
- Backdrop Filter: `blur(4px)`
- Z-Index: `500`

**Dialog:**
- Max Width: `32rem` (sm), `42rem` (md), `56rem` (lg)
- Max Height: `90vh`
- Background: `#FFFFFF`
- Border Radius: `1rem`
- Shadow: `0 25px 80px rgba(15, 23, 42, 0.25)`

**Header:**
- Padding: `1.5rem 2rem`
- Border Bottom: `1px solid #F1F5F9`

**Body:**
- Padding: `2rem`
- Overflow-Y: `auto`

**Footer:**
- Padding: `1.5rem 2rem`
- Border Top: `1px solid #F1F5F9`
- Background: `#F8FAFC`

**Animation:**
- Overlay: `opacity 0 -> 1`, `300ms`
- Dialog: `scale(0.95) -> 1` + `opacity 0 -> 1`, `300ms`

### Tailwind Implementation

```html
<!-- Modal Overlay -->
<div
  class="fixed inset-0 z-modal
    bg-navy-900/60 backdrop-blur-sm
    flex items-center justify-center p-4
    opacity-0 invisible
    transition-all duration-300
    data-[open]:opacity-100 data-[open]:visible"
  data-modal-overlay
  aria-hidden="true">

  <!-- Modal Dialog -->
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    class="relative w-full max-w-lg
      bg-white rounded-2xl shadow-modal
      max-h-[90vh] flex flex-col
      scale-95 opacity-0
      transition-all duration-300
      data-[open]:scale-100 data-[open]:opacity-100">

    <!-- Header -->
    <header class="flex items-center justify-between px-8 py-6
      border-b border-slate-100">
      <h2 id="modal-title" class="text-2xl font-bold text-navy-900">
        عنوان النافذة
      </h2>
      <button
        class="w-10 h-10 flex items-center justify-center
          text-slate-400 hover:text-slate-600 hover:bg-slate-100
          rounded-full transition-colors duration-200"
        aria-label="إغلاق"
        data-modal-close>
        <svg class="w-5 h-5"><use href="#icon-close" /></svg>
      </button>
    </header>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto px-8 py-6">
      <p class="text-lg text-slate-600 leading-relaxed">
        محتوى النافذة...
      </p>
    </div>

    <!-- Footer -->
    <footer class="flex items-center justify-end gap-4 px-8 py-6
      border-t border-slate-100 bg-slate-50 rounded-b-2xl">
      <button class="btn btn--ghost" data-modal-close>
        إلغاء
      </button>
      <button class="btn btn--primary">
        تأكيد
      </button>
    </footer>
  </div>
</div>
```

## 7.2 Dropdown Menu

### Specifications

**Trigger:**
- Same styling as buttons or inline text

**Panel:**
- Min Width: `200px`
- Max Width: `320px`
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `0.75rem`
- Shadow: `0 10px 40px rgba(15, 23, 42, 0.12)`

**Menu Item:**
- Min Height: `48px`
- Padding: `0.75rem 1rem`
- Font Size: `1.125rem`

**Animation:**
- Entry: `opacity 0 -> 1` + `translateY(-8px) -> 0`
- Duration: `200ms`

### Tailwind Implementation

```html
<div class="relative inline-block" data-dropdown>
  <!-- Trigger -->
  <button
    type="button"
    class="inline-flex items-center gap-2 px-4 py-3 min-h-[48px]
      text-lg font-semibold text-navy-700 hover:text-navy-900
      transition-colors duration-200"
    aria-haspopup="true"
    aria-expanded="false">
    <span>الخيارات</span>
    <svg class="w-5 h-5 transition-transform duration-200
      aria-expanded:rotate-180">
      <use href="#icon-chevron-down" />
    </svg>
  </button>

  <!-- Menu -->
  <div
    role="menu"
    class="absolute top-full right-0 mt-2 z-dropdown
      min-w-[200px]
      bg-white border border-slate-200 rounded-xl shadow-dropdown
      opacity-0 invisible -translate-y-2
      transition-all duration-200
      data-[open]:opacity-100 data-[open]:visible data-[open]:translate-y-0">

    <div class="py-2">
      <a href="#" role="menuitem"
         class="flex items-center gap-3 min-h-[48px] px-4 py-3
           text-lg text-slate-700 hover:bg-slate-50 hover:text-navy-900
           transition-colors duration-150">
        <svg class="w-5 h-5"><use href="#icon-edit" /></svg>
        <span>تعديل</span>
      </a>
      <a href="#" role="menuitem"
         class="flex items-center gap-3 min-h-[48px] px-4 py-3
           text-lg text-slate-700 hover:bg-slate-50 hover:text-navy-900
           transition-colors duration-150">
        <svg class="w-5 h-5"><use href="#icon-copy" /></svg>
        <span>نسخ</span>
      </a>

      <hr class="my-2 border-slate-100" />

      <button role="menuitem"
         class="flex items-center gap-3 w-full min-h-[48px] px-4 py-3
           text-lg text-error-600 hover:bg-error-50
           transition-colors duration-150">
        <svg class="w-5 h-5"><use href="#icon-trash" /></svg>
        <span>حذف</span>
      </button>
    </div>
  </div>
</div>
```

## 7.3 Tooltip

### Specifications

**Container:**
- Max Width: `280px`
- Padding: `0.75rem 1rem`
- Background: `#102941`
- Color: `#FFFFFF`
- Border Radius: `0.5rem`
- Font Size: `1rem`
- Box Shadow: `0 4px 12px rgba(15, 23, 42, 0.15)`

**Arrow:**
- Size: `8px`
- Background: Matches container

**Delay:**
- Show: `200ms`
- Hide: `100ms`

### Tailwind Implementation

```html
<!-- Tooltip Trigger -->
<button
  class="relative group"
  aria-describedby="tooltip-1">
  <svg class="w-5 h-5 text-slate-400"><use href="#icon-info" /></svg>

  <!-- Tooltip -->
  <span
    id="tooltip-1"
    role="tooltip"
    class="absolute bottom-full right-1/2 translate-x-1/2 mb-2
      max-w-[280px] px-4 py-3
      bg-navy-900 text-white text-base leading-relaxed rounded-lg shadow-tooltip
      opacity-0 invisible translate-y-1
      transition-all duration-200 delay-200
      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
      pointer-events-none">
    هذا نص توضيحي يشرح المحتوى بالتفصيل.

    <!-- Arrow -->
    <span class="absolute top-full right-1/2 -translate-x-1/2
      border-8 border-transparent border-t-navy-900">
    </span>
  </span>
</button>
```

## 7.4 Popover

### Specifications

Similar to tooltip but with:
- Larger max width (`400px`)
- Interactive content
- Can include buttons/links
- White background

### Tailwind Implementation

```html
<div class="relative" data-popover>
  <!-- Trigger -->
  <button
    class="btn btn--secondary"
    aria-haspopup="dialog"
    aria-expanded="false">
    المزيد من المعلومات
  </button>

  <!-- Popover Content -->
  <div
    role="dialog"
    class="absolute top-full right-0 mt-3 z-popover
      w-80
      bg-white border border-slate-200 rounded-xl shadow-dropdown
      opacity-0 invisible translate-y-2
      transition-all duration-200
      data-[open]:opacity-100 data-[open]:visible data-[open]:translate-y-0">

    <!-- Arrow -->
    <span class="absolute bottom-full right-6
      border-8 border-transparent border-b-white
      drop-shadow-[0_-2px_2px_rgba(0,0,0,0.05)]">
    </span>

    <div class="p-6">
      <h3 class="text-xl font-bold text-navy-900 mb-3">
        عنوان المحتوى
      </h3>
      <p class="text-base text-slate-600 leading-relaxed mb-4">
        محتوى تفصيلي يمكن أن يحتوي على نصوص وروابط...
      </p>
      <a href="#" class="text-gold-600 font-semibold hover:text-gold-700
        underline underline-offset-4 transition-colors duration-200">
        اقرأ المزيد
      </a>
    </div>
  </div>
</div>
```

## 7.5 Cookie Consent Banner

### Specifications

**Position:**
- Fixed bottom
- Full width

**Container:**
- Background: `#FFFFFF`
- Border Top: `1px solid #E2E8F0`
- Shadow: `0 -4px 24px rgba(15, 23, 42, 0.08)`
- Padding: `1.5rem`

### Tailwind Implementation

```html
<div
  class="fixed bottom-0 left-0 right-0 z-modal
    bg-white border-t border-slate-200 shadow-lg
    transform translate-y-full
    transition-transform duration-500
    data-[visible]:translate-y-0"
  role="dialog"
  aria-label="سياسة ملفات تعريف الارتباط"
  data-cookie-banner>

  <div class="container mx-auto px-6 py-6">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
      <div class="text-center lg:text-right">
        <p class="text-lg text-slate-700 leading-relaxed">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك.
          <a href="/cookies/" class="text-gold-600 hover:text-gold-700 underline underline-offset-4">
            اقرأ المزيد
          </a>
        </p>
      </div>

      <div class="flex items-center gap-4">
        <button class="btn btn--ghost" data-cookie-decline>
          رفض
        </button>
        <button class="btn btn--primary" data-cookie-accept>
          قبول الكل
        </button>
      </div>
    </div>
  </div>
</div>
```

---

# 8. Data Display Components

## 8.1 Terminal-Grade Tables

### Specifications

**Container:**
- Overflow-X: `auto` (horizontal scroll on mobile)
- Border: `1px solid #E2E8F0`
- Border Radius: `1rem`

**Header:**
- Background: `linear-gradient(135deg, #243B53 0%, #102A43 100%)`
- Color: `#FFFFFF`
- Font Weight: `600`
- Padding: `1rem 1.5rem`
- Position: Sticky (optional)

**Body Row:**
- Border Bottom: `1px solid #F1F5F9`
- Padding: `1rem 1.5rem`

**Striped:**
- Alternating: `#F8FAFC`

**Hover:**
- Background: `#F1F5F9`

**Numeric Cells:**
- Font Feature: `tabular-nums`
- Text Align: Left (numbers are always LTR)

### Already Implemented

See `C:\Projects\chartspoint\frontend\src\components\content\Table.astro`

## 8.2 Lists

### Ordered List
```html
<ol class="list-decimal list-inside space-y-3 pr-4">
  <li class="text-lg text-slate-700 leading-relaxed">
    العنصر الأول
  </li>
  <li class="text-lg text-slate-700 leading-relaxed">
    العنصر الثاني
  </li>
</ol>
```

### Unordered List
```html
<ul class="space-y-3 pr-4">
  <li class="flex items-start gap-3 text-lg text-slate-700 leading-relaxed">
    <svg class="w-5 h-5 text-gold-500 flex-shrink-0 mt-1">
      <use href="#icon-check" />
    </svg>
    <span>العنصر الأول</span>
  </li>
</ul>
```

## 8.3 Badges/Tags

### Specifications

**Sizes:**
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| sm | `0.25rem 0.75rem` | 0.8125rem | 24px |
| md | `0.375rem 1rem` | 0.875rem | 32px |
| lg | `0.5rem 1.25rem` | 1rem | 40px |

**Variants:**
- **Filled**: Solid background
- **Outlined**: Border only
- **Soft**: Light background tint

### Tailwind Implementation

```html
<!-- Pillar Badges -->
<span class="inline-flex items-center px-3 py-1.5 rounded-full
  bg-basics-500 text-white text-sm font-semibold">
  أساسيات
</span>

<span class="inline-flex items-center px-3 py-1.5 rounded-full
  bg-indicators-500 text-white text-sm font-semibold">
  المؤشرات
</span>

<!-- Status Badges -->
<span class="inline-flex items-center px-3 py-1.5 rounded-full
  bg-success-100 text-success-700 text-sm font-semibold">
  نشط
</span>

<span class="inline-flex items-center px-3 py-1.5 rounded-full
  bg-error-100 text-error-700 text-sm font-semibold">
  منتهي
</span>

<!-- Outlined Badge -->
<span class="inline-flex items-center px-3 py-1.5 rounded-full
  border-2 border-gold-500 text-gold-600 text-sm font-semibold">
  مميز
</span>
```

## 8.4 Avatar

### Specifications

**Sizes:**
| Size | Dimensions |
|------|------------|
| sm | 32px |
| md | 40px |
| lg | 56px |
| xl | 80px |

**Fallback:** Initials on colored background

### Tailwind Implementation

```html
<!-- With Image -->
<img src="..." alt="أحمد محمد"
     class="w-14 h-14 rounded-full object-cover
       border-4 border-gold-200" />

<!-- Fallback with Initials -->
<span class="inline-flex items-center justify-center w-14 h-14 rounded-full
  bg-navy-100 text-navy-600 text-xl font-bold
  border-4 border-navy-200">
  أم
</span>

<!-- Avatar Group -->
<div class="flex -space-x-3 rtl:space-x-reverse">
  <img src="..." class="w-10 h-10 rounded-full border-2 border-white" />
  <img src="..." class="w-10 h-10 rounded-full border-2 border-white" />
  <span class="inline-flex items-center justify-center w-10 h-10 rounded-full
    bg-slate-100 text-slate-600 text-sm font-semibold border-2 border-white">
    +5
  </span>
</div>
```

## 8.5 Stats Counters

### Tailwind Implementation

```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="text-center p-6 bg-white rounded-xl shadow-card">
    <p class="text-4xl lg:text-5xl font-bold text-gold-500 tabular-nums mb-2">
      50+
    </p>
    <p class="text-lg text-slate-600">
      مقالة تعليمية
    </p>
  </div>

  <div class="text-center p-6 bg-white rounded-xl shadow-card">
    <p class="text-4xl lg:text-5xl font-bold text-basics-500 tabular-nums mb-2">
      10K+
    </p>
    <p class="text-lg text-slate-600">
      قارئ شهري
    </p>
  </div>
</div>
```

---

# 9. Accordion and Tabs

## 9.1 FAQ Accordion

### Already Implemented

See `C:\Projects\chartspoint\frontend\src\components\content\FAQAccordion.astro`

**Key Features:**
- Schema.org FAQPage structured data
- Plus/minus icon animation
- Keyboard navigation (Arrow keys, Home, End)
- Single or multiple expand modes

## 9.2 Content Tabs

### Specifications

**Tab List:**
- Role: `tablist`
- Keyboard: Arrow keys for navigation

**Tab Panel:**
- Role: `tabpanel`
- Hidden until selected

**Animation:**
- Panel transition: `opacity 0 -> 1`, `200ms`

### Tailwind Implementation

```html
<div data-tabs>
  <!-- Tab List -->
  <div class="border-b-2 border-slate-200 mb-6" role="tablist">
    <nav class="flex gap-2">
      <button
        role="tab"
        id="tab-1"
        aria-selected="true"
        aria-controls="panel-1"
        class="relative min-h-[48px] px-6 py-3
          text-lg font-semibold whitespace-nowrap
          text-gold-500
          transition-colors duration-200
          after:absolute after:bottom-[-2px] after:inset-x-0 after:h-[3px]
          after:bg-gold-500 after:rounded-t-full"
        tabindex="0">
        النظرة العامة
      </button>
      <button
        role="tab"
        id="tab-2"
        aria-selected="false"
        aria-controls="panel-2"
        class="relative min-h-[48px] px-6 py-3
          text-lg font-semibold whitespace-nowrap
          text-slate-500 hover:text-slate-700
          transition-colors duration-200"
        tabindex="-1">
        الإحصائيات
      </button>
    </nav>
  </div>

  <!-- Tab Panels -->
  <div
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1"
    tabindex="0"
    class="animate-fade-in">
    <p class="text-lg text-slate-600 leading-relaxed">
      محتوى التبويب الأول...
    </p>
  </div>

  <div
    role="tabpanel"
    id="panel-2"
    aria-labelledby="tab-2"
    tabindex="0"
    class="hidden"
    hidden>
    <p class="text-lg text-slate-600 leading-relaxed">
      محتوى التبويب الثاني...
    </p>
  </div>
</div>
```

## 9.3 Collapsible Sections

### Tailwind Implementation

```html
<details class="group border border-slate-200 rounded-xl overflow-hidden">
  <summary class="flex items-center justify-between gap-4
    min-h-[56px] px-6 py-4 cursor-pointer
    bg-white hover:bg-slate-50
    list-none
    transition-colors duration-200">
    <span class="text-lg font-semibold text-navy-900">
      عنوان القسم
    </span>
    <svg class="w-5 h-5 text-slate-400 transition-transform duration-200
      group-open:rotate-180">
      <use href="#icon-chevron-down" />
    </svg>
  </summary>

  <div class="px-6 pb-6 pt-2">
    <p class="text-lg text-slate-600 leading-relaxed">
      محتوى القسم...
    </p>
  </div>
</details>
```

---

# 10. Special Components

## 10.1 WhatsApp Floating Button

### Specifications

**Position:**
- Fixed bottom-right (RTL: bottom-left)
- `bottom: 2rem`
- `left: 2rem`

**Button:**
- Size: `64px x 64px`
- Background: `#25D366` (WhatsApp green)
- Border Radius: `50%`
- Shadow: `0 4px 20px rgba(37, 211, 102, 0.35)`

**Hover:**
- Scale: `1.1`
- Shadow increase

**Pulse Animation:**
- Optional attention-grabbing pulse

### Tailwind Implementation

```html
<a
  href="https://wa.me/966XXXXXXXXX?text=..."
  target="_blank"
  rel="noopener noreferrer"
  class="fixed bottom-8 left-8 z-sticky
    w-16 h-16 flex items-center justify-center
    bg-[#25D366] hover:bg-[#20BD5A]
    rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)]
    hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)]
    transition-all duration-300
    focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-[#25D366]/40"
  aria-label="تواصل معنا عبر واتساب">
  <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

## 10.2 Sticky CTA Bar (Mobile)

### Specifications

**Visibility:**
- Only on mobile (`< 768px`)
- Show after scrolling past hero

**Container:**
- Position: Fixed bottom
- Height: `80px` (comfortable touch)
- Background: `#FFFFFF`
- Border Top: `1px solid #E2E8F0`
- Shadow: `0 -4px 24px rgba(15, 23, 42, 0.08)`

### Tailwind Implementation

```html
<div
  class="lg:hidden fixed bottom-0 left-0 right-0 z-sticky
    bg-white border-t border-slate-200 shadow-lg
    px-4 py-4
    transform translate-y-full
    transition-transform duration-300
    data-[visible]:translate-y-0"
  data-sticky-cta>

  <div class="flex items-center justify-between gap-4">
    <div class="min-w-0">
      <p class="text-sm font-semibold text-navy-900 truncate">
        ابدأ رحلة التعلم
      </p>
    </div>
    <button class="btn btn--primary btn--sm flex-shrink-0">
      ابدأ الآن
    </button>
  </div>
</div>
```

## 10.3 Reading Progress Bar

### Specifications

**Position:**
- Fixed top
- Below header (z-index: header - 1)

**Bar:**
- Height: `3px`
- Background: `#d5a035`

### Tailwind Implementation

```html
<div
  class="fixed top-[80px] left-0 right-0 h-[3px] z-sticky bg-slate-200"
  data-reading-progress>
  <div
    class="h-full bg-gold-500 transition-[width] duration-100"
    style="width: 0%"
    data-reading-progress-bar>
  </div>
</div>
```

### JavaScript

```javascript
function initReadingProgress() {
  const progressBar = document.querySelector('[data-reading-progress-bar]');
  const article = document.querySelector('article');

  if (!progressBar || !article) return;

  function updateProgress() {
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrolled = window.scrollY;

    const progress = Math.min(
      Math.max((scrolled - articleTop + windowHeight) / articleHeight, 0),
      1
    );

    progressBar.style.width = `${progress * 100}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
```

## 10.4 Share Buttons

### Specifications

**Platforms:**
- Twitter/X
- LinkedIn
- WhatsApp
- Copy Link

**Button Style:**
- Size: `48px x 48px`
- Border Radius: `50%`
- Platform brand colors

### Tailwind Implementation

```html
<div class="flex items-center gap-3">
  <span class="text-lg font-semibold text-slate-700">مشاركة:</span>

  <!-- Twitter -->
  <a href="https://twitter.com/intent/tweet?url=..."
     target="_blank"
     rel="noopener noreferrer"
     class="w-12 h-12 flex items-center justify-center
       bg-[#1DA1F2] hover:bg-[#1a8cd8]
       text-white rounded-full
       transition-colors duration-200"
     aria-label="مشاركة على تويتر">
    <svg class="w-5 h-5"><use href="#icon-twitter" /></svg>
  </a>

  <!-- LinkedIn -->
  <a href="https://www.linkedin.com/shareArticle?mini=true&url=..."
     target="_blank"
     rel="noopener noreferrer"
     class="w-12 h-12 flex items-center justify-center
       bg-[#0A66C2] hover:bg-[#084d93]
       text-white rounded-full
       transition-colors duration-200"
     aria-label="مشاركة على لينكد إن">
    <svg class="w-5 h-5"><use href="#icon-linkedin" /></svg>
  </a>

  <!-- WhatsApp -->
  <a href="https://wa.me/?text=..."
     target="_blank"
     rel="noopener noreferrer"
     class="w-12 h-12 flex items-center justify-center
       bg-[#25D366] hover:bg-[#20bd5a]
       text-white rounded-full
       transition-colors duration-200"
     aria-label="مشاركة على واتساب">
    <svg class="w-5 h-5"><use href="#icon-whatsapp" /></svg>
  </a>

  <!-- Copy Link -->
  <button
     class="w-12 h-12 flex items-center justify-center
       bg-slate-100 hover:bg-slate-200
       text-slate-600 rounded-full
       transition-colors duration-200"
     aria-label="نسخ الرابط"
     data-copy-link>
    <svg class="w-5 h-5"><use href="#icon-link" /></svg>
  </button>
</div>
```

## 10.5 Print Button

### Tailwind Implementation

```html
<button
  onclick="window.print()"
  class="inline-flex items-center gap-2 px-4 py-3 min-h-[48px]
    bg-white border border-slate-200 rounded-lg
    text-lg font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50
    transition-colors duration-200
    print:hidden"
  aria-label="طباعة المقالة">
  <svg class="w-5 h-5"><use href="#icon-print" /></svg>
  <span>طباعة</span>
</button>
```

---

# 11. Implementation Notes

## 11.1 Accessibility Checklist

For each component, verify:

- [ ] Minimum 48px touch targets
- [ ] 18px minimum font size for body text
- [ ] Focus visible states (3px gold ring)
- [ ] ARIA attributes where appropriate
- [ ] Keyboard navigation support
- [ ] Color contrast WCAG AA (AAA preferred)
- [ ] Reduced motion support
- [ ] RTL layout correctness

## 11.2 RTL Considerations

1. **Direction Flip:**
   - Margins/paddings using physical properties (not logical)
   - Icon arrows rotated 180 degrees
   - Border positions (right becomes left)

2. **Text Alignment:**
   - Default: `text-right`
   - Numbers: Always `dir="ltr"`

3. **Flexbox:**
   - Use `gap` instead of margins
   - `flex-row-reverse` when needed

4. **Icons:**
   - Directional icons: Add `rtl:rotate-180`
   - Non-directional: No changes needed

## 11.3 Component File Locations

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.astro         # Buttons
│   │   ├── Card.astro           # Cards
│   │   ├── Input.astro          # Form inputs
│   │   ├── Select.astro         # Select dropdown
│   │   ├── Checkbox.astro       # Checkbox
│   │   ├── Radio.astro          # Radio buttons
│   │   ├── Toggle.astro         # Toggle switch
│   │   ├── Modal.astro          # Modal dialog
│   │   ├── Toast.astro          # Toast notifications
│   │   ├── Alert.astro          # Alert boxes
│   │   ├── Badge.astro          # Badges/tags
│   │   ├── Avatar.astro         # Avatar
│   │   ├── Spinner.astro        # Loading spinner
│   │   ├── Skeleton.astro       # Skeleton loaders
│   │   ├── Progress.astro       # Progress bar
│   │   ├── Tooltip.astro        # Tooltip
│   │   ├── Dropdown.astro       # Dropdown menu
│   │   └── Popover.astro        # Popover
│   │
│   ├── navigation/
│   │   ├── Header.astro         # Site header
│   │   ├── MegaMenu.astro       # Mega menu
│   │   ├── MobileMenu.astro     # Mobile drawer
│   │   ├── Breadcrumbs.astro    # Breadcrumbs
│   │   ├── Pagination.astro     # Pagination
│   │   ├── Tabs.astro           # Tab navigation
│   │   └── BackToTop.astro      # Back to top button
│   │
│   ├── content/
│   │   ├── ArticleCard.astro    # Article card
│   │   ├── Table.astro          # Data tables
│   │   ├── FAQAccordion.astro   # FAQ accordion
│   │   └── ShareButtons.astro   # Share buttons
│   │
│   └── special/
│       ├── WhatsAppButton.astro # WhatsApp floating
│       ├── StickyCTA.astro      # Mobile sticky CTA
│       ├── ReadingProgress.astro # Reading progress
│       ├── CookieBanner.astro   # Cookie consent
│       └── PrintButton.astro    # Print button
```

## 11.4 CSS Custom Properties Reference

All component-specific CSS custom properties should be defined in `global.css` under the `:root` selector for consistency.

---

**Document End**

This specification provides production-ready implementation guidance for the Chartspoint design system. All components are designed with institutional fintech aesthetics, Arabic-first RTL support, and WCAG AAA accessibility standards for users aged 40-70.
