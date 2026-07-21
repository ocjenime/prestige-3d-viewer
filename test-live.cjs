const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const consoleMessages = [];

  page.on('console', msg => {
    const entry = `[${msg.type()}] ${msg.text()}`;
    consoleMessages.push(entry);
    if (msg.type() === 'error') errors.push(entry);
  });

  page.on('pageerror', err => {
    errors.push(`[PAGE ERROR] ${err.message}`);
  });

  page.on('requestfailed', req => {
    errors.push(`[REQUEST FAILED] ${req.url()} - ${req.failure()?.errorText}`);
  });

  console.log('Navigating to live site...');
  try {
    await page.goto('https://ocjenime.github.io/prestige-3d-viewer/', { 
      waitUntil: 'networkidle', 
      timeout: 20000 
    });
  } catch (e) {
    errors.push(`[NAVIGATION] ${e.message}`);
  }

  await page.waitForTimeout(4000);

  const rootChildren = await page.evaluate(() => document.getElementById('root')?.children.length || 0);
  const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 3000) || 'EMPTY');
  const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);

  await page.screenshot({ path: 'test-live-screenshot.png', fullPage: true });

  console.log('\n=== ROOT CHILDREN ===');
  console.log(rootChildren);
  console.log('\n=== HAS CANVAS ===');
  console.log(hasCanvas);
  console.log('\n=== BACKGROUND ===');
  console.log(bgColor);
  console.log('\n=== ROOT HTML ===');
  console.log(rootHTML);
  console.log('\n=== ERRORS (' + errors.length + ') ===');
  errors.forEach(e => console.log(e));
  console.log('\n=== ALL CONSOLE ===');
  consoleMessages.forEach(m => console.log(m));

  await browser.close();
})();
