const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const target = process.argv[2] || 'index.html';
  const outDir = path.resolve(__dirname, '..', 'arilux-nekretnine');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'arilux-nekretnine', target).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const sections = ['#zgrade', '.band', '#stanovi', '#predgradnja', '#onama', '#kontakt', '.footer'];
  for (const sel of sections) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const name = 'sec-' + sel.replace(/[#.]/g, '') + '.png';
    await el.screenshot({ path: path.join(outDir, name) });
    console.log('saved', name);
  }
  await browser.close();
})();
