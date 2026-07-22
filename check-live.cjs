const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  const failed = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('requestfailed', (req) => failed.push(req.url() + ' -> ' + req.failure()?.errorText));

  await page.goto('https://ocjenime.github.io/prestige-3d-viewer/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Check if logo image loaded
  const logoInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map((img) => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0,
      w: img.offsetWidth,
      h: img.offsetHeight,
    }));
  });
  console.log('Logo images:', JSON.stringify(logoInfo, null, 2));
  console.log('Failed requests:', failed);
  console.log('Console errors:', errors);

  await page.screenshot({ path: 'live-screenshot.png' });
  await browser.close();
  console.log('Done');
})();
