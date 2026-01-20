// Content structure configuration for chartspoint.com

import type { PillarSlug } from './types';
import { PILLARS, CLUSTERS, PILLAR_CATEGORY_IDS, CLUSTER_CATEGORY_IDS } from './types';

// Re-export PILLARS from types
export { PILLARS, CLUSTERS };

// URL Structure: /{pillar}/{cluster}/{slug}
// Example: /basics/intro/what-is-technical-analysis

export interface ArticlePath {
  pillar: PillarSlug;
  cluster: string;
  slug: string;
}

// Pillar Arabic names
export const PILLAR_NAMES_AR: Record<string, string> = {
  basics: 'أساسيات التحليل الفني',
  indicators: 'المؤشرات الفنية',
  tools: 'الأدوات والحاسبات',
  tactics: 'الاستراتيجيات وإدارة المخاطر',
  // Legacy support
  learn: 'تعلم',
  accounts: 'حسابات',
  trust: 'ثقة',
};

// Cluster Arabic names
export const CLUSTER_NAMES_AR: Record<string, string> = {
  // Basics pillar clusters
  intro: 'مقدمة في التحليل الفني',
  patterns: 'أنماط الشموع والرسوم',
  action: 'حركة السعر',
  methods: 'طرق التحليل',
  // Indicators pillar clusters
  momentum: 'مؤشرات الزخم',
  trend: 'مؤشرات الاتجاه',
  volatility: 'مؤشرات التذبذب',
  volume: 'مؤشرات الحجم',
  // Tools pillar clusters
  calc: 'الحاسبات',
  charts: 'الرسوم البيانية',
  data: 'البيانات والمصادر',
  // Tactics pillar clusters
  'trend-tactics': 'استراتيجيات الاتجاه',
  reversion: 'استراتيجيات الارتداد',
  intraday: 'التداول اليومي',
  risk: 'إدارة المخاطر',
};

// Pillar descriptions
export const PILLAR_DESCRIPTIONS_AR: Record<PillarSlug, string> = {
  basics: 'المعرفة الأساسية والمفاهيم التأسيسية للتحليل الفني',
  indicators: 'الأدوات الفنية والمؤشرات المستخدمة في التحليل',
  tools: 'الحاسبات والأدوات العملية للمتداولين',
  tactics: 'استراتيجيات التداول وإدارة المخاطر',
};

// Get clusters for a pillar
export function getClustersByPillar(pillar: PillarSlug): string[] {
  return CLUSTERS
    .filter(c => c.pillar === pillar)
    .map(c => c.slug);
}

// Get cluster info
export function getClusterInfo(clusterSlug: string) {
  return CLUSTERS.find(c => c.slug === clusterSlug);
}

// Get pillar for a cluster
export function getPillarForCluster(clusterSlug: string): PillarSlug | null {
  const cluster = CLUSTERS.find(c => c.slug === clusterSlug);
  return cluster?.pillar || null;
}

// Get breadcrumb data
export function getBreadcrumbPath(
  pillar: PillarSlug,
  cluster?: string,
  articleTitle?: string
): { label: string; href: string; current?: boolean }[] {
  const crumbs = [
    { label: 'الرئيسية', href: '/' },
    {
      label: PILLAR_NAMES_AR[pillar] || pillar,
      href: `/${pillar}/`,
      current: !cluster && !articleTitle
    },
  ];

  if (cluster) {
    crumbs.push({
      label: CLUSTER_NAMES_AR[cluster] || cluster,
      href: `/${pillar}/${cluster}/`,
      current: !articleTitle
    });
  }

  if (articleTitle) {
    crumbs.push({
      label: articleTitle,
      href: '#',
      current: true
    });
  }

  return crumbs;
}

// Validate path
export function isValidPillar(pillar: string): pillar is PillarSlug {
  return ['basics', 'indicators', 'tools', 'tactics'].includes(pillar);
}

export function isValidCluster(pillar: PillarSlug, cluster: string): boolean {
  return CLUSTERS.some(c => c.pillar === pillar && c.slug === cluster);
}

// Get category IDs for WordPress
export function getCategoryIds(pillar: PillarSlug, cluster: string): number[] {
  const ids: number[] = [];

  if (PILLAR_CATEGORY_IDS[pillar]) {
    ids.push(PILLAR_CATEGORY_IDS[pillar]);
  }

  if (CLUSTER_CATEGORY_IDS[cluster]) {
    ids.push(CLUSTER_CATEGORY_IDS[cluster]);
  }

  return ids;
}

// Internal linking validation
export interface InternalLinkRule {
  from: ArticlePath;
  to: ArticlePath;
  anchorText: string;
  type: 'pillar' | 'cluster' | 'sibling' | 'child';
}

export function validateInternalLinks(
  articlePath: ArticlePath,
  links: { url: string; type: string }[]
): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  // Every article must link to its pillar page
  const hasPillarLink = links.some(
    (l) => l.url === `/${articlePath.pillar}/` || l.type === 'pillar'
  );
  if (!hasPillarLink) {
    missing.push('رابط صفحة الركيزة');
  }

  // Every article must link to its cluster hub
  const hasClusterLink = links.some(
    (l) => l.url === `/${articlePath.pillar}/${articlePath.cluster}/` || l.type === 'cluster'
  );
  if (!hasClusterLink) {
    missing.push('رابط صفحة المجموعة');
  }

  // All articles should link to risk management (YMYL requirement)
  if (articlePath.cluster !== 'risk') {
    const hasRiskLink = links.some((l) => l.url.includes('/tactics/risk/'));
    if (!hasRiskLink) {
      missing.push('رابط إلى قسم إدارة المخاطر');
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
