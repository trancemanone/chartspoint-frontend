// Content structure configuration for itqqan.com

import type { PillarSlug } from './types';

// Re-export PILLARS from types
export { PILLARS } from './types';

// URL Structure: /{pillar}/{cluster}/{slug}
// Example: /learn/stocks/basics

export interface ArticlePath {
  pillar: PillarSlug;
  cluster: string;
  slug: string;
}

// Content structure mapping
export const CONTENT_STRUCTURE: Record<PillarSlug, Record<string, string[]>> = {
  learn: {
    start: ['meaning', 'longterm', 'risk', 'types', 'income', 'inflation'],
    stocks: ['basics', 'buy', 'sell', 'dividend', 'value', 'growth'],
    gold: ['buy', 'pros', 'prices', 'storage', 'etf'],
    funds: ['types', 'etf', 'active', 'passive', 'fees'],
    plan: ['goals', 'budget', 'diversify', 'allocation', 'rebalance', 'timeline'],
    analysis: ['technical', 'fundamental', 'ratios', 'reports', 'news'],
    courses: ['best', 'ta', 'fa', 'free', 'cert'],
  },
  accounts: {
    open: ['steps', 'alinma', 'darayya', 'online', 'verify'],
    platform: ['best', 'compare', 'fees', 'tools', 'security'],
    apps: ['best', 'reviews', 'features', 'security'],
    brokers: ['companies', 'fees', 'choose', 'support', 'minimum'],
    sectors: ['equity', 'real', 'crypto', 'funds', 'global'],
  },
  trust: {
    license: ['verify', 'regulators', 'rules', 'regions'],
    checks: ['research', 'crs', 'history', 'ownership'],
    scams: ['signs', 'action', 'sites', 'ads', 'social'],
    'funds-protection': ['safe', 'gov', 'guarantee', 'risk'],
    privacy: ['data', 'policy', 'consent'],
  },
};

// Arabic names for clusters
export const CLUSTER_NAMES_AR: Record<string, string> = {
  // Learn
  start: 'أساسيات الاستثمار',
  stocks: 'الأسهم',
  gold: 'الذهب',
  funds: 'الصناديق',
  plan: 'التخطيط',
  analysis: 'التحليل',
  courses: 'الدورات',
  // Accounts
  open: 'فتح حساب',
  platform: 'المنصات',
  apps: 'التطبيقات',
  brokers: 'الوسطاء',
  sectors: 'القطاعات',
  // Trust
  license: 'الترخيص',
  checks: 'العناية الواجبة',
  scams: 'الاحتيال',
  'funds-protection': 'حماية الأموال',
  privacy: 'الخصوصية',
};

// Pillar Arabic names
export const PILLAR_NAMES_AR: Record<PillarSlug, string> = {
  learn: 'تعلم',
  accounts: 'حسابات',
  trust: 'ثقة',
};

// Pillar descriptions
export const PILLAR_DESCRIPTIONS_AR: Record<PillarSlug, string> = {
  learn: 'أساسيات الاستثمار والتعليم المالي - تعلم مفاهيم الاستثمار وبناء ثروتك بوعي',
  accounts: 'افتح حسابك الاستثماري وتعرف على أفضل المنصات والتطبيقات المرخصة',
  trust: 'تحقق من التراخيص واحمِ استثماراتك من الاحتيال والمخاطر',
};

// Get all paths for static generation
export function getAllPaths(): ArticlePath[] {
  const paths: ArticlePath[] = [];

  for (const [pillar, clusters] of Object.entries(CONTENT_STRUCTURE)) {
    for (const [cluster, slugs] of Object.entries(clusters)) {
      for (const slug of slugs) {
        paths.push({
          pillar: pillar as PillarSlug,
          cluster,
          slug,
        });
      }
    }
  }

  return paths;
}

// Get clusters for a pillar
export function getClustersByPillar(pillar: PillarSlug): string[] {
  return Object.keys(CONTENT_STRUCTURE[pillar] || {});
}

// Get articles for a cluster
export function getArticlesByCluster(pillar: PillarSlug, cluster: string): string[] {
  return CONTENT_STRUCTURE[pillar]?.[cluster] || [];
}

// Validate path
export function isValidPath(pillar: string, cluster: string, slug: string): boolean {
  const pillarData = CONTENT_STRUCTURE[pillar as PillarSlug];
  if (!pillarData) return false;

  const clusterData = pillarData[cluster];
  if (!clusterData) return false;

  return clusterData.includes(slug);
}

// Get breadcrumb data
export function getBreadcrumbPath(
  pillar: PillarSlug,
  cluster?: string,
  slug?: string
): { label: string; href: string }[] {
  const crumbs = [
    { label: 'الرئيسية', href: '/' },
    { label: PILLAR_NAMES_AR[pillar], href: `/${pillar}` },
  ];

  if (cluster) {
    crumbs.push({
      label: CLUSTER_NAMES_AR[cluster] || cluster,
      href: `/${pillar}/${cluster}`,
    });
  }

  return crumbs;
}

// Internal linking rules
export interface InternalLinkRule {
  from: ArticlePath;
  to: ArticlePath;
  anchorText: string;
  type: 'pillar' | 'cluster' | 'sibling' | 'child';
}

// Validate internal linking requirements
export function validateInternalLinks(
  articlePath: ArticlePath,
  links: { url: string; type: string }[]
): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  // Every article must link to its pillar page
  const hasPillarLink = links.some(
    (l) => l.url === `/${articlePath.pillar}` || l.type === 'pillar'
  );
  if (!hasPillarLink) {
    missing.push('رابط صفحة الركيزة');
  }

  // Every article must link to its cluster hub
  const hasClusterLink = links.some(
    (l) => l.url === `/${articlePath.pillar}/${articlePath.cluster}` || l.type === 'cluster'
  );
  if (!hasClusterLink) {
    missing.push('رابط صفحة المجموعة');
  }

  // Accounts pillar must link to learn and trust
  if (articlePath.pillar === 'accounts') {
    const hasLearnLink = links.some((l) => l.url.startsWith('/learn'));
    const hasTrustLink = links.some((l) => l.url.startsWith('/trust'));

    if (!hasLearnLink) {
      missing.push('رابط إلى قسم التعلم');
    }
    if (!hasTrustLink) {
      missing.push('رابط إلى قسم الثقة');
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
