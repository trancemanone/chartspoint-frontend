/**
 * Candlestick Pattern Components
 *
 * Export all chart visualization components for Japanese candlestick patterns.
 * These components are designed for CHARTSPOINT technical analysis education.
 *
 * Components:
 * - CandlestickPattern: Individual pattern card with animated SVG visualization
 * - CandlestickPatternGrid: Grid layout for displaying multiple patterns
 * - CandlestickPatternSection: Article section with category organization
 * - CandlestickShowcase: Full article showcase with all 16 patterns
 *
 * @module charts
 */

// Main pattern visualization component
export { default as CandlestickPattern } from './CandlestickPattern.astro';

// Grid layout for multiple patterns
export { default as CandlestickPatternGrid } from './CandlestickPatternGrid.astro';

// Article section component with category organization
export { default as CandlestickPatternSection } from './CandlestickPatternSection.astro';

// Full showcase component with all 16 patterns
export { default as CandlestickShowcase } from './CandlestickShowcase.astro';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * All available candlestick pattern types
 * 16 patterns total: 6 single, 6 double, 4 triple
 */
export type PatternType =
  // Single Candle Patterns (6)
  | 'doji'
  | 'hammer'
  | 'hanging-man'
  | 'shooting-star'
  | 'marubozu-bullish'
  | 'marubozu-bearish'
  // Double Candle Patterns (6)
  | 'engulfing-bullish'
  | 'engulfing-bearish'
  | 'harami-bullish'
  | 'harami-bearish'
  | 'tweezer-top'
  | 'tweezer-bottom'
  // Triple Candle Patterns (4)
  | 'morning-star'
  | 'evening-star'
  | 'three-white-soldiers'
  | 'three-black-crows';

/**
 * Pattern category classification
 */
export type PatternCategory = 'single' | 'double' | 'triple';

/**
 * Signal type for pattern direction indication
 */
export type SignalType = 'bullish' | 'bearish' | 'neutral';

/**
 * Pattern data configuration interface
 */
export interface PatternConfig {
  nameAr: string;
  nameEn: string;
  signal: SignalType;
  signalAr: string;
  type: PatternCategory;
  typeAr: string;
  reliability: 1 | 2 | 3 | 4 | 5;
  description: string;
}

/**
 * All pattern configurations indexed by pattern type
 */
export const PATTERN_CONFIGS: Record<PatternType, PatternConfig> = {
  // Single Candle Patterns
  'doji': {
    nameAr: 'دوجي',
    nameEn: 'Doji',
    signal: 'neutral',
    signalAr: 'محايد',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 3,
    description: 'يشير إلى تردد السوق وتوازن قوى العرض والطلب'
  },
  'hammer': {
    nameAr: 'المطرقة',
    nameEn: 'Hammer',
    signal: 'bullish',
    signalAr: 'صعودي',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 4,
    description: 'نموذج انعكاسي صعودي يظهر في نهاية الاتجاه الهابط'
  },
  'hanging-man': {
    nameAr: 'الرجل المشنوق',
    nameEn: 'Hanging Man',
    signal: 'bearish',
    signalAr: 'هبوطي',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 3,
    description: 'نموذج انعكاسي هبوطي يظهر في نهاية الاتجاه الصاعد'
  },
  'shooting-star': {
    nameAr: 'الشهاب',
    nameEn: 'Shooting Star',
    signal: 'bearish',
    signalAr: 'هبوطي',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 4,
    description: 'نموذج انعكاسي هبوطي يدل على ضعف المشترين'
  },
  'marubozu-bullish': {
    nameAr: 'ماروبوزو صاعد',
    nameEn: 'Bullish Marubozu',
    signal: 'bullish',
    signalAr: 'صعودي قوي',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 5,
    description: 'شمعة قوية بدون ظلال تدل على سيطرة المشترين'
  },
  'marubozu-bearish': {
    nameAr: 'ماروبوزو هابط',
    nameEn: 'Bearish Marubozu',
    signal: 'bearish',
    signalAr: 'هبوطي قوي',
    type: 'single',
    typeAr: 'شمعة واحدة',
    reliability: 5,
    description: 'شمعة قوية بدون ظلال تدل على سيطرة البائعين'
  },
  // Double Candle Patterns
  'engulfing-bullish': {
    nameAr: 'الابتلاع الصعودي',
    nameEn: 'Bullish Engulfing',
    signal: 'bullish',
    signalAr: 'صعودي قوي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 5,
    description: 'نموذج انعكاسي قوي حيث تبتلع الشمعة الصاعدة السابقة'
  },
  'engulfing-bearish': {
    nameAr: 'الابتلاع الهبوطي',
    nameEn: 'Bearish Engulfing',
    signal: 'bearish',
    signalAr: 'هبوطي قوي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 5,
    description: 'نموذج انعكاسي قوي حيث تبتلع الشمعة الهابطة السابقة'
  },
  'harami-bullish': {
    nameAr: 'هارامي صعودي',
    nameEn: 'Bullish Harami',
    signal: 'bullish',
    signalAr: 'صعودي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 3,
    description: 'شمعة صغيرة داخل جسم الشمعة السابقة تشير لانعكاس محتمل'
  },
  'harami-bearish': {
    nameAr: 'هارامي هبوطي',
    nameEn: 'Bearish Harami',
    signal: 'bearish',
    signalAr: 'هبوطي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 3,
    description: 'شمعة صغيرة داخل جسم الشمعة السابقة تشير لانعكاس محتمل'
  },
  'tweezer-top': {
    nameAr: 'قمة الملقط',
    nameEn: 'Tweezer Top',
    signal: 'bearish',
    signalAr: 'هبوطي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 4,
    description: 'شمعتان بقمم متساوية تشيران لمقاومة قوية'
  },
  'tweezer-bottom': {
    nameAr: 'قاع الملقط',
    nameEn: 'Tweezer Bottom',
    signal: 'bullish',
    signalAr: 'صعودي',
    type: 'double',
    typeAr: 'شمعتان',
    reliability: 4,
    description: 'شمعتان بقيعان متساوية تشيران لدعم قوي'
  },
  // Triple Candle Patterns
  'morning-star': {
    nameAr: 'نجمة الصباح',
    nameEn: 'Morning Star',
    signal: 'bullish',
    signalAr: 'صعودي قوي',
    type: 'triple',
    typeAr: 'ثلاث شمعات',
    reliability: 5,
    description: 'نموذج انعكاسي قوي يتكون من ثلاث شمعات يشير لبداية صعود'
  },
  'evening-star': {
    nameAr: 'نجمة المساء',
    nameEn: 'Evening Star',
    signal: 'bearish',
    signalAr: 'هبوطي قوي',
    type: 'triple',
    typeAr: 'ثلاث شمعات',
    reliability: 5,
    description: 'نموذج انعكاسي قوي يتكون من ثلاث شمعات يشير لبداية هبوط'
  },
  'three-white-soldiers': {
    nameAr: 'ثلاثة جنود بيض',
    nameEn: 'Three White Soldiers',
    signal: 'bullish',
    signalAr: 'صعودي قوي جدا',
    type: 'triple',
    typeAr: 'ثلاث شمعات',
    reliability: 5,
    description: 'ثلاث شمعات صاعدة متتالية تؤكد قوة الاتجاه الصعودي'
  },
  'three-black-crows': {
    nameAr: 'ثلاثة غربان سود',
    nameEn: 'Three Black Crows',
    signal: 'bearish',
    signalAr: 'هبوطي قوي جدا',
    type: 'triple',
    typeAr: 'ثلاث شمعات',
    reliability: 5,
    description: 'ثلاث شمعات هابطة متتالية تؤكد قوة الاتجاه الهبوطي'
  },
};

/**
 * Pattern arrays by category for easy filtering
 */
export const PATTERNS_BY_CATEGORY: Record<PatternCategory, PatternType[]> = {
  single: ['doji', 'hammer', 'hanging-man', 'shooting-star', 'marubozu-bullish', 'marubozu-bearish'],
  double: ['engulfing-bullish', 'engulfing-bearish', 'harami-bullish', 'harami-bearish', 'tweezer-top', 'tweezer-bottom'],
  triple: ['morning-star', 'evening-star', 'three-white-soldiers', 'three-black-crows'],
};

/**
 * Get all patterns of a specific signal type
 */
export function getPatternsBySignal(signal: SignalType): PatternType[] {
  return (Object.keys(PATTERN_CONFIGS) as PatternType[]).filter(
    (pattern) => PATTERN_CONFIGS[pattern].signal === signal
  );
}

/**
 * Get pattern configuration by type
 */
export function getPatternConfig(pattern: PatternType): PatternConfig {
  return PATTERN_CONFIGS[pattern];
}
