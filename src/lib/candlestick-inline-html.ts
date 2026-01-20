/**
 * candlestick-inline-html.ts
 *
 * Generates inline HTML strings for candlestick pattern visualizations.
 * Used by the content processor to inject inline pattern visuals into article content.
 *
 * This module provides pure HTML/SVG strings that can be inserted into
 * WordPress content during the processContent phase.
 */

import { PATTERN_CONFIGS, type PatternType, type PatternConfig } from '@components/charts/index';

/**
 * Configuration for inline pattern dimensions
 */
interface InlineDimensions {
  width: number;
  height: number;
  viewBox: string;
}

/**
 * Get dimensions based on pattern type
 */
function getDimensions(type: 'single' | 'double' | 'triple'): InlineDimensions {
  switch (type) {
    case 'single':
      return { width: 60, height: 60, viewBox: '0 0 60 60' };
    case 'double':
      return { width: 100, height: 60, viewBox: '0 0 100 60' };
    case 'triple':
      return { width: 140, height: 60, viewBox: '0 0 140 60' };
    default:
      return { width: 60, height: 60, viewBox: '0 0 60 60' };
  }
}

/**
 * Signal colors for border accent
 */
const SIGNAL_BORDER_COLORS: Record<string, string> = {
  bullish: 'rgba(16, 185, 129, 0.4)',
  bearish: 'rgba(239, 68, 68, 0.4)',
  neutral: 'rgba(148, 163, 184, 0.4)',
};

/**
 * Generate SVG defs for gradients
 */
function generateSvgDefs(pattern: string): string {
  return `
    <defs>
      <linearGradient id="inline-bull-${pattern}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <linearGradient id="inline-bear-${pattern}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#EF4444"/>
        <stop offset="100%" stop-color="#DC2626"/>
      </linearGradient>
      <linearGradient id="inline-neutral-${pattern}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#94A3B8"/>
        <stop offset="100%" stop-color="#64748B"/>
      </linearGradient>
    </defs>
  `;
}

/**
 * Generate SVG candles for each pattern
 */
function generatePatternSvg(pattern: PatternType): string {
  const defs = generateSvgDefs(pattern);

  switch (pattern) {
    // Single Candle Patterns
    case 'doji':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="8" x2="30" y2="52" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="28" width="12" height="4" fill="url(#inline-neutral-${pattern})" rx="1"/>
        </g>`;

    case 'hammer':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="12" x2="30" y2="52" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="12" width="12" height="14" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'hanging-man':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="12" x2="30" y2="52" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="12" width="12" height="14" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    case 'shooting-star':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="8" x2="30" y2="48" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="34" width="12" height="14" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    case 'marubozu-bullish':
      return `${defs}
        <g class="inline-candles">
          <rect x="24" y="10" width="12" height="40" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'marubozu-bearish':
      return `${defs}
        <g class="inline-candles">
          <rect x="24" y="10" width="12" height="40" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    // Double Candle Patterns
    case 'engulfing-bullish':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="18" x2="30" y2="38" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="22" width="12" height="12" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="70" y1="10" x2="70" y2="50" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="14" width="12" height="32" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'engulfing-bearish':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="22" x2="30" y2="42" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="26" width="12" height="12" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="70" y1="10" x2="70" y2="50" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="14" width="12" height="32" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    case 'harami-bullish':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="8" x2="30" y2="52" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="12" width="12" height="36" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="70" y1="22" x2="70" y2="38" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="24" width="12" height="12" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'harami-bearish':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="8" x2="30" y2="52" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="12" width="12" height="36" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="70" y1="22" x2="70" y2="38" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="24" width="12" height="12" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    case 'tweezer-top':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="12" x2="30" y2="40" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="18" width="12" height="18" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="70" y1="12" x2="70" y2="44" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="16" width="12" height="22" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="14" y1="12" x2="86" y2="12" stroke="#d5a035" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>
        </g>`;

    case 'tweezer-bottom':
      return `${defs}
        <g class="inline-candles">
          <line x1="30" y1="20" x2="30" y2="48" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="24" y="24" width="12" height="18" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="70" y1="16" x2="70" y2="48" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="22" width="12" height="22" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="14" y1="48" x2="86" y2="48" stroke="#d5a035" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>
        </g>`;

    // Triple Candle Patterns
    case 'morning-star':
      return `${defs}
        <g class="inline-candles">
          <line x1="28" y1="8" x2="28" y2="32" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="22" y="10" width="12" height="18" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="70" y1="34" x2="70" y2="48" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="38" width="12" height="4" fill="url(#inline-neutral-${pattern})" rx="1"/>
          <line x1="112" y1="14" x2="112" y2="38" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="106" y="16" width="12" height="18" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'evening-star':
      return `${defs}
        <g class="inline-candles">
          <line x1="28" y1="28" x2="28" y2="52" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="22" y="32" width="12" height="18" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="70" y1="12" x2="70" y2="26" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="18" width="12" height="4" fill="url(#inline-neutral-${pattern})" rx="1"/>
          <line x1="112" y1="22" x2="112" y2="46" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="106" y="24" width="12" height="18" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    case 'three-white-soldiers':
      return `${defs}
        <g class="inline-candles">
          <line x1="28" y1="36" x2="28" y2="52" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="22" y="38" width="12" height="12" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="70" y1="24" x2="70" y2="40" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="26" width="12" height="12" fill="url(#inline-bull-${pattern})" rx="1"/>
          <line x1="112" y1="12" x2="112" y2="28" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="106" y="14" width="12" height="12" fill="url(#inline-bull-${pattern})" rx="1"/>
        </g>`;

    case 'three-black-crows':
      return `${defs}
        <g class="inline-candles">
          <line x1="28" y1="8" x2="28" y2="24" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="22" y="10" width="12" height="12" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="70" y1="20" x2="70" y2="36" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="64" y="22" width="12" height="12" fill="url(#inline-bear-${pattern})" rx="1"/>
          <line x1="112" y1="32" x2="112" y2="48" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="106" y="34" width="12" height="12" fill="url(#inline-bear-${pattern})" rx="1"/>
        </g>`;

    default:
      return '';
  }
}

/**
 * Generate complete inline HTML for a candlestick pattern
 *
 * @param pattern - The pattern type to generate
 * @param showLabel - Whether to show the pattern name label
 * @returns Complete HTML string for the inline pattern visualization
 */
export function generateInlineCandlestickHtml(
  pattern: PatternType,
  showLabel: boolean = false
): string {
  const config = PATTERN_CONFIGS[pattern];
  if (!config) {
    return '';
  }

  const dimensions = getDimensions(config.type);
  const borderColor = SIGNAL_BORDER_COLORS[config.signal] || SIGNAL_BORDER_COLORS.neutral;
  const patternSvg = generatePatternSvg(pattern);

  if (!patternSvg) {
    return '';
  }

  const labelHtml = showLabel
    ? `<span class="candlestick-inline__label">${config.nameAr}</span>`
    : '';

  return `
<div
  class="candlestick-inline candlestick-inline--${config.type}"
  style="--inline-border-color: ${borderColor};"
  data-pattern="${pattern}"
  role="img"
  aria-label="${config.nameAr} - ${config.nameEn}"
>
  <div class="candlestick-inline__svg-wrapper">
    <svg
      class="candlestick-inline__svg"
      viewBox="${dimensions.viewBox}"
      width="${dimensions.width}"
      height="${dimensions.height}"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      ${patternSvg}
    </svg>
  </div>
  ${labelHtml}
</div>`.trim();
}

/**
 * Check if a heading text contains a candlestick pattern name
 * Returns the pattern type if found, undefined otherwise
 */
export function detectPatternInHeading(headingText: string): PatternType | undefined {
  // Import the mapping from the charts index
  const { ARABIC_PATTERN_NAMES } = require('@components/charts/index');

  // Check each pattern name against the heading text
  for (const [name, patternType] of Object.entries(ARABIC_PATTERN_NAMES)) {
    if (headingText.includes(name)) {
      return patternType as PatternType;
    }
  }

  return undefined;
}
