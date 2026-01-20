import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * UI Verification Tests for itqqan.com
 *
 * These tests capture screenshots of key UI areas across different viewports
 * for visual verification after deployments.
 *
 * Usage:
 *   Production: npx playwright test
 *   Local dev:  PLAYWRIGHT_BASE_URL=http://localhost:4321 npx playwright test
 */

// ES Module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Viewport configurations
const VIEWPORTS = {
  mobile: { width: 375, height: 812 },   // iPhone X size
  tablet: { width: 768, height: 1024 },  // iPad size
  desktop: { width: 1280, height: 800 }, // Standard desktop
} as const;

// Screenshots output directory
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

test.describe('Homepage UI Verification', () => {
  test('should capture homepage header at mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Capture full header/logo area
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage-header-mobile-375px.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORTS.mobile.width,
        height: 400, // Capture top portion including header and hero
      },
    });

    // Verify page loaded successfully
    await expect(page).toHaveTitle(/.+/);
  });

  test('should capture homepage header at tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage-header-tablet-768px.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORTS.tablet.width,
        height: 500,
      },
    });

    await expect(page).toHaveTitle(/.+/);
  });

  test('should capture homepage header at desktop viewport (1280px)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage-header-desktop-1280px.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: VIEWPORTS.desktop.width,
        height: 600,
      },
    });

    await expect(page).toHaveTitle(/.+/);
  });
});

test.describe('Article Page UI Verification', () => {
  // Sample article path - adjust based on actual site content
  // The test will try to find an article from the learn pillar
  const SAMPLE_ARTICLE_PATHS = [
    '/learn/stocks/',           // Cluster page
    '/learn/',                  // Pillar page
    '/accounts/',               // Accounts pillar
    '/trust/',                  // Trust pillar
  ];

  test('should capture article/content page sidebar/TOC area', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);

    // Try to navigate to an article page
    let navigated = false;
    for (const articlePath of SAMPLE_ARTICLE_PATHS) {
      try {
        const response = await page.goto(articlePath);
        if (response && response.ok()) {
          navigated = true;
          break;
        }
      } catch {
        // Try next path
        continue;
      }
    }

    if (!navigated) {
      // Fallback: navigate to homepage and find a link to an article
      await page.goto('/');
    }

    await page.waitForLoadState('networkidle');

    // Take a full-page screenshot to capture sidebar/TOC if present
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'article-page-sidebar-desktop.png'),
      fullPage: false,
    });

    // Also capture just the sidebar area if it exists (right side for RTL layout)
    // In RTL, sidebar is typically on the left side visually
    const sidebar = page.locator('[data-testid="sidebar"], aside, .sidebar, .toc, [class*="sidebar"]').first();

    if (await sidebar.isVisible().catch(() => false)) {
      await sidebar.screenshot({
        path: path.join(SCREENSHOTS_DIR, 'article-sidebar-component.png'),
      });
    }

    // Verify page loaded
    await expect(page).toHaveTitle(/.+/);
  });

  test('should capture article page TOC on mobile (if visible)', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);

    // Try to navigate to a content page
    let navigated = false;
    for (const articlePath of SAMPLE_ARTICLE_PATHS) {
      try {
        const response = await page.goto(articlePath);
        if (response && response.ok()) {
          navigated = true;
          break;
        }
      } catch {
        continue;
      }
    }

    if (!navigated) {
      await page.goto('/');
    }

    await page.waitForLoadState('networkidle');

    // Capture the mobile view
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'article-page-mobile.png'),
      fullPage: false,
    });

    // Look for mobile TOC toggle or floating elements
    const mobileToc = page.locator('[data-testid="mobile-toc"], .mobile-toc, [class*="table-of-contents"]').first();

    if (await mobileToc.isVisible().catch(() => false)) {
      await mobileToc.screenshot({
        path: path.join(SCREENSHOTS_DIR, 'article-toc-mobile.png'),
      });
    }

    await expect(page).toHaveTitle(/.+/);
  });
});

test.describe('Full Page Screenshots', () => {
  test('should capture full homepage for reference', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage-full-desktop.png'),
      fullPage: true,
    });
  });

  test('should capture full homepage mobile for reference', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'homepage-full-mobile.png'),
      fullPage: true,
    });
  });
});
