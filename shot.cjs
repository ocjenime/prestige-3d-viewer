const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const target = process.argv[2] || 'index.html';
  const out = process.argv[3] || 'shot.png';
  const width = parseInt(process.argv[4] || '1440', 10);
  const height = parseInt(process.argv[5] || '900', 10);
  const fullPage = process.argv[6] === 'full';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'arilux-nekretnine', target).replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  if (fullPage) {
    // trigger all reveal animations by scrolling through the page
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.8;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 120);
          else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
        };
        step();
      });
    });
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.resolve(__dirname, '..', 'arilux-nekretnine', out), fullPage });
  await browser.close();
  console.log('saved', out);
})();
