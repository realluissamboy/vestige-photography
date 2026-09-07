import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Use an installed Playwright package or the desktop runtime's module path.
const playwright = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.TEST_BROWSER || 'chromium';
const browser = await playwright[engine].launch({ headless: true, ...(engine === 'chromium' ? { channel: process.env.CHROME_CHANNEL || 'chrome' } : {}) });
const base = process.env.TEST_URL || 'http://127.0.0.1:5180';
const output = process.env.TEST_OUTPUT || '/tmp/vestige-responsive-review';
await mkdir(output, { recursive: true });
const viewports = [
  ['desktop', 1440, 900], ['tablet', 1024, 1366],
  ['phone', 390, 844], ['small-phone', 320, 568], ['landscape', 844, 390],
];
const titles = ['Modern Pin-Up', 'Modern Glamour', 'Modern Burlesque', 'Modern Tiki', 'Modern Kulture'];
const pause = page => page.waitForTimeout(600);
let failures = 0;

for (const [name, width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width <= 900, hasTouch: width <= 900 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  // No inquiry can leave this regression test, even if booking is implemented later.
  await page.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
  try {
    await page.goto(base);
    await page.locator('#homepage-cover').waitFor();
    await pause(page);
    await page.screenshot({ path: `${output}/${engine}-${name}-home.png` });
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://susanavestige.com/');
    assert.equal(await page.locator('link[rel="preload"][as="image"]').getAttribute('imagesizes'), await page.locator('#homepage-cover img').getAttribute('sizes'));
    assert.ok(!(await page.content()).includes('vestigefineart.com'));
    assert.equal(await page.locator('.home-navigation').count(), 0);
    const scrollTarget = Math.round(height * 0.45);
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollTarget);
    await pause(page);
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - scrollTarget) <= 2, 'Homepage snapped away from the requested position');
    assert.ok(await page.locator('.discipline-section').evaluateAll(elements => elements.every(el => getComputedStyle(el).position === 'relative')));
    assert.ok(await page.locator('.discipline-bg-wrapper').evaluateAll(elements => elements.every(el => {
      const section = el.closest('.discipline-section').getBoundingClientRect();
      const image = el.getBoundingClientRect();
      return getComputedStyle(el).transform === 'none' && Math.abs(image.top - section.top) < 1 && Math.abs(image.height - section.height) < 1;
    })), 'Background shifted independently from its section');
    await page.screenshot({ path: `${output}/${engine}-${name}-scroll.png` });
    const trigger = page.getByRole('button', { name: 'View Modern Pin-Up Portfolio', exact: true });
    await trigger.scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => scrollY);
    if (width <= 900) await trigger.tap();
    else await trigger.click();
    await pause(page);
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Back to Homepage');
    assert.equal(await page.locator('.home-navigation').count(), 0);
    await page.keyboard.press('Shift+Tab');
    assert.ok(await page.evaluate(() => !!document.activeElement?.closest('.portfolio-content')));
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Back to Homepage');

    const firstPhoto = page.getByRole('button', { name: /View photo .* in full size/ }).first();
    const firstName = await firstPhoto.getAttribute('aria-label');
    await firstPhoto.click();
    await page.getByRole('button', { name: 'Close lightbox' }).waitFor();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.gallery-lightbox').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), firstName);
    assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
    const top = await page.evaluate(() => document.body.style.top);
    if (engine === 'webkit' && width <= 900) {
      // Playwright mobile WebKit has no wheel API; exercise root scroll directly.
      await page.evaluate(() => window.scrollBy(0, 400));
    } else {
      await page.mouse.move(width / 2, height / 2);
      await page.mouse.wheel(0, 400);
    }
    await page.waitForTimeout(150);
    assert.equal(await page.evaluate(() => document.body.style.top), top);
    await page.keyboard.press('Escape');
    await pause(page);
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'View Modern Pin-Up Portfolio');
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - before) <= 2, 'Homepage scroll position changed');
    await trigger.click();
    await pause(page);

    for (let index = 0; index < titles.length; index++) {
      assert.equal(await page.locator('.portfolio-content h2').innerText(), titles[index]);
      assert.equal(await page.locator('.category-photo-grid').evaluate(el => el.scrollTop), 0);
      const controlsFit = await page.locator('.portfolio-content header button').evaluateAll(elements => elements.every(el => {
        const rect = el.getBoundingClientRect();
        return rect.x >= 0 && rect.right <= innerWidth && rect.height >= 44;
      }));
      assert.ok(controlsFit, 'Gallery controls clipped or too small');
      const grid = page.locator('.category-photo-grid');
      const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
      if (width <= 900) assert.equal(columns, width > height ? 3 : 2);
      await page.screenshot({ path: `${output}/${engine}-${name}-collection-${index}.png` });
      await grid.evaluate(el => { el.scrollTop = el.scrollHeight; });
      const lastPhoto = page.getByRole('button', { name: /View photo .* in full size/ }).last();
      await lastPhoto.click();
      const lightbox = page.locator('.gallery-lightbox img');
      await lightbox.evaluate(img => img.decode());
      await page.screenshot({ path: `${output}/${engine}-${name}-lightbox.png` });
      await page.getByRole('button', { name: 'Close lightbox' }).click();
      assert.ok(await grid.locator('img').evaluateAll(images => images.every(img => !img.complete || img.naturalWidth > 0)), 'Broken gallery image');
      await page.getByRole('button', { name: index === 4 ? 'About Susana Andrea' : /View next collection:/ }).click();
      await pause(page);
    }
    await page.waitForFunction(() => Math.abs(document.getElementById('about-susana').getBoundingClientRect().top) < 2);
    assert.equal(await page.locator('.portfolio-content').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'about-susana');
    await page.screenshot({ path: `${output}/${engine}-${name}-about.png` });
    await page.getByRole('button', { name: 'Book a Session', exact: true }).click();
    await page.getByRole('button', { name: 'Close booking modal' }).waitFor();
    await pause(page);
    await page.screenshot({ path: `${output}/${engine}-${name}-booking.png` });
    await page.getByRole('button', { name: 'Close booking modal' }).click();
    assert.equal(await page.locator('#booking-name').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
    assert.deepEqual(errors, []);
    console.log(`PASS ${engine} ${name}: all collections, overlays, controls, images, navigation, booking open/close`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${engine} ${name}: ${error.stack}`);
    await page.screenshot({ path: `${output}/${engine}-${name}-failure.png` });
  } finally { await page.close(); }
}

const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
try {
  await page.goto(base);
  await page.getByRole('button', { name: 'View Modern Pin-Up Portfolio', exact: true }).click();
  await pause(page);
  assert.equal(await page.locator('.portfolio-slide-over-takeover').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.setViewportSize({ width: 844, height: 390 });
  await pause(page);
  assert.equal(await page.locator('.category-photo-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), 3);
  await page.getByRole('button', { name: /View next collection:/ }).click();
  assert.equal(await page.locator('.portfolio-content h2').innerText(), 'Modern Glamour');
  await page.getByRole('button', { name: 'Back to Homepage' }).click();
  await pause(page);
  assert.equal(await page.locator('.portfolio-content').count(), 0);
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto');
  console.log(`PASS ${engine} reduced motion and orientation change`);
} catch (error) { failures++; console.error(error.stack); }
await page.close();
await browser.close();
if (failures) process.exitCode = 1;
