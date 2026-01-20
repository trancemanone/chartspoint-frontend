// Content Structure Types - Chartspoint 4-Pillar System

export type PillarSlug = 'basics' | 'indicators' | 'tools' | 'tactics';

export interface Pillar {
  slug: PillarSlug;
  nameAr: string;
  nameEn: string;
  description: string;
  color: string;
  icon: string;
}

export const PILLARS: Record<PillarSlug, Pillar> = {
  basics: {
    slug: 'basics',
    nameAr: 'أساسيات التحليل الفني',
    nameEn: 'Basics',
    description: 'المعرفة الأساسية والمفاهيم التأسيسية للتحليل الفني',
    color: '#3B82F6',
    icon: 'academic-cap',
  },
  indicators: {
    slug: 'indicators',
    nameAr: 'المؤشرات الفنية',
    nameEn: 'Indicators',
    description: 'الأدوات الفنية والمؤشرات المستخدمة في التحليل',
    color: '#F97316',
    icon: 'chart-bar',
  },
  tools: {
    slug: 'tools',
    nameAr: 'الأدوات والحاسبات',
    nameEn: 'Tools',
    description: 'الحاسبات والأدوات العملية للمتداولين',
    color: '#10B981',
    icon: 'calculator',
  },
  tactics: {
    slug: 'tactics',
    nameAr: 'الاستراتيجيات وإدارة المخاطر',
    nameEn: 'Tactics',
    description: 'استراتيجيات التداول وإدارة المخاطر',
    color: '#8B5CF6',
    icon: 'light-bulb',
  },
};

// Cluster structure per pillar
export interface Cluster {
  slug: string;
  nameAr: string;
  pillar: PillarSlug;
}

export const CLUSTERS: Cluster[] = [
  // Basics pillar - Foundation Knowledge (Blue #3B82F6)
  { slug: 'intro', nameAr: 'مقدمة في التحليل الفني', pillar: 'basics' },
  { slug: 'patterns', nameAr: 'أنماط الشموع والرسوم', pillar: 'basics' },
  { slug: 'action', nameAr: 'حركة السعر', pillar: 'basics' },
  { slug: 'methods', nameAr: 'طرق التحليل', pillar: 'basics' },
  // Indicators pillar - Technical Tools (Orange #F97316)
  { slug: 'momentum', nameAr: 'مؤشرات الزخم', pillar: 'indicators' },
  { slug: 'trend', nameAr: 'مؤشرات الاتجاه', pillar: 'indicators' },
  { slug: 'volatility', nameAr: 'مؤشرات التذبذب', pillar: 'indicators' },
  { slug: 'volume', nameAr: 'مؤشرات الحجم', pillar: 'indicators' },
  // Tools pillar - Practical Utilities (Green #10B981)
  { slug: 'calc', nameAr: 'الحاسبات', pillar: 'tools' },
  { slug: 'charts', nameAr: 'الرسوم البيانية', pillar: 'tools' },
  { slug: 'data', nameAr: 'البيانات والمصادر', pillar: 'tools' },
  // Tactics pillar - Strategy Application (Purple #8B5CF6)
  { slug: 'trend-tactics', nameAr: 'استراتيجيات الاتجاه', pillar: 'tactics' },
  { slug: 'reversion', nameAr: 'استراتيجيات الارتداد', pillar: 'tactics' },
  { slug: 'intraday', nameAr: 'التداول اليومي', pillar: 'tactics' },
  { slug: 'risk', nameAr: 'إدارة المخاطر', pillar: 'tactics' },
];

// Category ID mapping for REST API
// Pillars (parent categories)
export const PILLAR_CATEGORY_IDS: Record<PillarSlug, number> = {
  basics: 2,
  indicators: 3,
  tools: 4,
  tactics: 5,
};

// Cluster category IDs (child categories)
export const CLUSTER_CATEGORY_IDS: Record<string, number> = {
  // Basics pillar clusters (Foundation Knowledge)
  intro: 6,
  patterns: 7,
  action: 8,
  methods: 9,
  // Indicators pillar clusters (Technical Tools)
  momentum: 10,
  trend: 11,
  volatility: 12,
  volume: 13,
  // Tools pillar clusters (Practical Utilities)
  calc: 14,
  charts: 15,
  data: 16,
  // Tactics pillar clusters (Strategy Application)
  'trend-tactics': 17,
  reversion: 18,
  intraday: 19,
  risk: 20,
};

// Reverse mapping: category ID to slug
export const CATEGORY_ID_TO_SLUG: Record<number, string> = Object.entries(
  CLUSTER_CATEGORY_IDS
).reduce(
  (acc, [slug, id]) => {
    acc[id] = slug;
    return acc;
  },
  {} as Record<number, string>
);

// Add pillar IDs to reverse mapping
Object.entries(PILLAR_CATEGORY_IDS).forEach(([slug, id]) => {
  CATEGORY_ID_TO_SLUG[id] = slug;
});

// WordPress REST API Response Types

/**
 * WordPress REST API rendered content object
 * Used for title, content, excerpt fields that have rendered HTML
 */
export interface WPRenderedContent {
  rendered: string;
  protected?: boolean;
}

/**
 * WordPress REST API media details
 */
export interface WPMediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Record<
    string,
    {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }
  >;
}

/**
 * WordPress REST API media item (from _embed)
 */
export interface WPEmbeddedMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WPRenderedContent;
  author: number;
  caption: WPRenderedContent;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: WPMediaDetails;
  source_url: string;
}

/**
 * WordPress REST API author (from _embed)
 */
export interface WPEmbeddedAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
}

/**
 * WordPress REST API category
 */
export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, unknown>;
  _links?: Record<string, unknown>;
}

/**
 * WordPress REST API tag
 */
export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: Record<string, unknown>;
}

/**
 * WordPress REST API embedded terms (categories and tags from _embed)
 */
export interface WPEmbeddedTerms {
  categories: WPCategory[];
  tags: WPTag[];
}

/**
 * WordPress REST API post response
 */
export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WPRenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private' | 'future' | 'trash';
  type: string;
  link: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  // Embedded data when using _embed parameter
  _embedded?: {
    author?: WPEmbeddedAuthor[];
    'wp:featuredmedia'?: WPEmbeddedMedia[];
    'wp:term'?: (WPCategory | WPTag)[][];
  };
  // ACF custom fields (if ACF REST API is enabled)
  acf?: {
    word_count?: number;
    reading_time?: number;
    primary_keyword?: string;
    expertise_level?: 'beginner' | 'intermediate' | 'advanced';
    internal_links?: {
      url: string;
      anchor_text: string;
      placement: string;
      link_type: 'pillar' | 'cluster' | 'sibling' | 'child';
    }[];
    faq_items?: {
      question: string;
      answer: string;
    }[];
    eeat?: {
      author_expertise: string;
      credentials: string;
      review_process: string;
      sources_methodology: string;
    };
  };
  // Rank Math SEO fields (via WPGraphQL for Rank Math - ONLY source of truth)
  yoast_head_json?: {
    title: string;
    description: string;
    canonical: string;
    og_title: string;
    og_description: string;
    og_image?: {
      url: string;
      width: number;
      height: number;
    }[];
    schema?: {
      '@graph': unknown[];
    };
    // Robots meta directives from Rank Math
    robots?: string[];
  };
}

/**
 * WordPress REST API page response
 */
export interface WPPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: WPRenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRenderedContent;
  content: WPRenderedContent;
  excerpt: WPRenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, unknown>;
  _embedded?: {
    author?: WPEmbeddedAuthor[];
    'wp:featuredmedia'?: WPEmbeddedMedia[];
  };
  yoast_head_json?: {
    title: string;
    description: string;
    canonical: string;
    og_title: string;
    og_description: string;
    og_image?: {
      url: string;
      width: number;
      height: number;
    }[];
    schema?: {
      '@graph': unknown[];
    };
  };
}

/**
 * WordPress REST API comment response
 */
export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  date_gmt: string;
  content: WPRenderedContent;
  link: string;
  status: string;
  type: string;
  author_avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
  meta: Record<string, unknown>;
}

/**
 * API error response
 */
export interface WPError {
  code: string;
  message: string;
  data?: {
    status: number;
  };
}

/**
 * Pagination headers from WordPress REST API
 */
export interface WPPaginationHeaders {
  totalItems: number;
  totalPages: number;
}

/**
 * Paginated response wrapper
 */
export interface WPPaginatedResponse<T> {
  data: T[];
  pagination: WPPaginationHeaders;
}

// Article type for frontend use
export interface Article {
  id: number;
  title: string;
  slug: string;
  pillar: PillarSlug;
  cluster: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  author: {
    name: string;
    bio: string;
    avatar: string;
    slug: string;
  };
  publishDate: string;
  modifiedDate: string;
  wordCount: number;
  readingTime: number;
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced';
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    schema?: string;
    robots?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedArticles: {
    title: string;
    slug: string;
    pillar: PillarSlug;
    excerpt: string;
    image?: string;
  }[];
  internalLinks: {
    url: string;
    anchorText: string;
    type: 'pillar' | 'cluster' | 'sibling' | 'child';
  }[];
  eeat?: {
    authorExpertise: string;
    credentials: string;
    reviewProcess: string;
    sources: string;
  };
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  pillar?: PillarSlug;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

// Table of Contents
export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
  children?: TOCItem[];
}
