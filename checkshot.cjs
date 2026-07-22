const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, '..', 'arilux-nekretnine');
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'arilux-nekretnine', 'index.html').replace(/\\/g, '/');
  const browser = await chromium.launch();

  // desktop: scroll to zgrade head + marquee
  let page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelector('#zgrade .section__head').scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(outDir, 'check-zgrade-head.png') });
  // hero stats: scroll a bit inside hero
  await page.evaluate(() => window.scrollTo(0, 260));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(outDir, 'check-hero-stats.png') });
  await page.close();

  // mobile
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(outDir, 'check-mobile-hero.png') });
  // mobile menu
  await page.tap('#burger');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, 'check-mobile-menu.png') });
  await page.tap('#burger');
  await page.waitForTimeout(400);
  // mobile finder
  await page.evaluate(() => document.querySelector('#stanovi').scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(outDir, 'check-mobile-finder.png') });
  await browser.close();
  console.log('done');
})();
