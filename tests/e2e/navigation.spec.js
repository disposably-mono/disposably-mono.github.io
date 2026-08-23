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

test('returning home does not replay the hero entrance animation', async ({ page }) => {
  await page.goto('/');
  const name = page.locator('.mat[data-mat="home"] .hero-name');

  await page.waitForTimeout(1300);
  await page.locator('.nav-link[data-target="projects"]').click();
  await page.waitForTimeout(1300);
  await page.locator('.nav-link[data-target="home"]').click();
  await page.waitForTimeout(1300);

  const opacity = await name.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBe(1);
});

test('home hero uses a centered portrait hierarchy', async ({ page }) => {
  await page.goto('/');

  const hero = page.locator('.mat[data-mat="home"] .home-panels.home-portrait');

  await expect(hero).toHaveCount(1);
  expect(await hero.locator('.hero-identity').innerText()).toBe(
    "Mikel Taopa | Antipolo City, Rizal\nUPB '26-'30 - B.S. Management Economics",
  );
  await expect(hero.locator('.hero-name')).toHaveText(/Mono/);
  await expect(hero.locator('.hero-statement')).toHaveText(
    'I\'m a student based in the Philippines with the curiosity to ask the hard questions and the grit to persevere through hardship. Growing up here taught me two important lessons: 1. Life is never easy and 2. I am someone capable of great change. My blend of curiosity, intellect, resilience and upbringing make me someone who builds for the betterment of all.',
  );
  await expect(hero.locator('.hero-tagwrap')).toHaveText('One problem at a time');
  await expect(hero.locator('.hero-zone')).toHaveCount(0);
});

test('projects and contact content is visible before camera navigation', async ({ page }) => {
  await page.goto('/');

  const projectOpacity = await page.locator('.project-card').first().evaluate(
    (el) => getComputedStyle(el).opacity,
  );
  const contactOpacity = await page.locator('.contact-tablet').evaluate(
    (el) => getComputedStyle(el).opacity,
  );

  expect(Number(projectOpacity)).toBe(1);
  expect(Number(contactOpacity)).toBe(1);
});

test('mats render local non-interactive desk accessories', async ({ page }) => {
  await page.goto('/');

  const expected = {
    home: ['protractor', 'marker', 'scissors', 'highlighter'],
    projects: ['pen', 'pencil', 'eraser'],
    contact: ['wireless-mouse', 'calculator'],
  };

  for (const [matKey, names] of Object.entries(expected)) {
    const mat = page.locator(`.mat[data-mat="${matKey}"]`);
    const accessories = mat.locator('.mat-accessory');

    await expect(accessories).toHaveCount(names.length);

    for (const name of names) {
      const accessory = mat.locator(`.mat-accessory--${name}`);
      await expect(accessory).toHaveAttribute(
        'src',
        new RegExp(`^public/accessories/${name}\\.png$`),
      );
      await expect(accessory).toHaveAttribute('alt', '');
      await expect(accessory).toHaveAttribute('aria-hidden', 'true');
    }
  }
});

test('accessories use the cutting mat cell as their scale unit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const expectedCellCounts = {
    protractor: 9,
    marker: 9,
    pen: 11,
    pencil: 11,
    eraser: 6,
    scissors: 9,
    'wireless-mouse': 8,
    calculator: 10,
  };

  for (const [name, count] of Object.entries(expectedCellCounts)) {
    const accessory = page.locator(`.mat-accessory--${name}`);
    const cellSize = await accessory.evaluate(
      (el) => getComputedStyle(el.parentElement).getPropertyValue('--mat-cell'),
    );
    const width = await accessory.evaluate((el) => getComputedStyle(el).width);

    expect(Number.parseFloat(cellSize)).toBeGreaterThan(0);
    expect(Number.parseFloat(width)).toBeCloseTo(Number.parseFloat(cellSize) * count, 0);
  }
});

test('contact tablet renders an email CTA and social links', async ({ page }) => {
  await page.goto('/');

  const tablet = page.locator('.contact-tablet');
  await expect(tablet.locator('.contact-identity-name')).toHaveText('Mikel Taopa');
  await expect(tablet.getByRole('link', { name: 'Write to Mikel →' })).toHaveAttribute(
    'href',
    'mailto:mikel.taopa@gmail.com',
  );
  await expect(tablet.locator('.contact-icon-link')).toHaveCount(4);
});

test('camera stays aligned with the active mat after a window resize', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  await page.locator('.nav-link[data-target="contact"]').click();
  await page.waitForTimeout(1300); // longer than PAN_DURATION

  await page.setViewportSize({ width: 900, height: 600 });
  // Give the resize handler a tick to run.
  await page.waitForTimeout(100);

  const box = await page.locator('.mat[data-mat="contact"]').boundingBox();
  expect(Math.round(box.x)).toBe(0);
  expect(Math.round(box.y)).toBe(0);
});

test('reduced motion draw-line renders solid, not dotted', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const line = page.locator('.mat[data-mat="home"] .draw-line');
  const dasharray = await line.evaluate((el) => getComputedStyle(el).strokeDasharray);

  expect(dasharray).not.toBe('1px');
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

test('mobile layout hides desk accessories and keeps the fixed nav usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const accessories = page.locator('.mat-accessory');
  await expect(accessories).toHaveCount(9);
  const visibleAccessories = await accessories.evaluateAll((items) => {
    return items.filter((item) => getComputedStyle(item).display !== 'none').length;
  });

  expect(visibleAccessories).toBe(0);
  const navBox = await page.locator('#nav').boundingBox();
  expect(navBox.y + navBox.height).toBeGreaterThan(844 - 80);
  await expect(page.locator('.nav-link').first()).toHaveCSS('min-height', '44px');
});

test('mobile projects keep the sheet clear of the fixed navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.nav-link[data-target="projects"]').click();
  await page.waitForTimeout(1300);

  const navBox = await page.locator('#nav').boundingBox();
  const sheet = page.locator('.project-sheet').first();
  const sheetBox = await sheet.boundingBox();

  expect(navBox).not.toBeNull();
  expect(sheetBox).not.toBeNull();
  expect(sheetBox.y + sheetBox.height).toBeLessThanOrEqual(navBox.y + 8);
  expect(sheetBox.y).toBeGreaterThanOrEqual(0);
  await expect(sheet).toHaveCSS('overflow-y', 'auto');
});

test('short landscape screens keep controls clear and content in view', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/');

  const visibleAccessories = await page.locator('.mat-accessory').evaluateAll((items) => {
    return items.filter((item) => getComputedStyle(item).display !== 'none').length;
  });

  expect(visibleAccessories).toBe(0);
  await expect(page.locator('.nav-link').first()).toHaveCSS('min-height', '44px');

  const tagBox = await page.locator('.hero-tagwrap').boundingBox();
  expect(tagBox).not.toBeNull();
  expect(tagBox.y + tagBox.height).toBeLessThanOrEqual(390);
});
