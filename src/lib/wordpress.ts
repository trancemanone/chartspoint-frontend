/**
 * WordPress WPGraphQL Client for chartspoint.com
 *
 * This module provides functions to fetch content from the WordPress CMS
 * at cms.chartspoint.com using the WPGraphQL API with JWT Authentication.
 *
 * Required WordPress Plugins:
 * - WPGraphQL
 * - WPGraphQL JWT Authentication (or Simple JWT Login)
 * - WPGraphQL for ACF (optional, for custom fields)
 * - WPGraphQL for Rank Math SEO (optional, SEO fields will be empty if not installed)
 */

import type {
  WPPost,
  WPPage,
  WPCategory,
  WPComment,
  WPPaginatedResponse,
  WPError,
  Article,
  PillarSlug,
} from './types';

import {
  PILLAR_CATEGORY_IDS,
  CLUSTER_CATEGORY_IDS,
  CATEGORY_ID_TO_SLUG,
  CLUSTERS,
  PILLARS,
} from './types';

// WordPress GraphQL API URL
const GRAPHQL_URL =
  import.meta.env.WORDPRESS_GRAPHQL_URL ||
  import.meta.env.WORDPRESS_API_URL ||
  'https://cms.chartspoint.com/graphql';

// JWT Authentication credentials (stored securely)
const JWT_USERNAME = import.meta.env.WORDPRESS_JWT_USERNAME || '';
const JWT_PASSWORD = import.meta.env.WORDPRESS_JWT_PASSWORD || '';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache = new Map<string, { data: unknown; timestamp: number }>();

// JWT token storage
let jwtToken: string | null = null;
let jwtExpiry: number = 0;

/**
 * Simple in-memory cache implementation
 */
function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Clear the entire cache or a specific key
 */
export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

/**
 * Authenticate and get JWT token
 * Uses WPGraphQL JWT Authentication plugin
 */
async function getJwtToken(): Promise<string | null> {
  // Return cached token if still valid
  if (jwtToken && Date.now() < jwtExpiry) {
    return jwtToken;
  }

  // If no credentials, return null (will use public queries)
  if (!JWT_USERNAME || !JWT_PASSWORD) {
    return null;
  }

  const mutation = `
    mutation LoginUser($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        authToken
        refreshToken
        user {
          id
          name
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          username: JWT_USERNAME,
          password: JWT_PASSWORD,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('JWT Authentication failed:', data.errors);
      return null;
    }

    jwtToken = data.data?.login?.authToken || null;
    // JWT tokens typically expire in 1 hour, set expiry 5 minutes before
    jwtExpiry = Date.now() + 55 * 60 * 1000;

    return jwtToken;
  } catch (error) {
    console.error('JWT Authentication error:', error);
    return null;
  }
}

/**
 * Execute a GraphQL query
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param requireAuth - Whether this query requires authentication
 * @returns GraphQL response data
 */
async function executeQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
  requireAuth = false
): Promise<T> {
  // Create cache key from query and variables
  const cacheKey = JSON.stringify({ query, variables });
  const cached = getCached<T>(cacheKey);
  if (cached) {
    return cached;
  }

  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
  };

  // Add authentication if required or available
  if (requireAuth) {
    const token = await getJwtToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error(json.errors[0]?.message || 'GraphQL query failed');
    }

    // Cache successful response
    setCache(cacheKey, json.data);

    return json.data as T;
  } catch (error) {
    console.error('GraphQL query failed:', error);
    throw error;
  }
}

// =============================================================================
// GRAPHQL QUERIES
// =============================================================================

const POST_FIELDS = `
  id
  databaseId
  slug
  title
  date
  modified
  content
  excerpt
  status
  author {
    node {
      databaseId
      name
      slug
      description
      avatar {
        url
      }
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  categories {
    nodes {
      databaseId
      slug
      name
      parentDatabaseId
    }
  }
  tags {
    nodes {
      databaseId
      slug
      name
    }
  }
`;

// ACF fields query fragment (if WPGraphQL for ACF is installed)
const ACF_FIELDS = `
  acfArticleMeta {
    wordCount
    readingTime
    primaryKeyword
    expertiseLevel
  }
  acfFaq {
    faqItems {
      question
      answer
    }
  }
  acfInternalLinks {
    links {
      url
      anchorText
      linkType
    }
  }
  acfEeat {
    authorExpertise
    credentials
    reviewProcess
    sourceMethodology
  }
`;

const POSTS_QUERY = `
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
    }
  }
`;

const POSTS_BY_CATEGORY_QUERY = `
  query GetPostsByCategory($categoryId: Int!, $first: Int, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, categoryId: $categoryId }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

const POSTS_BY_CATEGORIES_QUERY = `
  query GetPostsByCategories($categoryIn: [ID]!, $first: Int, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, categoryIn: $categoryIn }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

const CATEGORIES_QUERY = `
  query GetCategories {
    categories(first: 100) {
      nodes {
        databaseId
        slug
        name
        description
        count
        parentDatabaseId
      }
    }
  }
`;

const CATEGORY_BY_SLUG_QUERY = `
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      databaseId
      slug
      name
      description
      count
      parentDatabaseId
    }
  }
`;

const PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      databaseId
      slug
      title
      content
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

const COMMENTS_BY_POST_QUERY = `
  query GetCommentsByPost($postId: ID!, $first: Int, $after: String) {
    comments(
      first: $first
      after: $after
      where: { contentId: $postId, status: "approve" }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        content
        date
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        parentDatabaseId
      }
    }
  }
`;

// =============================================================================
// GRAPHQL RESPONSE TYPES
// =============================================================================

interface GQLPost {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  modified: string;
  content: string;
  excerpt: string;
  status: string;
  author: {
    node: {
      databaseId: number;
      name: string;
      slug: string;
      description: string;
      avatar: {
        url: string;
      };
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  } | null;
  categories: {
    nodes: {
      databaseId: number;
      slug: string;
      name: string;
      parentDatabaseId: number;
    }[];
  };
  tags: {
    nodes: {
      databaseId: number;
      slug: string;
      name: string;
    }[];
  };
}

interface GQLCategory {
  databaseId: number;
  slug: string;
  name: string;
  description: string;
  count: number;
  parentDatabaseId: number;
}

interface GQLPageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface GQLPostsResponse {
  posts: {
    pageInfo: GQLPageInfo;
    nodes: GQLPost[];
  };
}

interface GQLPostResponse {
  post: GQLPost | null;
}

interface GQLCategoriesResponse {
  categories: {
    nodes: GQLCategory[];
  };
}

interface GQLCategoryResponse {
  category: GQLCategory | null;
}

interface GQLPageResponse {
  page: {
    id: string;
    databaseId: number;
    slug: string;
    title: string;
    content: string;
    date: string;
    modified: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      };
    } | null;
    seo: {
      title: string;
      metaDesc: string;
      canonical: string;
      opengraphImage: {
        sourceUrl: string;
      } | null;
    } | null;
  } | null;
}

// =============================================================================
// TRANSFORM FUNCTIONS
// =============================================================================

/**
 * Transform GraphQL post to WPPost format (for backward compatibility)
 */
function transformGQLPostToWPPost(gqlPost: GQLPost): WPPost {
  const categories = gqlPost.categories.nodes;

  return {
    id: gqlPost.databaseId,
    date: gqlPost.date,
    date_gmt: gqlPost.date,
    guid: { rendered: '' },
    modified: gqlPost.modified,
    modified_gmt: gqlPost.modified,
    slug: gqlPost.slug,
    status: 'publish' as const,
    type: 'post',
    link: `https://cms.chartspoint.com/${gqlPost.slug}`,
    title: { rendered: gqlPost.title },
    content: { rendered: gqlPost.content },
    excerpt: { rendered: gqlPost.excerpt },
    author: gqlPost.author?.node?.databaseId || 1,
    featured_media: gqlPost.featuredImage ? 1 : 0,
    comment_status: 'open' as const,
    ping_status: 'open' as const,
    sticky: false,
    template: '',
    format: 'standard',
    meta: {},
    categories: categories.map((c) => c.databaseId),
    tags: gqlPost.tags.nodes.map((t) => t.databaseId),
    _embedded: {
      author: [
        {
          id: gqlPost.author?.node?.databaseId || 1,
          name: gqlPost.author?.node?.name || 'فريق تشارتس بوينت',
          url: '',
          description: gqlPost.author?.node?.description || '',
          link: '',
          slug: gqlPost.author?.node?.slug || '',
          avatar_urls: {
            '24': gqlPost.author?.node?.avatar?.url || '',
            '48': gqlPost.author?.node?.avatar?.url || '',
            '96': gqlPost.author?.node?.avatar?.url || '',
          },
        },
      ],
      'wp:featuredmedia': gqlPost.featuredImage
        ? [
            {
              id: 1,
              date: gqlPost.date,
              slug: '',
              type: 'attachment',
              link: gqlPost.featuredImage.node.sourceUrl,
              title: { rendered: gqlPost.title },
              author: 1,
              caption: { rendered: '' },
              alt_text: gqlPost.featuredImage.node.altText || gqlPost.title,
              media_type: 'image',
              mime_type: 'image/jpeg',
              media_details: {
                width: gqlPost.featuredImage.node.mediaDetails?.width || 1200,
                height: gqlPost.featuredImage.node.mediaDetails?.height || 630,
                file: '',
                sizes: {},
              },
              source_url: gqlPost.featuredImage.node.sourceUrl,
            },
          ]
        : undefined,
      'wp:term': [
        categories.map((c) => ({
          id: c.databaseId,
          count: 0,
          description: '',
          link: '',
          name: c.name,
          slug: c.slug,
          taxonomy: 'category',
          parent: c.parentDatabaseId,
          meta: {},
        })),
        gqlPost.tags.nodes.map((t) => ({
          id: t.databaseId,
          count: 0,
          description: '',
          link: '',
          name: t.name,
          slug: t.slug,
          taxonomy: 'post_tag',
          meta: {},
        })),
      ],
    },
    // SEO fields - empty for now (WPGraphQL for Rank Math not installed)
    yoast_head_json: undefined,
  };
}

/**
 * Transform GraphQL category to WPCategory format
 */
function transformGQLCategoryToWPCategory(gqlCat: GQLCategory): WPCategory {
  return {
    id: gqlCat.databaseId,
    count: gqlCat.count,
    description: gqlCat.description || '',
    link: `https://cms.chartspoint.com/category/${gqlCat.slug}`,
    name: gqlCat.name,
    slug: gqlCat.slug,
    taxonomy: 'category',
    parent: gqlCat.parentDatabaseId || 0,
    meta: {},
  };
}

// =============================================================================
// POST FUNCTIONS
// =============================================================================

/**
 * Get all published posts with embedded author and featured image data
 */
export async function getAllPosts(
  perPage = 100,
  page = 1
): Promise<WPPaginatedResponse<WPPost>> {
  try {
    const data = await executeQuery<GQLPostsResponse>(POSTS_QUERY, {
      first: perPage,
      after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
    });

    const posts = data.posts.nodes.map(transformGQLPostToWPPost);
    const totalItems = posts.length;
    const totalPages = data.posts.pageInfo.hasNextPage ? page + 1 : page;

    return {
      data: posts,
      pagination: {
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }
}

/**
 * Get cluster category IDs for a given pillar
 */
function getClusterIdsForPillar(pillar: PillarSlug): number[] {
  const pillarClusters = CLUSTERS.filter((c) => c.pillar === pillar);
  return pillarClusters.map((c) => CLUSTER_CATEGORY_IDS[c.slug]).filter(Boolean);
}

/**
 * Get posts by pillar (parent category)
 */
export async function getPostsByPillar(
  pillar: PillarSlug,
  perPage = 50,
  page = 1
): Promise<WPPaginatedResponse<WPPost>> {
  const clusterIds = getClusterIdsForPillar(pillar);

  if (clusterIds.length === 0) {
    console.error(`No clusters found for pillar: ${pillar}`);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }

  try {
    const data = await executeQuery<GQLPostsResponse>(POSTS_BY_CATEGORIES_QUERY, {
      categoryIn: clusterIds.map(String),
      first: perPage,
      after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
    });

    const posts = data.posts.nodes.map(transformGQLPostToWPPost);
    const totalItems = posts.length;
    const totalPages = data.posts.pageInfo.hasNextPage ? page + 1 : page;

    return {
      data: posts,
      pagination: {
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error(`Error fetching posts for pillar ${pillar}:`, error);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }
}

/**
 * Get posts by cluster (child category)
 */
export async function getPostsByCluster(
  cluster: string,
  perPage = 20,
  page = 1
): Promise<WPPaginatedResponse<WPPost>> {
  const categoryId = CLUSTER_CATEGORY_IDS[cluster];

  if (!categoryId) {
    console.error(`Unknown cluster: ${cluster}`);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }

  try {
    const data = await executeQuery<GQLPostsResponse>(POSTS_BY_CATEGORY_QUERY, {
      categoryId,
      first: perPage,
      after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
    });

    const posts = data.posts.nodes.map(transformGQLPostToWPPost);
    const totalItems = posts.length;
    const totalPages = data.posts.pageInfo.hasNextPage ? page + 1 : page;

    return {
      data: posts,
      pagination: {
        totalItems,
        totalPages,
      },
    };
  } catch (error) {
    console.error(`Error fetching posts for cluster ${cluster}:`, error);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const data = await executeQuery<GQLPostResponse>(POST_BY_SLUG_QUERY, {
      slug,
    });

    if (!data.post) {
      return null;
    }

    return transformGQLPostToWPPost(data.post);
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<
  { pillar: string; cluster: string; slug: string }[]
> {
  try {
    const allPosts: WPPost[] = [];
    let hasMore = true;
    let cursor: string | null = null;

    while (hasMore) {
      const data = await executeQuery<GQLPostsResponse>(POSTS_QUERY, {
        first: 100,
        after: cursor,
      });

      const posts = data.posts.nodes.map(transformGQLPostToWPPost);
      allPosts.push(...posts);

      hasMore = data.posts.pageInfo.hasNextPage;
      cursor = data.posts.pageInfo.endCursor;
    }

    return allPosts.map((post) => {
      const categories = post._embedded?.['wp:term']?.[0] || [];
      let pillar = 'learn';
      let cluster = 'general';

      for (const cat of categories) {
        const category = cat as WPCategory;
        const clusterInfo = CLUSTERS.find((c) => c.slug === category.slug);
        if (clusterInfo) {
          cluster = clusterInfo.slug;
          pillar = clusterInfo.pillar;
          break;
        }

        if (Object.values(PILLAR_CATEGORY_IDS).includes(category.id)) {
          pillar = category.slug;
        }
      }

      return { pillar, cluster, slug: post.slug };
    });
  } catch (error) {
    console.error('Error fetching all post slugs:', error);
    return [];
  }
}

// =============================================================================
// CATEGORY FUNCTIONS
// =============================================================================

/**
 * Get all categories with hierarchy information
 */
export async function getAllCategories(): Promise<WPCategory[]> {
  try {
    const data = await executeQuery<GQLCategoriesResponse>(CATEGORIES_QUERY);
    return data.categories.nodes.map(transformGQLCategoryToWPCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  try {
    const data = await executeQuery<GQLCategoryResponse>(CATEGORY_BY_SLUG_QUERY, {
      slug,
    });

    if (!data.category) {
      return null;
    }

    return transformGQLCategoryToWPCategory(data.category);
  } catch (error) {
    console.error(`Error fetching category with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get child categories for a parent category
 */
export async function getChildCategories(parentId: number): Promise<WPCategory[]> {
  try {
    const allCategories = await getAllCategories();
    return allCategories.filter((cat) => cat.parent === parentId);
  } catch (error) {
    console.error(`Error fetching child categories for parent ${parentId}:`, error);
    return [];
  }
}

/**
 * Get categories with post counts, organized by pillar
 */
export async function getCategoriesHierarchy(): Promise<
  Map<PillarSlug, { pillar: WPCategory; clusters: WPCategory[] }>
> {
  try {
    const allCategories = await getAllCategories();
    const hierarchy = new Map<PillarSlug, { pillar: WPCategory; clusters: WPCategory[] }>();

    for (const [pillarSlug, pillarId] of Object.entries(PILLAR_CATEGORY_IDS)) {
      const pillarCategory = allCategories.find((cat) => cat.id === pillarId);
      if (pillarCategory) {
        const clusters = allCategories.filter((cat) => cat.parent === pillarId);
        hierarchy.set(pillarSlug as PillarSlug, {
          pillar: pillarCategory,
          clusters,
        });
      }
    }

    return hierarchy;
  } catch (error) {
    console.error('Error fetching category hierarchy:', error);
    return new Map();
  }
}

// =============================================================================
// PAGE FUNCTIONS
// =============================================================================

/**
 * Get a page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const data = await executeQuery<GQLPageResponse>(PAGE_BY_SLUG_QUERY, {
      slug,
    });

    if (!data.page) {
      return null;
    }

    const page = data.page;
    return {
      id: page.databaseId,
      date: page.date,
      date_gmt: page.date,
      guid: { rendered: '' },
      modified: page.modified,
      modified_gmt: page.modified,
      slug: page.slug,
      status: 'publish',
      type: 'page',
      link: `https://cms.chartspoint.com/${page.slug}`,
      title: { rendered: page.title },
      content: { rendered: page.content },
      excerpt: { rendered: '' },
      author: 1,
      featured_media: page.featuredImage ? 1 : 0,
      parent: 0,
      menu_order: 0,
      comment_status: 'closed',
      ping_status: 'closed',
      template: '',
      meta: {},
      _embedded: page.featuredImage
        ? {
            'wp:featuredmedia': [
              {
                id: 1,
                date: page.date,
                slug: '',
                type: 'attachment',
                link: page.featuredImage.node.sourceUrl,
                title: { rendered: page.title },
                author: 1,
                caption: { rendered: '' },
                alt_text: page.featuredImage.node.altText || page.title,
                media_type: 'image',
                mime_type: 'image/jpeg',
                media_details: {
                  width: page.featuredImage.node.mediaDetails?.width || 1200,
                  height: page.featuredImage.node.mediaDetails?.height || 630,
                  file: '',
                  sizes: {},
                },
                source_url: page.featuredImage.node.sourceUrl,
              },
            ],
          }
        : undefined,
      yoast_head_json: page.seo
        ? {
            title: page.seo.title || page.title,
            description: page.seo.metaDesc || '',
            canonical: page.seo.canonical || '',
            og_title: page.seo.title || page.title,
            og_description: page.seo.metaDesc || '',
            og_image: page.seo.opengraphImage
              ? [{ url: page.seo.opengraphImage.sourceUrl, width: 1200, height: 630 }]
              : undefined,
          }
        : undefined,
    };
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return null;
  }
}

// =============================================================================
// COMMENT FUNCTIONS
// =============================================================================

/**
 * Get comments for a specific post
 */
export async function getCommentsByPost(
  postId: number,
  perPage = 50,
  page = 1
): Promise<WPPaginatedResponse<WPComment>> {
  try {
    const data = await executeQuery<{
      comments: { pageInfo: GQLPageInfo; nodes: any[] };
    }>(COMMENTS_BY_POST_QUERY, {
      postId: String(postId),
      first: perPage,
      after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
    });

    const comments: WPComment[] = data.comments.nodes.map((c) => ({
      id: c.databaseId,
      post: postId,
      parent: c.parentDatabaseId || 0,
      author: 0,
      author_name: c.author?.node?.name || 'مجهول',
      author_url: '',
      date: c.date,
      date_gmt: c.date,
      content: { rendered: c.content },
      link: '',
      status: 'approved',
      type: 'comment',
      author_avatar_urls: {
        '24': c.author?.node?.avatar?.url || '',
        '48': c.author?.node?.avatar?.url || '',
        '96': c.author?.node?.avatar?.url || '',
      },
      meta: {},
    }));

    return {
      data: comments,
      pagination: {
        totalItems: comments.length,
        totalPages: data.comments.pageInfo.hasNextPage ? page + 1 : page,
      },
    };
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }
}

// =============================================================================
// TRANSFORM FUNCTIONS
// =============================================================================

/**
 * Transform a WordPress post to the frontend Article type
 */
export function transformToArticle(post: WPPost): Article {
  const embeddedCategories = (post._embedded?.['wp:term']?.[0] || []) as WPCategory[];
  const embeddedTags = (post._embedded?.['wp:term']?.[1] || []) as WPCategory[];

  let pillar: PillarSlug = 'learn';
  let cluster = 'general';

  for (const cat of embeddedCategories) {
    const clusterInfo = CLUSTERS.find((c) => c.slug === cat.slug);
    if (clusterInfo) {
      cluster = clusterInfo.slug;
      pillar = clusterInfo.pillar;
      break;
    }

    if (Object.values(PILLAR_CATEGORY_IDS).includes(cat.id)) {
      pillar = cat.slug as PillarSlug;
    }
  }

  const author = post._embedded?.author?.[0];
  const authorName = author?.name || 'فريق تشارتس بوينت';
  const authorBio = author?.description || '';
  const authorAvatar = author?.avatar_urls?.['96'] || '';
  const authorSlug = author?.slug || '';

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = featuredMedia
    ? {
        url: featuredMedia.source_url,
        alt: featuredMedia.alt_text || post.title.rendered,
        width: featuredMedia.media_details?.width || 1200,
        height: featuredMedia.media_details?.height || 630,
      }
    : undefined;

  const excerpt = stripHtmlTags(post.excerpt?.rendered).trim();
  const contentText = stripHtmlTags(post.content?.rendered);
  const wordCount = post.acf?.word_count || estimateWordCount(contentText);
  const readingTime = post.acf?.reading_time || Math.ceil(wordCount / 200);

  // SEO: Rank Math is the ONLY source of truth
  // All SEO data comes from Rank Math plugin via WPGraphQL
  const rankMathSeo = post.yoast_head_json; // WPGraphQL Rank Math uses similar structure
  const robots = rankMathSeo?.robots || [];
  const noIndex = Array.isArray(robots) ? robots.includes('noindex') : false;
  const noFollow = Array.isArray(robots) ? robots.includes('nofollow') : false;

  const seo = {
    // Rank Math title - no fallback to post title
    title: rankMathSeo?.title || '',
    // Rank Math description - no fallback to excerpt
    description: rankMathSeo?.description || '',
    // Rank Math canonical - no fallback
    canonical: rankMathSeo?.canonical || '',
    // Rank Math OG image - no fallback to featured image
    ogImage: rankMathSeo?.og_image?.[0]?.url || '',
    // Rank Math schema
    schema: rankMathSeo?.schema
      ? JSON.stringify(rankMathSeo.schema)
      : undefined,
    // Robots meta from Rank Math
    robots: Array.isArray(robots) ? robots : [],
    noIndex,
    noFollow,
  };

  const faqs =
    post.acf?.faq_items?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })) || [];

  const internalLinks =
    post.acf?.internal_links?.map((link) => ({
      url: link.url,
      anchorText: link.anchor_text,
      type: link.link_type,
    })) || [];

  const eeat = post.acf?.eeat
    ? {
        authorExpertise: post.acf.eeat.author_expertise,
        credentials: post.acf.eeat.credentials,
        reviewProcess: post.acf.eeat.review_process,
        sources: post.acf.eeat.sources_methodology,
      }
    : undefined;

  return {
    id: post.id,
    title: decodeHtmlEntities(post.title.rendered),
    slug: post.slug,
    pillar,
    cluster,
    excerpt,
    // Downgrade H1 to H2 in content - only hero title should be H1
    content: post.content.rendered.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>'),
    featuredImage,
    author: {
      name: authorName,
      bio: authorBio,
      avatar: authorAvatar,
      slug: authorSlug,
    },
    publishDate: post.date,
    modifiedDate: post.modified,
    wordCount,
    readingTime,
    expertiseLevel: post.acf?.expertise_level || 'beginner',
    seo,
    faqs,
    relatedArticles: [],
    internalLinks,
    eeat,
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Strip HTML tags from a string
 */
function stripHtmlTags(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&#8211;': '-',
    '&#8212;': '--',
    '&#8216;': "'",
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }

  return decoded;
}

/**
 * Estimate word count from text content (Arabic text)
 */
function estimateWordCount(text: string): number {
  return text.split(/[\s،.؟!,;:]+/).filter((word) => word.length > 0).length;
}

/**
 * Extract table of contents from HTML content
 */
export function extractTOC(
  content: string
): { id: string; text: string; level: 2 | 3 }[] {
  const headingRegex = /<h([23])[^>]*(?:id="([^"]*)")?[^>]*>([^<]*)<\/h[23]>/gi;
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3;
    const id = match[2] || generateSlug(match[3]);
    const text = stripHtmlTags(match[3]).trim();

    if (text) {
      toc.push({ level, id, text });
    }
  }

  return toc;
}

/**
 * Generate a URL-safe slug from text (handles Arabic)
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Generate breadcrumbs for navigation
 */
export function generateBreadcrumbs(
  pillar: PillarSlug,
  cluster?: string,
  articleTitle?: string
): { label: string; href: string; current?: boolean }[] {
  const crumbs = [{ label: 'الرئيسية', href: '/' }];

  const pillarData = PILLARS[pillar];
  if (pillarData) {
    crumbs.push({
      label: pillarData.nameAr,
      href: `/${pillar}`,
      current: !cluster && !articleTitle,
    });
  }

  if (cluster) {
    const clusterData = CLUSTERS.find((c) => c.slug === cluster && c.pillar === pillar);
    if (clusterData) {
      crumbs.push({
        label: clusterData.nameAr,
        href: `/${pillar}/${cluster}`,
        current: !articleTitle,
      });
    }
  }

  if (articleTitle) {
    crumbs.push({
      label: articleTitle,
      href: '#',
      current: true,
    });
  }

  return crumbs;
}

/**
 * Get related posts for an article
 */
export async function getRelatedPosts(
  postId: number,
  cluster: string,
  limit = 4
): Promise<WPPost[]> {
  try {
    const response = await getPostsByCluster(cluster, limit + 1);
    return response.data.filter((post) => post.id !== postId).slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

/**
 * Search posts by keyword
 */
export async function searchPosts(
  query: string,
  perPage = 10,
  page = 1
): Promise<WPPaginatedResponse<WPPost>> {
  const SEARCH_QUERY = `
    query SearchPosts($search: String!, $first: Int, $after: String) {
      posts(
        first: $first
        after: $after
        where: { status: PUBLISH, search: $search }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  try {
    const data = await executeQuery<GQLPostsResponse>(SEARCH_QUERY, {
      search: query,
      first: perPage,
      after: page > 1 ? btoa(`arrayconnection:${(page - 1) * perPage - 1}`) : null,
    });

    const posts = data.posts.nodes.map(transformGQLPostToWPPost);

    return {
      data: posts,
      pagination: {
        totalItems: posts.length,
        totalPages: data.posts.pageInfo.hasNextPage ? page + 1 : page,
      },
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    return { data: [], pagination: { totalItems: 0, totalPages: 0 } };
  }
}

// =============================================================================
// AUTHOR TYPES AND FUNCTIONS
// =============================================================================

/**
 * WordPress Author type for author pages
 */
export interface WPAuthor {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  avatar: {
    url: string;
  };
  url?: string;
  posts: WPAuthorPost[];
}

/**
 * Author post type (simplified for author page listing)
 */
export interface WPAuthorPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  categories: {
    nodes: {
      databaseId: number;
      slug: string;
      name: string;
      parentDatabaseId: number;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  } | null;
}

/**
 * GraphQL query to get author by slug with their posts
 */
const AUTHOR_BY_SLUG_QUERY = `
  query GetAuthorBySlug($slug: ID!) {
    user(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      url
      avatar {
        url
      }
      posts(first: 50, where: { status: PUBLISH }) {
        nodes {
          id
          databaseId
          title
          slug
          excerpt
          date
          categories {
            nodes {
              databaseId
              slug
              name
              parentDatabaseId
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * GraphQL query to get all authors (for getStaticPaths)
 */
const ALL_AUTHORS_QUERY = `
  query GetAllAuthors {
    users(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        url
        avatar {
          url
        }
      }
    }
  }
`;

interface GQLAuthorResponse {
  user: {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    description: string;
    url?: string;
    avatar: {
      url: string;
    };
    posts: {
      nodes: WPAuthorPost[];
    };
  } | null;
}

interface GQLAllAuthorsResponse {
  users: {
    nodes: {
      id: string;
      databaseId: number;
      name: string;
      slug: string;
      description: string;
      url?: string;
      avatar: {
        url: string;
      };
    }[];
  };
}

/**
 * Get an author by slug with their published posts
 */
export async function getAuthorBySlug(slug: string): Promise<WPAuthor | null> {
  try {
    const data = await executeQuery<GQLAuthorResponse>(AUTHOR_BY_SLUG_QUERY, {
      slug,
    });

    if (!data.user) {
      return null;
    }

    return {
      id: data.user.id,
      databaseId: data.user.databaseId,
      name: data.user.name,
      slug: data.user.slug,
      description: data.user.description || '',
      url: data.user.url,
      avatar: {
        url: data.user.avatar?.url || '',
      },
      posts: data.user.posts.nodes,
    };
  } catch (error) {
    console.error(`Error fetching author with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all authors for static path generation
 */
export async function getAllAuthors(): Promise<
  { slug: string; name: string; databaseId: number }[]
> {
  try {
    const data = await executeQuery<GQLAllAuthorsResponse>(ALL_AUTHORS_QUERY);

    return data.users.nodes.map((user) => ({
      slug: user.slug,
      name: user.name,
      databaseId: user.databaseId,
    }));
  } catch (error) {
    console.error('Error fetching all authors:', error);
    return [];
  }
}

/**
 * Transform author post to Article type for display in cards
 */
export function transformAuthorPostToArticle(post: WPAuthorPost, author: WPAuthor): Article {
  const categories = post.categories.nodes;

  // Determine pillar and cluster from categories
  let pillar: PillarSlug = 'learn';
  let cluster = 'general';

  for (const cat of categories) {
    const clusterInfo = CLUSTERS.find((c) => c.slug === cat.slug);
    if (clusterInfo) {
      cluster = clusterInfo.slug;
      pillar = clusterInfo.pillar;
      break;
    }

    if (Object.values(PILLAR_CATEGORY_IDS).includes(cat.databaseId)) {
      pillar = cat.slug as PillarSlug;
    }
  }

  const excerpt = stripHtmlTags(post.excerpt).trim();

  return {
    id: post.databaseId,
    title: decodeHtmlEntities(post.title),
    slug: post.slug,
    pillar,
    cluster,
    excerpt,
    content: '',
    featuredImage: post.featuredImage
      ? {
          url: post.featuredImage.node.sourceUrl,
          alt: post.featuredImage.node.altText || post.title,
          width: post.featuredImage.node.mediaDetails?.width || 1200,
          height: post.featuredImage.node.mediaDetails?.height || 630,
        }
      : undefined,
    author: {
      name: author.name,
      bio: author.description,
      avatar: author.avatar.url,
      slug: author.slug,
    },
    publishDate: post.date,
    modifiedDate: post.date,
    wordCount: 0,
    readingTime: 5,
    expertiseLevel: 'beginner',
    seo: {
      title: '',
      description: '',
      canonical: '',
    },
    faqs: [],
    relatedArticles: [],
    internalLinks: [],
  };
}
