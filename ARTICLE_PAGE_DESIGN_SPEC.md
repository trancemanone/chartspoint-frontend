# CHARTSPOINT Article Page Layout - Complete Design Specification

A comprehensive design specification for the article page layout of Chartspoint.com, an Arabic-first (RTL) technical analysis education platform targeting traders aged 40-70.

---

## Design Philosophy

The article page is the most critical page type for educational content delivery. Every design decision prioritizes:

1. **Readability**: Optimized for Arabic script and older readers
2. **Trust**: Institutional fintech aesthetic that builds credibility
3. **Navigation**: Clear information architecture with progressive disclosure
4. **Accessibility**: WCAG AAA compliance for users 40-70
5. **Focus**: Distraction-free reading with contextual support

---

## A) Design System Tokens (Article-Specific)

### Color Palette

```css
/* Article Page Colors */
:root {
  /* Base */
  --article-bg-page: #F6F8FA;
  --article-bg-content: #FFFFFF;
  --article-bg-sidebar: #FFFFFF;
  --article-bg-highlight: #F8FAFC;

  /* Text Hierarchy */
  --article-text-primary: #0F172A;
  --article-text-secondary: #334155;
  --article-text-muted: #64748B;
  --article-text-caption: #94A3B8;

  /* Borders & Dividers */
  --article-border-light: #F1F5F9;
  --article-border-default: #E2E8F0;
  --article-border-strong: #CBD5E1;

  /* Accent Colors */
  --article-accent-gold: #d5a035;
  --article-accent-gold-light: #FDF8ED;
  --article-accent-gold-dark: #b8892a;

  /* Pillar Colors */
  --pillar-basics: #3B82F6;
  --pillar-basics-light: #EFF6FF;
  --pillar-indicators: #F97316;
  --pillar-indicators-light: #FFF7ED;
  --pillar-tools: #10B981;
  --pillar-tools-light: #ECFDF5;
  --pillar-tactics: #8B5CF6;
  --pillar-tactics-light: #F5F3FF;

  /* Semantic */
  --article-warning-bg: #FEF3C7;
  --article-warning-border: #F59E0B;
  --article-warning-text: #92400E;
  --article-info-bg: #DBEAFE;
  --article-info-border: #3B82F6;
  --article-success-bg: #D1FAE5;
  --article-success-border: #10B981;
}
```

### Typography Scale (Article-Optimized)

```css
/* Article Typography */
:root {
  /* Headings - Noto Kufi Arabic */
  --article-h1-size: 2.5rem;      /* 40px */
  --article-h1-size-md: 3rem;     /* 48px on desktop */
  --article-h1-weight: 800;
  --article-h1-line-height: 1.25;
  --article-h1-letter-spacing: -0.02em;

  --article-h2-size: 1.75rem;     /* 28px */
  --article-h2-size-md: 2rem;     /* 32px on desktop */
  --article-h2-weight: 700;
  --article-h2-line-height: 1.3;
  --article-h2-margin-top: 2.5rem;
  --article-h2-margin-bottom: 1.25rem;

  --article-h3-size: 1.375rem;    /* 22px */
  --article-h3-size-md: 1.5rem;   /* 24px on desktop */
  --article-h3-weight: 700;
  --article-h3-line-height: 1.35;
  --article-h3-margin-top: 2rem;
  --article-h3-margin-bottom: 1rem;

  /* Body Text - Tajawal */
  --article-body-size: 1.125rem;  /* 18px minimum */
  --article-body-size-md: 1.25rem; /* 20px on desktop */
  --article-body-weight: 400;
  --article-body-line-height: 1.8;
  --article-paragraph-margin: 1.5rem;

  /* Captions & Meta */
  --article-meta-size: 0.9375rem; /* 15px minimum */
  --article-caption-size: 0.9375rem;
}
```

### Spacing Scale

```css
:root {
  /* Article Container */
  --article-max-width: 840px;
  --article-sidebar-width: 280px;
  --article-gap: 3rem;

  /* Content Box */
  --content-padding-x: 1.5rem;
  --content-padding-x-md: 2rem;
  --content-padding-y: 2rem;
  --content-padding-y-md: 2.5rem;

  /* Section Spacing */
  --section-gap: 3rem;
  --section-gap-md: 4rem;

  /* Element Spacing */
  --element-gap-sm: 0.75rem;
  --element-gap: 1rem;
  --element-gap-lg: 1.5rem;
}
```

### Motion Tokens

```css
:root {
  /* Article Animations */
  --article-transition-fast: 150ms ease;
  --article-transition-base: 200ms ease;
  --article-transition-smooth: 300ms cubic-bezier(0.45, 0, 0.15, 1);

  /* Heading Animations */
  --h3-bar-animation-duration: 400ms;
  --h3-bar-animation-delay: 100ms;
  --h3-bar-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## B) Component Specifications

### 1. Article Header Section

#### Breadcrumbs

```html
<!-- Structure -->
<nav class="article-breadcrumbs" aria-label="مسار التنقل">
  <ol class="breadcrumbs-list">
    <li class="breadcrumbs-item">
      <a href="/" class="breadcrumbs-link">
        <svg class="breadcrumbs-home-icon">...</svg>
        <span>الرئيسية</span>
      </a>
      <span class="breadcrumbs-separator" aria-hidden="true">
        <svg><!-- chevron left for RTL --></svg>
      </span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/basics" class="breadcrumbs-link">
        <span>أساسيات</span>
      </a>
      <span class="breadcrumbs-separator" aria-hidden="true">...</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/basics/patterns" class="breadcrumbs-link">
        <span>النماذج الفنية</span>
      </a>
      <span class="breadcrumbs-separator" aria-hidden="true">...</span>
    </li>
    <li class="breadcrumbs-item" aria-current="page">
      <span class="breadcrumbs-current">نموذج الرأس والكتفين</span>
    </li>
  </ol>
</nav>
```

**Styling Specifications:**

```css
.article-breadcrumbs {
  padding: 1rem 0;
  background: var(--article-bg-highlight);
  border-bottom: 1px solid var(--article-border-light);
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem; /* 15px minimum */
}

.breadcrumbs-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0;
  min-height: 44px; /* Touch target */
  color: var(--article-accent-gold-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 200ms ease;
}

.breadcrumbs-link:hover {
  color: var(--article-accent-gold);
}

/* Underline on text */
.breadcrumbs-link span {
  position: relative;
}

.breadcrumbs-link span::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 0;
  left: 0;
  height: 2px;
  background: currentColor;
  opacity: 0.4;
  border-radius: 1px;
}

.breadcrumbs-link:hover span::after {
  opacity: 0.8;
}

.breadcrumbs-current {
  color: var(--article-text-primary);
  font-weight: 600;
}

.breadcrumbs-separator {
  color: var(--article-text-caption);
}

.breadcrumbs-separator svg {
  width: 16px;
  height: 16px;
  /* Chevron points left for RTL navigation */
}
```

#### Article Title (H1)

```html
<header class="article-header">
  <!-- Pillar Badge -->
  <div class="article-pillar-badge" data-pillar="basics">
    <span>أساسيات التحليل الفني</span>
  </div>

  <!-- Title -->
  <h1 class="article-title" itemprop="headline">
    نموذج الرأس والكتفين: دليلك الشامل لأقوى نماذج الانعكاس
  </h1>

  <!-- Meta Row -->
  <div class="article-meta">
    <span class="meta-item meta-reading-time">
      <svg>...</svg>
      <span>12 دقيقة للقراءة</span>
    </span>
    <span class="meta-item meta-word-count">
      <svg>...</svg>
      <span>3,450 كلمة</span>
    </span>
    <span class="meta-item meta-date">
      <time datetime="2026-01-15">15 يناير 2026</time>
    </span>
    <span class="expertise-badge expertise-intermediate">
      متوسط
    </span>
  </div>

  <!-- Trust Badges -->
  <div class="article-trust-badges">
    <div class="trust-badge">
      <svg class="trust-badge-icon"><!-- shield check --></svg>
      <span>محتوى موثق</span>
    </div>
    <div class="trust-badge">
      <svg class="trust-badge-icon"><!-- clipboard check --></svg>
      <span>مراجعة فريق Chartspoint</span>
    </div>
  </div>
</header>
```

**H1 Styling:**

```css
.article-title {
  font-family: var(--font-heading);
  font-size: var(--article-h1-size);
  font-weight: var(--article-h1-weight);
  line-height: var(--article-h1-line-height);
  letter-spacing: var(--article-h1-letter-spacing);
  color: var(--color-navy-900);
  margin: 0 0 1.5rem;
  text-wrap: balance;
}

@media (min-width: 768px) {
  .article-title {
    font-size: var(--article-h1-size-md);
  }
}
```

**Pillar Badge:**

```css
.article-pillar-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.article-pillar-badge[data-pillar="basics"] {
  background: var(--pillar-basics-light);
  color: var(--pillar-basics);
}

.article-pillar-badge[data-pillar="indicators"] {
  background: var(--pillar-indicators-light);
  color: var(--pillar-indicators);
}

.article-pillar-badge[data-pillar="tools"] {
  background: var(--pillar-tools-light);
  color: var(--pillar-tools);
}

.article-pillar-badge[data-pillar="tactics"] {
  background: var(--pillar-tactics-light);
  color: var(--pillar-tactics);
}
```

**Expertise Level Badge:**

```css
.expertise-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
}

.expertise-beginner {
  background: #D1FAE5;
  color: #047857;
}

.expertise-intermediate {
  background: #FEF3C7;
  color: #B45309;
}

.expertise-advanced {
  background: #FEE2E2;
  color: #B91C1C;
}
```

**Trust Badges:**

```css
.article-trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--article-bg-highlight);
  border: 1px solid var(--article-border-default);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--article-text-secondary);
}

.trust-badge-icon {
  width: 18px;
  height: 18px;
  color: var(--article-accent-gold);
}
```

#### Featured Image Treatment

```css
.article-featured-image {
  position: relative;
  margin: 2rem 0;
  border-radius: 1rem;
  overflow: hidden;
  border: 4px solid var(--pillar-color);
  box-shadow:
    0 8px 30px rgba(15, 23, 42, 0.08),
    0 16px 60px rgba(15, 23, 42, 0.04);
}

.article-featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Optional caption */
.article-featured-caption {
  padding: 1rem 1.5rem;
  background: var(--article-bg-highlight);
  font-size: var(--article-caption-size);
  color: var(--article-text-muted);
  border-top: 1px solid var(--article-border-light);
}
```

---

### 2. Table of Contents (TOC)

#### Desktop: Sticky Sidebar

```html
<nav class="toc" aria-labelledby="toc-title" data-toc>
  <header class="toc-header">
    <h2 id="toc-title" class="toc-title">
      <svg class="toc-icon">...</svg>
      <span>محتويات المقال</span>
    </h2>
  </header>

  <ul class="toc-list" role="list">
    <li class="toc-item toc-item--h2">
      <a href="#section-0" class="toc-link" data-toc-link="section-0">
        <span class="toc-marker toc-marker--h2"></span>
        <span class="toc-text">ما هو نموذج الرأس والكتفين؟</span>
      </a>
    </li>
    <li class="toc-item toc-item--h3">
      <a href="#section-1" class="toc-link" data-toc-link="section-1">
        <span class="toc-marker toc-marker--h3"></span>
        <span class="toc-text">التعريف والأساسيات</span>
      </a>
    </li>
    <!-- ... more items -->
  </ul>

  <!-- Progress Indicator -->
  <div class="toc-progress" aria-hidden="true">
    <div class="toc-progress-bar" data-toc-progress></div>
  </div>
</nav>
```

**Styling:**

```css
.toc {
  display: none;
  position: sticky;
  top: 6rem; /* Below fixed header */
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid var(--article-border-default);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

@media (min-width: 1024px) {
  .toc {
    display: block;
  }
}

.toc-header {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 1.25rem 1.5rem 1rem;
  background: #FFFFFF;
  border-bottom: 1px solid var(--article-border-light);
}

.toc-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0;
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-navy-900);
}

.toc-icon {
  color: var(--article-accent-gold);
  width: 20px;
  height: 20px;
}

.toc-list {
  list-style: none;
  padding: 0.75rem 0 1.25rem;
  margin: 0;
}

.toc-item--h3 {
  padding-right: 1rem;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  min-height: 48px;
  text-decoration: none;
  transition: background 200ms ease, color 200ms ease;
}

.toc-link:hover {
  background: var(--article-accent-gold-light);
}

/* Markers */
.toc-marker--h2 {
  width: 8px;
  height: 8px;
  background: var(--color-navy-900);
  border-radius: 2px;
  transition: background 200ms ease, transform 200ms ease;
}

.toc-marker--h3 {
  width: 6px;
  height: 6px;
  background: var(--article-text-caption);
  border-radius: 50%;
  transition: background 200ms ease, transform 200ms ease;
}

.toc-link:hover .toc-marker--h2,
.toc-link:hover .toc-marker--h3 {
  background: var(--article-accent-gold);
  transform: scale(1.15);
}

/* Text */
.toc-item--h2 .toc-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-navy-900);
}

.toc-item--h3 .toc-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--article-text-muted);
}

/* Active State */
.toc-link.is-active {
  background: var(--article-accent-gold-light);
  box-shadow: inset 3px 0 0 var(--article-accent-gold);
}

.toc-link.is-active .toc-marker--h2,
.toc-link.is-active .toc-marker--h3 {
  background: var(--article-accent-gold);
}

.toc-link.is-active .toc-text {
  color: var(--color-navy-900);
  font-weight: 700;
}

/* Progress Bar */
.toc-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--article-border-light);
}

.toc-progress-bar {
  width: 100%;
  height: 0%;
  background: linear-gradient(180deg, var(--article-accent-gold) 0%, var(--pillar-color) 100%);
  transition: height 100ms ease;
}
```

#### Mobile: Collapsible Accordion

```css
.toc-mobile {
  display: block;
  margin-bottom: 1.5rem;
  background: #FFFFFF;
  border-radius: 0.875rem;
  border: 1px solid var(--article-border-default);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

@media (min-width: 1024px) {
  .toc-mobile {
    display: none;
  }
}

.toc-mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.25rem;
  min-height: 56px; /* Comfortable touch target */
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 200ms ease;
}

.toc-mobile-toggle:hover {
  background: var(--article-bg-highlight);
}

.toc-mobile-chevron {
  transition: transform 250ms ease;
}

.toc-mobile-toggle[aria-expanded="true"] .toc-mobile-chevron {
  transform: rotate(180deg);
}

.toc-mobile-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;
}

.toc-mobile-panel.is-expanded {
  max-height: 500px;
}

.toc-mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  min-height: 48px; /* Touch target */
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background 200ms ease;
}
```

---

### 3. Article Body Typography

#### H2 Styling: First Word Underline + Fading Line

```css
/* H2 Heading with custom underline system */
.article-content h2 {
  position: relative;
  font-family: var(--font-heading);
  font-size: var(--article-h2-size);
  font-weight: var(--article-h2-weight);
  line-height: var(--article-h2-line-height);
  color: var(--color-navy-900);
  margin-top: var(--article-h2-margin-top);
  margin-bottom: var(--article-h2-margin-bottom);
  padding-bottom: 1rem;
  border-bottom: none !important;
}

@media (min-width: 768px) {
  .article-content h2 {
    font-size: var(--article-h2-size-md);
  }
}

/* Thin pale gray fading line - full width */
.article-content h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(
    to left,
    var(--article-border-strong) 0%,
    var(--article-border-default) 30%,
    rgba(226, 232, 240, 0.4) 70%,
    rgba(226, 232, 240, 0) 100%
  );
}

/* Thick gold underline under first word area */
.article-content h2::before {
  content: '';
  position: absolute;
  bottom: -2px;
  right: 0;
  width: clamp(80px, 20%, 140px);
  height: 4px;
  background: var(--article-accent-gold);
  border-radius: 2px;
  z-index: 1;
}
```

#### H3 Styling: Animated Vertical Bar

```css
/* H3 with vertical accent line */
.article-content h3 {
  position: relative;
  font-family: var(--font-heading);
  font-size: var(--article-h3-size);
  font-weight: var(--article-h3-weight);
  line-height: var(--article-h3-line-height);
  color: var(--color-navy-800);
  margin-top: var(--article-h3-margin-top);
  margin-bottom: var(--article-h3-margin-bottom);
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .article-content h3 {
    font-size: var(--article-h3-size-md);
  }
}

/* Vertical gold bar - initially hidden */
.article-content h3::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0.15em;
  width: 4px;
  height: 1.2em;
  background: var(--article-accent-gold);
  border-radius: 2px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform var(--h3-bar-animation-duration) var(--h3-bar-easing);
}

/* Animated on scroll into view */
.article-content h3.h3-visible::before {
  transform: scaleY(1);
}

/* Reduced motion: show immediately */
@media (prefers-reduced-motion: reduce) {
  .article-content h3::before {
    transform: scaleY(1);
    transition: none;
  }
}
```

#### Paragraph Spacing

```css
.article-content p {
  font-family: var(--font-body);
  font-size: var(--article-body-size);
  font-weight: var(--article-body-weight);
  line-height: var(--article-body-line-height);
  color: var(--article-text-secondary);
  margin-bottom: var(--article-paragraph-margin);
}

@media (min-width: 768px) {
  .article-content p {
    font-size: var(--article-body-size-md);
  }
}

/* First paragraph after heading - no extra margin */
.article-content h2 + p,
.article-content h3 + p {
  margin-top: 0;
}
```

#### List Styling

```css
/* Unordered Lists */
.article-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.article-content ul > li {
  position: relative;
  padding-right: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.7;
}

.article-content ul > li::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0.625em;
  width: 8px;
  height: 8px;
  background: var(--article-accent-gold);
  border-radius: 2px;
}

/* Nested list items - smaller, circular markers */
.article-content ul ul > li::before {
  width: 6px;
  height: 6px;
  background: var(--article-border-strong);
  border-radius: 50%;
}

/* Ordered Lists */
.article-content ol {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  counter-reset: list-counter;
}

.article-content ol > li {
  position: relative;
  padding-right: 2.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.7;
  counter-increment: list-counter;
}

.article-content ol > li::before {
  content: counter(list-counter);
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 700;
  color: #FFFFFF;
  background: var(--article-accent-gold);
  border-radius: 50%;
}
```

#### Blockquote / Callout Boxes

```css
/* Standard Blockquote */
.article-content blockquote {
  position: relative;
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  background: var(--article-bg-highlight);
  border-right: 4px solid var(--article-accent-gold);
  border-radius: 0 0.75rem 0.75rem 0;
  font-size: 1.125rem;
  font-style: normal;
  color: var(--article-text-secondary);
}

.article-content blockquote p {
  margin: 0;
}

/* Callout Boxes */
.callout {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border-right: 4px solid;
}

.callout-info {
  background: var(--article-info-bg);
  border-color: var(--article-info-border);
}

.callout-warning {
  background: var(--article-warning-bg);
  border-color: var(--article-warning-border);
}

.callout-success {
  background: var(--article-success-bg);
  border-color: var(--article-success-border);
}

.callout-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
}

.callout-content {
  font-size: 1rem;
  line-height: 1.6;
}
```

#### Table Styling (Terminal-Grade)

```css
.article-content table {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  font-size: 1rem;
  background: #FFFFFF;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}

.article-content th {
  padding: 1rem 1.25rem;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  text-align: right;
  color: var(--color-navy-900);
  background: var(--article-bg-highlight);
  border-bottom: 2px solid var(--article-border-default);
}

.article-content td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--article-border-light);
  color: var(--article-text-secondary);
  font-variant-numeric: tabular-nums; /* Numeric alignment */
}

.article-content tr:last-child td {
  border-bottom: none;
}

.article-content tr:hover td {
  background: rgba(213, 160, 53, 0.04);
}

/* Responsive table wrapper */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 2rem 0;
  border-radius: 0.75rem;
  border: 1px solid var(--article-border-default);
}
```

#### Code/Formula Blocks

```css
/* Inline Code */
.article-content code {
  padding: 0.125rem 0.375rem;
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--article-bg-highlight);
  border-radius: 0.25rem;
  direction: ltr; /* Code is always LTR */
}

/* Code Block */
.article-content pre {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--color-navy-900);
  border-radius: 0.75rem;
  overflow-x: auto;
  direction: ltr;
}

.article-content pre code {
  padding: 0;
  background: transparent;
  color: #E2E8F0;
  font-size: 0.9375rem;
  line-height: 1.6;
}
```

#### Image Captions

```css
.article-content figure {
  margin: 2rem 0;
}

.article-content figure img {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.article-content figcaption {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: var(--article-caption-size);
  color: var(--article-text-muted);
  text-align: center;
  background: var(--article-bg-highlight);
  border-radius: 0.5rem;
}
```

---

### 4. Internal Links Styling

```css
/* In-Content Links */
.article-content a:not(.toc-link):not(.breadcrumb-link):not(.btn) {
  color: var(--article-text-primary);
  text-decoration: underline;
  text-decoration-color: var(--article-accent-gold);
  text-underline-offset: 10px; /* Clears Arabic descenders */
  text-decoration-thickness: 2px;
  padding-bottom: 0.15em;
  transition:
    color 200ms ease,
    text-decoration-color 200ms ease,
    text-underline-offset 200ms ease;
}

.article-content a:not(.toc-link):not(.breadcrumb-link):not(.btn):hover {
  color: var(--article-accent-gold);
  text-decoration-color: var(--article-text-primary);
  text-underline-offset: 12px;
}

.article-content a:not(.toc-link):not(.breadcrumb-link):not(.btn):focus-visible {
  outline: 2px solid var(--article-accent-gold);
  outline-offset: 4px;
  border-radius: 2px;
}

/* External Link Indicator */
.article-content a[target="_blank"]::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-image: url("data:image/svg+xml,...");
  background-size: contain;
  opacity: 0.6;
}
```

#### Related Articles Section

```css
.related-articles {
  margin: 3rem 0;
  padding-top: 2.5rem;
  border-top: 1px solid var(--article-border-default);
}

.related-articles-title {
  position: relative;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-navy-900);
}

/* Title underline */
.related-articles-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 4px;
  width: 100%;
  max-width: 200px;
  background: linear-gradient(
    to left,
    var(--article-accent-gold) 0%,
    var(--article-accent-gold) 40%,
    var(--article-border-default) 40%,
    transparent 100%
  );
  border-radius: 2px;
}

.related-articles-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .related-articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .related-articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Cross-Pillar Link Cards

```css
.pillar-link-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #FFFFFF;
  border-radius: 0.875rem;
  border: 1px solid var(--article-border-default);
  border-right-width: 4px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition:
    box-shadow 300ms ease,
    transform 300ms ease;
}

.pillar-link-card[data-pillar="basics"] {
  border-right-color: var(--pillar-basics);
}

.pillar-link-card[data-pillar="tactics"] {
  border-right-color: var(--pillar-tactics);
}

.pillar-link-card:hover {
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
  transform: translateY(-2px);
}

.pillar-link-card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pillar-light);
  border-radius: 0.5rem;
  color: var(--pillar-color);
}

.pillar-link-card-content {
  flex: 1;
}

.pillar-link-card-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--pillar-color);
  margin-bottom: 0.25rem;
}

.pillar-link-card-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-navy-900);
  margin: 0;
}
```

---

### 5. FAQ Accordion Section

```html
<section class="faq-section" aria-labelledby="faq-title">
  <h2 id="faq-title" class="faq-title">
    <span class="faq-title-text">الأسئلة الشائعة</span>
  </h2>

  <div class="faq-accordion" data-faq-accordion role="region">
    <div class="faq-item" data-faq-item>
      <h3 class="faq-question-heading">
        <button
          type="button"
          class="faq-question"
          aria-expanded="false"
          aria-controls="faq-panel-0"
        >
          <span class="faq-question-text">ما هي أهم خصائص نموذج الرأس والكتفين؟</span>
          <span class="faq-icon" aria-hidden="true">
            <svg class="faq-icon-plus">...</svg>
            <svg class="faq-icon-minus">...</svg>
          </span>
        </button>
      </h3>
      <div
        id="faq-panel-0"
        class="faq-answer"
        role="region"
        hidden
      >
        <div class="faq-answer-content">
          <p>نموذج الرأس والكتفين يتكون من ثلاث قمم...</p>
        </div>
      </div>
    </div>
    <!-- More FAQ items -->
  </div>
</section>
```

**Styling (builds on existing FAQAccordion):**

```css
.faq-section {
  margin: 3rem 0;
}

.faq-title {
  position: relative;
  margin: 0 0 1.5rem;
  padding-bottom: 1rem;
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-navy-900);
}

/* Title underline */
.faq-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(
    to left,
    var(--article-accent-gold) 0%,
    var(--article-accent-gold) 15%,
    var(--article-border-default) 15%,
    transparent 100%
  );
  border-radius: 2px;
}

.faq-accordion {
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid var(--article-border-default);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid var(--article-border-light);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 1.5rem;
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-navy-900);
  text-align: right;
  background: transparent;
  border: none;
  cursor: pointer;
  min-height: 64px;
  transition: background 200ms ease, color 200ms ease;
}

.faq-question:hover {
  background: var(--article-bg-highlight);
}

.faq-question:focus-visible {
  outline: none;
  background: rgba(213, 160, 53, 0.06);
  box-shadow: inset 0 0 0 3px rgba(213, 160, 53, 0.4);
}

/* Icon container */
.faq-icon {
  position: relative;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--article-bg-highlight);
  border-radius: 50%;
  color: var(--article-accent-gold);
  transition: background 200ms ease;
}

.faq-question:hover .faq-icon {
  background: rgba(213, 160, 53, 0.1);
}

/* Plus/Minus toggle */
.faq-icon-plus,
.faq-icon-minus {
  position: absolute;
  transition: opacity 200ms ease, transform 300ms ease;
}

.faq-icon-plus {
  opacity: 1;
  transform: rotate(0deg);
}

.faq-icon-minus {
  opacity: 0;
  transform: rotate(-90deg);
}

.faq-question[aria-expanded="true"] .faq-icon {
  background: var(--article-accent-gold);
  color: #FFFFFF;
}

.faq-question[aria-expanded="true"] .faq-icon-plus {
  opacity: 0;
  transform: rotate(90deg);
}

.faq-question[aria-expanded="true"] .faq-icon-minus {
  opacity: 1;
  transform: rotate(0deg);
}

/* Answer panel */
.faq-answer {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 350ms ease-out,
    opacity 250ms ease;
}

.faq-answer.is-expanded {
  opacity: 1;
}

.faq-answer-content {
  padding: 0 1.5rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--article-text-secondary);
}

/* Schema markup note - FAQ pages should include:
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [...]
   }
   </script>
*/
```

---

### 6. Author Bio Card

```html
<aside class="author-bio" aria-labelledby="author-title">
  <h2 id="author-title" class="sr-only">عن الكاتب</h2>

  <div class="author-card">
    <header class="author-header">
      <div class="author-avatar-wrapper">
        <img
          src="/authors/ahmad.jpg"
          alt="أحمد محمد"
          class="author-avatar"
          width="96"
          height="96"
          loading="lazy"
        />
        <span class="author-verified" aria-label="كاتب موثق">
          <svg><!-- checkmark --></svg>
        </span>
      </div>

      <div class="author-info">
        <h3 class="author-name">
          <a href="/author/ahmad" rel="author">أحمد محمد</a>
        </h3>
        <p class="author-role">محلل فني معتمد - CFA</p>

        <div class="author-social">
          <a href="#" class="author-social-link" aria-label="تويتر">
            <svg>...</svg>
          </a>
          <a href="#" class="author-social-link" aria-label="لينكد إن">
            <svg>...</svg>
          </a>
        </div>
      </div>
    </header>

    <div class="author-body">
      <p class="author-bio-text">
        محلل فني معتمد مع خبرة تزيد عن 15 عاماً في الأسواق المالية السعودية والخليجية.
        حاصل على شهادة CFA ومتخصص في التحليل الفني للأسهم والعملات.
      </p>

      <!-- Credentials - E-E-A-T -->
      <div class="author-credentials">
        <h4 class="author-section-title">
          <svg>...</svg>
          <span>المؤهلات والشهادات</span>
        </h4>
        <ul class="author-credentials-list">
          <li>
            <svg><!-- check --></svg>
            <span>محلل مالي معتمد (CFA)</span>
          </li>
          <li>
            <svg><!-- check --></svg>
            <span>عضو جمعية المحللين الفنيين الأمريكية</span>
          </li>
        </ul>
      </div>

      <!-- Expertise Areas -->
      <div class="author-expertise">
        <h4 class="author-section-title">
          <svg>...</svg>
          <span>مجالات الخبرة</span>
        </h4>
        <div class="author-expertise-tags">
          <span class="expertise-tag">التحليل الفني</span>
          <span class="expertise-tag">النماذج السعرية</span>
          <span class="expertise-tag">إدارة المخاطر</span>
        </div>
      </div>
    </div>

    <footer class="author-footer">
      <div class="author-meta">
        <span class="author-meta-item">
          <svg>...</svg>
          <span class="author-meta-label">مراجعة:</span>
          <span class="author-meta-value">فريق Chartspoint</span>
        </span>
        <span class="author-meta-item">
          <svg>...</svg>
          <span class="author-meta-label">آخر تحديث:</span>
          <time datetime="2026-01-15">15 يناير 2026</time>
        </span>
      </div>
    </footer>
  </div>
</aside>
```

**Styling (extends existing AuthorBio):**

```css
.author-bio {
  margin: 2.5rem 0;
}

.author-card {
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid var(--article-border-default);
  border-right-width: 4px;
  border-right-color: var(--article-accent-gold);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.author-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  background: linear-gradient(180deg, var(--article-bg-highlight) 0%, #FFFFFF 100%);
  border-bottom: 1px solid var(--article-border-light);
}

.author-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #FFFFFF;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
}

@media (min-width: 768px) {
  .author-avatar {
    width: 96px;
    height: 96px;
  }
}

.author-verified {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--article-accent-gold);
  border-radius: 50%;
  border: 3px solid #FFFFFF;
  box-shadow: 0 2px 6px rgba(213, 160, 53, 0.3);
}

.author-verified svg {
  width: 14px;
  height: 14px;
  color: #FFFFFF;
}

.author-name {
  margin: 0 0 0.25rem;
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-navy-900);
}

.author-name a {
  color: inherit;
  text-decoration: none;
  transition: color 200ms ease;
}

.author-name a:hover {
  color: var(--article-accent-gold);
}

.author-role {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--article-text-muted);
}

.author-social {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.875rem;
}

.author-social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--article-bg-highlight);
  border-radius: 50%;
  color: var(--article-text-muted);
  transition:
    background 200ms ease,
    color 200ms ease,
    transform 200ms ease;
}

.author-social-link:hover {
  background: var(--article-accent-gold);
  color: #FFFFFF;
  transform: translateY(-2px);
}

.author-body {
  padding: 1.5rem;
}

.author-bio-text {
  margin: 0 0 1.5rem;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--article-text-secondary);
}

.author-section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-navy-900);
}

.author-section-title svg {
  width: 18px;
  height: 18px;
  color: var(--article-accent-gold);
}

.author-credentials-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.author-credentials-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  color: var(--article-text-secondary);
}

.author-credentials-list svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--article-accent-gold);
  margin-top: 0.125rem;
}

.author-expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.expertise-tag {
  display: inline-flex;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--article-accent-gold);
  background: rgba(213, 160, 53, 0.08);
  border-radius: 9999px;
  transition: background 200ms ease;
}

.expertise-tag:hover {
  background: rgba(213, 160, 53, 0.14);
}

.author-footer {
  padding: 1.25rem 1.5rem;
  background: var(--article-bg-highlight);
  border-top: 1px solid var(--article-border-light);
}

.author-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.author-meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--article-text-secondary);
}

.author-meta-item svg {
  width: 16px;
  height: 16px;
  color: var(--article-text-caption);
}

.author-meta-label {
  color: var(--article-text-muted);
}

.author-meta-value {
  font-weight: 500;
  color: var(--article-text-secondary);
}
```

---

### 7. Risk Disclaimer Box

```html
<div class="risk-disclaimer" role="alert">
  <header class="risk-disclaimer-header">
    <svg class="risk-disclaimer-icon" aria-hidden="true">
      <!-- warning triangle -->
    </svg>
    <h4 class="risk-disclaimer-title">تنويه هام</h4>
  </header>
  <div class="risk-disclaimer-content">
    <p>
      المعلومات الواردة في هذا المقال هي لأغراض تعليمية فقط ولا تشكل نصيحة استثمارية.
      التداول في الأسواق المالية ينطوي على مخاطر عالية قد تؤدي إلى خسارة رأس المال.
      يرجى استشارة مستشار مالي مرخص قبل اتخاذ أي قرارات استثمارية.
    </p>
  </div>
</div>
```

**Styling:**

```css
.risk-disclaimer {
  margin: 3rem 0;
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-right-width: 4px;
  border-radius: 0 0.75rem 0.75rem 0;
  overflow: hidden;
}

.risk-disclaimer-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}

.risk-disclaimer-icon {
  width: 24px;
  height: 24px;
  color: #B45309;
  flex-shrink: 0;
}

.risk-disclaimer-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  color: #92400E;
}

.risk-disclaimer-content {
  padding: 1rem 1.5rem;
}

.risk-disclaimer-content p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #92400E;
}

/* Placement rules:
   - Always appears at the end of article body
   - Before FAQ section if present
   - Should not be dismissible
   - Must be visible without scrolling past main content
*/
```

---

### 8. Related Articles Grid

```css
.related-articles-card {
  --card-pillar-color: var(--article-accent-gold);

  background: #FFFFFF;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid var(--article-border-default);
  border-right-width: 4px;
  border-right-color: var(--card-pillar-color);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition:
    box-shadow 300ms ease,
    transform 300ms ease;
}

.related-articles-card[data-pillar="basics"] {
  --card-pillar-color: var(--pillar-basics);
}

.related-articles-card[data-pillar="indicators"] {
  --card-pillar-color: var(--pillar-indicators);
}

.related-articles-card[data-pillar="tools"] {
  --card-pillar-color: var(--pillar-tools);
}

.related-articles-card[data-pillar="tactics"] {
  --card-pillar-color: var(--pillar-tactics);
}

.related-articles-card:hover {
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
  transform: translateY(-4px);
}

.related-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.related-card-image-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--article-bg-highlight);
}

.related-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms ease;
}

.related-articles-card:hover .related-card-image {
  transform: scale(1.05);
}

.related-card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #FFFFFF;
  background: var(--card-pillar-color);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}

.related-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
}

.related-card-title {
  margin: 0 0 0.625rem;
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-navy-900);
  /* 2-line clamp */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 200ms ease;
}

.related-articles-card:hover .related-card-title {
  color: var(--card-pillar-color);
}

.related-card-excerpt {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--article-text-muted);
  /* 2-line clamp */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
}

.related-card-reading-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--article-text-caption);
}

.related-card-cta {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-pillar-color);
}

.related-card-cta svg {
  transform: scaleX(-1); /* RTL flip */
  transition: transform 200ms ease;
}

.related-articles-card:hover .related-card-cta svg {
  transform: scaleX(-1) translateX(-4px);
}
```

---

### 9. Mobile Optimizations

#### Touch Targets

```css
/* All interactive elements must meet 48px minimum */
.article-content a,
.toc-link,
.toc-mobile-link,
.faq-question,
.author-social-link,
.breadcrumbs-link {
  min-height: 48px;
  min-width: 48px;
}

/* For smaller visual elements, extend touch area */
.touch-target-extend {
  position: relative;
}

.touch-target-extend::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 48px;
  min-height: 48px;
}
```

#### Font Sizes for Readability

```css
/* Mobile typography - never smaller than 15px */
@media (max-width: 767px) {
  .article-content {
    font-size: 1.125rem; /* 18px */
    line-height: 1.8;
  }

  .article-content h2 {
    font-size: 1.5rem; /* 24px */
  }

  .article-content h3 {
    font-size: 1.25rem; /* 20px */
  }

  .meta-item,
  .trust-badge,
  .expertise-badge,
  .breadcrumbs-list {
    font-size: 0.9375rem; /* 15px minimum */
  }
}
```

#### Horizontal Scroll Prevention

```css
/* Container constraints */
.article-page {
  overflow-x: hidden;
}

.article-content {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* Table responsiveness */
.article-content table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Code block responsiveness */
.article-content pre {
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Image constraints */
.article-content img {
  max-width: 100%;
  height: auto;
}
```

#### Image Lazy Loading

```html
<!-- All images below the fold should use lazy loading -->
<img
  src="/images/chart-pattern.webp"
  alt="نموذج الرأس والكتفين على الرسم البياني"
  width="800"
  height="450"
  loading="lazy"
  decoding="async"
/>
```

---

## C) Page Layout Blueprint

### Grid Structure

```
Desktop (1024px+):
┌─────────────────────────────────────────────────────┐
│                    HEADER (80px)                     │
├─────────────────────────────────────────────────────┤
│                    BREADCRUMBS                       │
├─────────────────────────────────────────────────────┤
│                  ARTICLE HEADER                      │
│            (Title, Meta, Trust Badges)              │
├─────────────────────────────────────────────────────┤
│                  FEATURED IMAGE                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌─────────────────────────────────┐ │
│  │          │  │                                  │ │
│  │   TOC    │  │        ARTICLE BODY             │ │
│  │ (Sticky) │  │                                  │ │
│  │  280px   │  │                                  │ │
│  │          │  │        (max 840px)              │ │
│  │          │  │                                  │ │
│  └──────────┘  ├─────────────────────────────────┤ │
│                │     RISK DISCLAIMER              │ │
│                ├─────────────────────────────────┤ │
│                │        FAQ SECTION              │ │
│                ├─────────────────────────────────┤ │
│                │      AUTHOR BIO CARD            │ │
│                ├─────────────────────────────────┤ │
│                │    RELATED ARTICLES             │ │
│                └─────────────────────────────────┘ │
│                                                      │
├─────────────────────────────────────────────────────┤
│                     FOOTER                           │
└─────────────────────────────────────────────────────┘

Mobile (<1024px):
┌───────────────────────┐
│        HEADER         │
├───────────────────────┤
│      BREADCRUMBS      │
├───────────────────────┤
│    ARTICLE HEADER     │
├───────────────────────┤
│    FEATURED IMAGE     │
├───────────────────────┤
│   TOC (Collapsible)   │
├───────────────────────┤
│                       │
│     ARTICLE BODY      │
│                       │
├───────────────────────┤
│   RISK DISCLAIMER     │
├───────────────────────┤
│    FAQ ACCORDION      │
├───────────────────────┤
│   AUTHOR BIO CARD     │
├───────────────────────┤
│  RELATED ARTICLES     │
│    (1 column)         │
├───────────────────────┤
│        FOOTER         │
└───────────────────────┘
```

### Container Classes

```css
/* Article page containers */
.article-page {
  --article-container-padding: 1rem;
}

@media (min-width: 640px) {
  .article-page {
    --article-container-padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .article-page {
    --article-container-padding: 2rem;
  }
}

.article-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: var(--article-container-padding);
  padding-right: var(--article-container-padding);
}

/* Content box - white background card */
.content-box {
  background: #FFFFFF;
  border-radius: 1rem;
  border: 1px solid var(--article-border-default);
  padding: var(--content-padding-y) var(--content-padding-x);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

@media (min-width: 768px) {
  .content-box {
    padding: var(--content-padding-y-md) var(--content-padding-x-md);
  }
}

/* Highlighted content box - subtle tint */
.content-box-highlight {
  background: var(--article-bg-highlight);
  border-radius: 1rem;
  border: 1px solid var(--article-border-default);
  padding: 1.5rem;
}
```

---

## D) Tailwind CSS Configuration Extension

```javascript
// Add to tailwind.config.mjs extend section

{
  extend: {
    // Article-specific typography
    fontSize: {
      'article-h1': ['2.5rem', { lineHeight: '1.25', fontWeight: '800' }],
      'article-h1-md': ['3rem', { lineHeight: '1.2', fontWeight: '800' }],
      'article-h2': ['1.75rem', { lineHeight: '1.3', fontWeight: '700' }],
      'article-h2-md': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
      'article-h3': ['1.375rem', { lineHeight: '1.35', fontWeight: '700' }],
      'article-h3-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      'article-body': ['1.125rem', { lineHeight: '1.8', fontWeight: '400' }],
      'article-body-md': ['1.25rem', { lineHeight: '1.8', fontWeight: '400' }],
    },

    // Article spacing
    spacing: {
      'article-h2-mt': '2.5rem',
      'article-h2-mb': '1.25rem',
      'article-h3-mt': '2rem',
      'article-h3-mb': '1rem',
      'article-p-mb': '1.5rem',
    },

    // Article max-widths
    maxWidth: {
      'article': '840px',
      'article-lg': '960px',
    },

    // Sidebar width
    width: {
      'toc': '280px',
    },
  }
}
```

---

## E) Astro Component Structure

```
src/
├── layouts/
│   └── ArticleLayout.astro          # Main article layout
├── components/
│   ├── article/
│   │   ├── ArticleHeader.astro      # Title, meta, trust badges
│   │   ├── ArticleMeta.astro        # Reading time, word count, date
│   │   ├── ArticleFeaturedImage.astro
│   │   ├── ArticleBody.astro        # Prose content wrapper
│   │   └── RiskDisclaimer.astro
│   ├── content/
│   │   ├── TableOfContents.astro    # Sticky sidebar TOC
│   │   ├── FAQAccordion.astro       # FAQ section
│   │   ├── RelatedArticles.astro    # Related articles grid
│   │   └── ArticleCard.astro        # Individual article card
│   ├── navigation/
│   │   └── Breadcrumbs.astro        # Breadcrumb navigation
│   └── author/
│       └── AuthorBio.astro          # Author bio card
└── styles/
    ├── global.css                    # Global styles
    └── article.css                   # Article-specific styles
```

---

## F) Quality Checklist

Before shipping any article page, verify:

- [ ] No playful or cartoon icons anywhere
- [ ] No neon or marketing-bright colors
- [ ] Consistent 4px spacing rhythm throughout
- [ ] Shadows are subtle and purposeful
- [ ] Does NOT look like a template or generic theme
- [ ] Text contrast passes WCAG AA (4.5:1 for body, 3:1 for large)
- [ ] All touch targets are minimum 48px
- [ ] Body text never smaller than 18px
- [ ] RTL flow is natural and correct
- [ ] H2 has thick gold underline + fading gray line
- [ ] H3 has animated vertical gold bar
- [ ] TOC sticky on desktop, collapsible on mobile
- [ ] TOC highlights active section on scroll
- [ ] Links have gold underline with 10px offset
- [ ] Risk disclaimer is prominently visible
- [ ] Author bio shows E-E-A-T credentials
- [ ] Schema.org markup present (Article, FAQPage, BreadcrumbList)
- [ ] Images lazy loaded below fold
- [ ] No horizontal scroll on mobile
- [ ] Print styles remove unnecessary elements

---

*Document Version: 1.0.0*
*Last Updated: January 2026*
*Platform: Chartspoint.com - CHARTSPOINT Design System*
