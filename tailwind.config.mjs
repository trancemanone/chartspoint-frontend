/** @type {import('tailwindcss').Config} */

/**
 * CHARTSPOINT Design System
 *
 * A sophisticated, institutional-grade design system for Arabic technical analysis education.
 * Crafted for a premium fintech presence with emphasis on analytical depth, trust, and calm authority.
 *
 * Brand Vision:
 * "Towards a deeper understanding of how prices move, why signals fail,
 * and how traders manage risk before thinking about profits."
 *
 * Design Philosophy:
 * - Deep navy tones (#102941) convey institutional trust and analytical authority
 * - Refined gold (#d5a035) accents signal premium quality and exclusivity
 * - Calm, analytical aesthetic - no hype, focused on education
 * - Content pillars: basics (blue), indicators (orange), tools (green), tactics (purple)
 * - Generous spacing creates breathing room befitting premium fintech
 * - Subtle shadows and glassmorphism create depth without noise
 * - Typography optimized for Arabic readability (ages 40-70)
 */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      /**
       * COLOR SYSTEM
       *
       * A bespoke palette crafted for institutional fintech:
       * - Navy: Authority, trust, analytical credibility
       * - Gold: Premium quality, exclusivity, success
       * - Pillar Colors: Content categorization (basics, indicators, tools, tactics)
       * - Slate: Sophisticated neutrals for text and backgrounds
       */
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // PRIMARY: Deep Navy - Institutional Authority
        // Extended with dark navy #102941 as key color
        // ═══════════════════════════════════════════════════════════════
        navy: {
          50:  '#F0F4F8',   // Lightest tint for subtle backgrounds
          100: '#D9E2EC',   // Light backgrounds, hover states
          200: '#BCCCDC',   // Borders, dividers
          300: '#9FB3C8',   // Muted text, icons
          400: '#829AB1',   // Secondary text
          500: '#627D98',   // Body text on light backgrounds
          600: '#486581',   // Emphasis text
          700: '#334E68',   // Strong text, headers
          800: '#1a3a5c',   // Light dark navy
          900: '#102941',   // DARK NAVY - Key brand color for backgrounds
          950: '#0a1f33',   // Deepest dark navy
        },

        // ═══════════════════════════════════════════════════════════════
        // ACCENT: Primary Gold - Premium & Exclusivity (NEW PRIMARY)
        // Replaces green as the main accent color
        // ═══════════════════════════════════════════════════════════════
        gold: {
          50:  '#FDF8ED',   // Warmest white, subtle gold tint
          100: '#FAF0D8',   // Light gold backgrounds
          200: '#F5E2B5',   // Hover states, highlights
          300: '#e8bc5a',   // Light gold - decorative accents
          400: '#deb049',   // Bright gold for emphasis
          500: '#d5a035',   // PRIMARY GOLD - Main accent color
          600: '#b8892a',   // Dark gold for contrast
          700: '#9a7223',   // Rich gold for premium elements
          800: '#7c5c1c',   // Dark gold for depth
          900: '#5e4515',   // Deepest gold
          950: '#3D2903',   // Near-black gold
        },

        // ═══════════════════════════════════════════════════════════════
        // BRAND: CHARTSPOINT Gold - Premium & Trust
        // Gold as primary brand color for CTAs and accents
        // ═══════════════════════════════════════════════════════════════
        brand: {
          50:  '#FDF8ED',   // Lightest gold tint
          100: '#FAF0D8',   // Light backgrounds
          200: '#F5E2B5',   // Hover states
          300: '#e8bc5a',   // Light gold - decorative elements
          400: '#deb049',   // Bright emphasis
          500: '#d5a035',   // PRIMARY BRAND GOLD - CTAs, key accents
          600: '#b8892a',   // Darker variant for contrast
          700: '#9a7223',   // Deep gold
          800: '#7c5c1c',   // Very deep gold
          900: '#5e4515',   // Deepest gold
          950: '#3D2903',   // Near-black gold
        },

        // ═══════════════════════════════════════════════════════════════
        // NEUTRAL: Sophisticated Slate - Content & UI
        // ═══════════════════════════════════════════════════════════════
        slate: {
          50:  '#F8FAFC',   // Page backgrounds
          100: '#F1F5F9',   // Card backgrounds
          200: '#E2E8F0',   // Borders, dividers
          300: '#CBD5E1',   // Disabled states
          400: '#94A3B8',   // Placeholder text
          500: '#64748B',   // Secondary text
          600: '#475569',   // Body text
          700: '#334155',   // Strong text
          800: '#1E293B',   // Headlines
          900: '#0F172A',   // Primary text
          950: '#020617',   // Near-black
        },

        // ═══════════════════════════════════════════════════════════════
        // PILLAR COLORS: Content Category Identification (CHARTSPOINT)
        // Four pillars for technical analysis education content
        // ═══════════════════════════════════════════════════════════════

        // Basics Pillar - Sapphire Blue (Education/Learning)
        // For: foundational concepts, terminology, market basics
        basics: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',   // Primary Basics color
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // Indicators Pillar - Orange (Tools/Technical)
        // For: technical indicators, oscillators, moving averages
        indicators: {
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',   // Primary Indicators color
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },

        // Tools Pillar - Emerald Green (Practical/Utility)
        // For: charting tools, platforms, practical applications
        tools: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',   // Primary Tools color
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },

        // Tactics Pillar - Purple (Strategy/Advanced)
        // For: trading strategies, risk management, advanced techniques
        tactics: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',   // Primary Tactics color
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },

        // Legacy pillar aliases for backward compatibility
        // Maps old ITQQAN pillars to new CHARTSPOINT pillars
        learn: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',   // Maps to basics
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accounts: {
          50:  '#FDF8ED',
          100: '#FAF0D8',
          200: '#F5E2B5',
          300: '#e8bc5a',
          400: '#deb049',
          500: '#d5a035',   // Maps to brand gold
          600: '#b8892a',
          700: '#9a7223',
          800: '#7c5c1c',
          900: '#5e4515',
        },
        trust: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',   // Maps to tactics
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },

        // ═══════════════════════════════════════════════════════════════
        // SEMANTIC COLORS: Status & Feedback
        // ═══════════════════════════════════════════════════════════════
        success: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        error: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },

        // ═══════════════════════════════════════════════════════════════
        // SURFACE COLORS: Backgrounds & Containers
        // ═══════════════════════════════════════════════════════════════
        surface: {
          page: '#F6F8FA',       // Main page background - warm gray
          card: '#FFFFFF',       // Card backgrounds
          elevated: '#FFFFFF',   // Elevated surfaces
          overlay: 'rgba(15, 23, 42, 0.6)',  // Modal overlays
          glass: 'rgba(255, 255, 255, 0.85)', // Glassmorphism
          'glass-dark': 'rgba(16, 42, 67, 0.95)', // Dark glass
        },

        // Legacy aliases for compatibility
        background: '#F6F8FA',
        text: '#0F172A',
        primary: {
          DEFAULT: '#243B53',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#243B53',
          600: '#1E3249',
          700: '#182A3E',
          800: '#122234',
          900: '#0C1A29',
        },
        accent: {
          DEFAULT: '#d5a035',
          50: '#FDF8ED',
          100: '#FAF0D8',
          200: '#F5E2B5',
          300: '#e8bc5a',
          400: '#deb049',
          500: '#d5a035',
          600: '#b8892a',
          700: '#9a7223',
          800: '#7c5c1c',
          900: '#5e4515',
        },
        luxury: {
          DEFAULT: '#d5a035',
          50: '#FDF8ED',
          100: '#FAF0D8',
          200: '#F5E2B5',
          300: '#e8bc5a',
          400: '#deb049',
          500: '#d5a035',
          600: '#b8892a',
          700: '#9a7223',
          800: '#7c5c1c',
          900: '#5e4515',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },

        // ═══════════════════════════════════════════════════════════════
        // PALE GRAY: Subtle UI Elements
        // Used for: dividers, secondary borders, fading lines, soft backgrounds
        // Based on existing slate-200 for consistency
        // ═══════════════════════════════════════════════════════════════
        pale: {
          DEFAULT: '#E2E8F0',  // slate-200 - Primary pale gray
          50:  '#F8FAFC',      // Lightest - subtle backgrounds
          100: '#F1F5F9',      // Light - TOC containers, soft cards
          200: '#E2E8F0',      // Default - dividers, borders
          300: '#CBD5E1',      // Medium - stronger dividers
        },
      },

      /**
       * TYPOGRAPHY SYSTEM
       *
       * Carefully selected typefaces for Arabic excellence:
       * - Noto Kufi Arabic: Strong, authoritative headlines
       * - Tajawal: Elegant, highly readable body text
       * - Inter: Numbers and technical content (LTR)
       */
      fontFamily: {
        heading: ['Noto Kufi Arabic', 'system-ui', 'sans-serif'],
        body: ['Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'system-ui', 'sans-serif'],
        display: ['Noto Kufi Arabic', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },

      /**
       * FONT SIZE SCALE
       *
       * Optimized for Arabic readability:
       * - Larger base sizes for comfortable reading
       * - Generous line heights for Arabic script
       * - Responsive scaling for all devices
       */
      fontSize: {
        // Display sizes - Hero sections, major headlines
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Heading sizes
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '800' }],
        'h2': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h3': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['1.125rem', { lineHeight: '1.45', fontWeight: '600' }],
        'h6': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],

        // Body sizes - Optimized for Arabic (larger for readability)
        'body-xl': ['1.375rem', { lineHeight: '1.75' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'body-sm': ['1rem', { lineHeight: '1.65' }],
        'body-xs': ['0.875rem', { lineHeight: '1.6' }],

        // Caption and meta
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }],

        // Legacy responsive sizes
        'body-mobile': ['1.125rem', { lineHeight: '1.7' }],
        'body-desktop': ['1.25rem', { lineHeight: '1.7' }],
        'h1-mobile': ['2.5rem', { lineHeight: '1.15', fontWeight: '800' }],
        'h1-desktop': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'h2-mobile': ['1.875rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h2-desktop': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3-mobile': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h3-desktop': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
      },

      /**
       * LINE HEIGHT
       * Extended scale for Arabic typography
       */
      lineHeight: {
        'arabic': '1.7',
        'arabic-tight': '1.5',
        'arabic-relaxed': '1.85',
        'arabic-loose': '2',
      },

      /**
       * LETTER SPACING
       * Refined tracking for various contexts
       */
      letterSpacing: {
        'tightest': '-0.03em',
        'display': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      /**
       * SPACING SYSTEM
       *
       * A comprehensive spacing scale with:
       * - Touch-friendly minimums (48px targets) - WCAG 2.5.5 compliance
       * - Generous spacing for luxury feel
       * - Semantic tokens for consistency
       * - Optimized for users aged 40-70
       */
      spacing: {
        // Touch targets - CRITICAL for accessibility
        // WCAG 2.5.5 Level AAA requires 44px minimum, we use 48px for comfort
        'touch': '48px',        // Minimum touch target
        'touch-sm': '44px',     // Absolute minimum (WCAG AAA)
        'touch-lg': '56px',     // Comfortable touch target
        'touch-xl': '64px',     // Large touch target for primary actions

        // Component spacing
        'nav-height': '80px',
        'nav-height-scrolled': '64px',
        'footer-height': '400px',

        // Section spacing
        'section-sm': '4rem',
        'section': '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',

        // Container padding
        'container-x': '1.5rem',
        'container-x-lg': '2rem',

        // Extended scale
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },

      /**
       * BORDER RADIUS
       * Refined curves for institutional elegance
       */
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'card': '1rem',
        'button': '0.625rem',
        'input': '0.5rem',
        'badge': '0.375rem',
        'tag': '9999px',
        'full': '9999px',
      },

      /**
       * BOX SHADOW SYSTEM
       *
       * A premium depth system creating subtle, sophisticated elevation:
       * - Soft, diffused shadows for elegant lift
       * - Color-tinted shadows for brand cohesion
       * - Multiple shadow layers for realistic depth
       */
      boxShadow: {
        // Elevation scale
        'none': 'none',
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'sm': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
        'DEFAULT': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.07)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.07)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.08)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
        '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
        '3xl': '0 35px 60px -15px rgba(15, 23, 42, 0.2)',

        // Glassmorphism
        'glass': '0 8px 32px rgba(15, 23, 42, 0.08)',
        'glass-lg': '0 16px 48px rgba(15, 23, 42, 0.12)',

        // Card shadows - Premium feel
        'card': '0 2px 8px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.08), 0 16px 48px rgba(15, 23, 42, 0.06)',
        'card-elevated': '0 12px 40px rgba(15, 23, 42, 0.12)',

        // Brand-tinted shadows (Updated to gold)
        'brand': '0 4px 14px rgba(213, 160, 53, 0.2)',
        'brand-lg': '0 8px 24px rgba(213, 160, 53, 0.3)',
        'gold': '0 4px 14px rgba(213, 160, 53, 0.2)',
        'gold-lg': '0 8px 24px rgba(213, 160, 53, 0.35)',
        'navy': '0 4px 14px rgba(36, 59, 83, 0.15)',
        'navy-lg': '0 8px 24px rgba(36, 59, 83, 0.2)',

        // Button shadows (Updated to gold)
        'button': '0 2px 4px rgba(15, 23, 42, 0.06), 0 4px 8px rgba(15, 23, 42, 0.04)',
        'button-hover': '0 4px 8px rgba(15, 23, 42, 0.08), 0 8px 16px rgba(15, 23, 42, 0.06)',
        'button-brand': '0 4px 12px rgba(213, 160, 53, 0.3)',
        'button-gold': '0 4px 12px rgba(213, 160, 53, 0.35)',

        // Input shadows (Updated to gold)
        'input': '0 1px 2px rgba(15, 23, 42, 0.04)',
        'input-focus': '0 0 0 3px rgba(213, 160, 53, 0.2), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'input-error': '0 0 0 3px rgba(239, 68, 68, 0.15)',

        // Inner shadows
        'inner': 'inset 0 2px 4px 0 rgba(15, 23, 42, 0.04)',
        'inner-lg': 'inset 0 4px 8px 0 rgba(15, 23, 42, 0.06)',

        // Specialty
        'header': '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 24px rgba(15, 23, 42, 0.04)',
        'dropdown': '0 10px 40px rgba(15, 23, 42, 0.12)',
        'modal': '0 25px 80px rgba(15, 23, 42, 0.25)',
        'tooltip': '0 4px 12px rgba(15, 23, 42, 0.15)',
      },

      /**
       * BACKDROP BLUR
       * For glassmorphism effects
       */
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
        'header': '16px',
        'modal': '8px',
      },

      /**
       * TRANSITIONS & ANIMATIONS
       */
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.45, 0, 0.15, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      animation: {
        'none': 'none',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',

        // Custom animations
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(213, 160, 53, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(213, 160, 53, 0.4)' },
        },
      },

      /**
       * Z-INDEX SCALE
       * Organized layering system
       */
      zIndex: {
        'behind': '-1',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '100',
        'sticky': '200',
        'header': '300',
        'overlay': '400',
        'modal': '500',
        'popover': '600',
        'tooltip': '700',
        'toast': '800',
        'max': '9999',
      },

      /**
       * ASPECT RATIOS
       */
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'photo': '4 / 3',
        'portrait': '3 / 4',
        'wide': '21 / 9',
        'card': '3 / 2',
        'hero': '2 / 1',
      },

      /**
       * CONTAINER
       */
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      /**
       * MAX WIDTH
       */
      maxWidth: {
        'prose': '72ch',
        'prose-sm': '60ch',
        'content': '840px',
        'container': '1280px',
        'wide': '1440px',
        'full-bleed': '1920px',
      },

      /**
       * SCREEN BREAKPOINTS
       * RTL-optimized responsive design
       */
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        // Touch-specific
        'touch': { 'raw': '(hover: none)' },
        'hover': { 'raw': '(hover: hover)' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    // Custom plugin for CHARTSPOINT-specific utilities
    // Optimized for Arabic technical analysis education platform targeting ages 40-70
    function({ addUtilities, addComponents, theme }) {

      // Accessibility utilities for older users (40-70)
      addUtilities({
        // Minimum touch target - ensures WCAG 2.5.5 compliance
        '.touch-target': {
          'min-height': '48px',
          'min-width': '48px',
        },
        '.touch-target-lg': {
          'min-height': '56px',
          'min-width': '56px',
        },
        '.touch-target-xl': {
          'min-height': '64px',
          'min-width': '64px',
        },

        // Focus ring utilities - high visibility for older users (Updated to gold)
        '.focus-ring': {
          'outline': 'none',
          'box-shadow': '0 0 0 3px #FFFFFF, 0 0 0 6px rgba(213, 160, 53, 0.6)',
        },
        '.focus-ring-error': {
          'outline': 'none',
          'box-shadow': '0 0 0 3px #FFFFFF, 0 0 0 6px rgba(220, 38, 38, 0.6)',
        },

        // Minimum readable font sizes
        '.text-readable': {
          'font-size': '1.125rem',   // 18px minimum
          'line-height': '1.7',
        },
        '.text-readable-lg': {
          'font-size': '1.25rem',    // 20px
          'line-height': '1.8',
        },
      });

      // Text utilities for Arabic
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.font-feature-arabic': {
          'font-feature-settings': '"ss01", "ss02", "cv01"',
        },
      });

      // Glassmorphism utilities (Updated with dark navy and gold)
      addUtilities({
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.85)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(16, 41, 65, 0.95)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-brand': {
          'background': 'rgba(213, 160, 53, 0.95)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.glass-navy': {
          'background': 'rgba(16, 41, 65, 0.98)',
          'backdrop-filter': 'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
        },
      });

      // Premium gradient utilities (Updated with gold and dark navy)
      addUtilities({
        '.gradient-brand': {
          'background': 'linear-gradient(135deg, #e8bc5a 0%, #d5a035 100%)',
        },
        '.gradient-gold': {
          'background': 'linear-gradient(135deg, #e8bc5a 0%, #d5a035 100%)',
        },
        '.gradient-navy': {
          'background': 'linear-gradient(135deg, #1a3a5c 0%, #102941 100%)',
        },
        '.gradient-premium': {
          'background': 'linear-gradient(135deg, #102941 0%, #1a3a5c 50%, #d5a035 100%)',
        },
        '.gradient-hero': {
          'background': 'linear-gradient(180deg, #F6F8FA 0%, #FFFFFF 50%, #F0F4F8 100%)',
        },
        '.gradient-mesh': {
          'background': `
            radial-gradient(at 0% 0%, rgba(213, 160, 53, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(213, 160, 53, 0.06) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.06) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(16, 41, 65, 0.08) 0px, transparent 50%)
          `,
        },
        '.gradient-dark-navy': {
          'background': 'linear-gradient(180deg, #102941 0%, #0a1f33 100%)',
        },
      });
    },
  ],
};
