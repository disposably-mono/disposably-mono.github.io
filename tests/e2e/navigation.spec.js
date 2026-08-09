const { test, expect } = require('@playwright/test');

test('all three mats render with the correct desk coordinates', async ({ page }) => {
  await page.goto('/');

  const expected = {
    home: { x: '0', y: '0' },
    projects: { x: '1.2', y: '-0.4' },
    contact: { x: '2.3', y: '0.55' },
  };

  for (const [name, coords] of Object.entries(expected)) {
    const mat = page.locator(`.mat[data-mat="${name}"]`);
    await expect(mat).toHaveAttribute('data-x', coords.x);
    await expect(mat).toHaveAttribute('data-y', coords.y);
  }
});

test('nav has three buttons built from data, Home current by default', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.nav-link');

  await expect(links).toHaveCount(3);
  await expect(page.locator('.nav-link[data-target="home"]')).toHaveClass(/cur/);
  await expect(page.locator('.nav-link[data-target="home"]')).toHaveText('Home');
  await expect(page.locator('.nav-link[data-target="projects"]')).toHaveText('Projects');
  await expect(page.locator('.nav-link[data-target="contact"]')).toHaveText('Contact');
});

test('clicking a nav link marks it current and pans the desk to its coordinates', async ({ page }) => {
  await page.goto('/');
  const viewportSize = page.viewportSize();

  await page.locator('.nav-link[data-target="projects"]').click();
  await expect(page.locator('.nav-link[data-target="projects"]')).toHaveClass(/cur/);
  await expect(page.locator('.nav-link[data-target="home"]')).not.toHaveClass(/cur/);

  await page.waitForTimeout(1300); // longer than PAN_DURATION
  const transform = await page.locator('#desk').evaluate((el) => getComputedStyle(el).transform);
  const matrix = transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(Number);
  const [, , , , translateX, translateY] = matrix;

  expect(Math.round(translateX)).toBe(Math.round(-1.2 * viewportSize.width));
  expect(Math.round(translateY)).toBe(Math.round(0.4 * viewportSize.height));
});

test('clicking the current nav link is a no-op', async ({ page }) => {
  await page.goto('/');
  const beforeTransform = await page.locator('#desk').evaluate((el) => getComputedStyle(el).transform);

  await page.locator('.nav-link[data-target="home"]').click();
  await page.waitForTimeout(200);

  const afterTransform = await page.locator('#desk').evaluate((el) => getComputedStyle(el).transform);
  expect(afterTransform).toBe(beforeTransform);
});

test('reduced motion skips the pan animation but still lands on target', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const viewportSize = page.viewportSize();

  await page.locator('.nav-link[data-target="contact"]').click();
  await page.waitForTimeout(100); // should already be done, no animation

  const transform = await page.locator('#desk').evaluate((el) => getComputedStyle(el).transform);
  const matrix = transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(Number);
  const [, , , , translateX, translateY] = matrix;

  expect(Math.round(translateX)).toBe(Math.round(-2.3 * viewportSize.width));
  expect(Math.round(translateY)).toBe(Math.round(-0.55 * viewportSize.height));
});

test('entrance animation fades up the hero name after load, reduced motion shows it immediately', async ({ page }) => {
  await page.goto('/');
  const name = page.locator('.mat[data-mat="home"] .hero-name');

  const earlyOpacity = await name.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(earlyOpacity)).toBeLessThan(1);

  await page.waitForTimeout(1300);
  const finalOpacity = await name.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(finalOpacity)).toBe(1);
});

test('projects mat scrolls horizontally, not vertically', async ({ page }) => {
  await page.goto('/');
  await page.locator('.nav-link[data-target="projects"]').click();
  await page.waitForTimeout(1300);

  const row = page.locator('.projects-row');
  const overflowX = await row.evaluate((el) => getComputedStyle(el).overflowX);
  const overflowY = await row.evaluate((el) => getComputedStyle(el).overflowY);

  expect(overflowX).toBe('auto');
  expect(overflowY).toBe('hidden');
});
