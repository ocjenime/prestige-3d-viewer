const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const url = process.argv[2];
  const out = process.argv[3];
  const width = parseInt(process.argv[4] || '1440', 10);
  const height = parseInt(process.argv[5] || '900', 10);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.resolve(__dirname, '..', 'arilux-nekretnine', out) });
  await browser.close();
  console.log('saved', out);
})();
