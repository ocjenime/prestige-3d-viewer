const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  let filePath = path.join(DIST, url === '/' ? 'index.html' : url);
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found: ' + url);
  }
});

(async () => {
  await new Promise(r => server.listen(4444, '127.0.0.1', r));
  console.log('Server running on port 4444');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const warnings = [];
  const consoleMessages = [];

  page.on('console', msg => {
    const entry = `[${msg.type()}] ${msg.text()}`;
    consoleMessages.push(entry);
    if (msg.type() === 'error') errors.push(entry);
    if (msg.type() === 'warning') warnings.push(entry);
  });

  page.on('pageerror', err => {
    errors.push(`[PAGE ERROR] ${err.message}`);
  });

  page.on('requestfailed', req => {
    errors.push(`[REQUEST FAILED] ${req.url()} - ${req.failure()?.errorText}`);
  });

  try {
    await page.goto('http://127.0.0.1:4444', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    errors.push(`[NAVIGATION] ${e.message}`);
  }

  await page.waitForTimeout(3000);

  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 2000));
  const rootChildren = await page.evaluate(() => document.getElementById('root')?.children.length || 0);
  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML.substring(0, 2000) || 'EMPTY');
  const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
  const pageTitle = await page.title();
  const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);

  await page.screenshot({ path: path.join(__dirname, 'test-screenshot.png'), fullPage: true });

  console.log('\n=== PAGE TITLE ===');
  console.log(pageTitle);
  console.log('\n=== ROOT CHILDREN ===');
  console.log(rootChildren);
  console.log('\n=== HAS CANVAS ===');
  console.log(hasCanvas);
  console.log('\n=== BACKGROUND COLOR ===');
  console.log(bgColor);
  console.log('\n=== ROOT HTML (first 2000 chars) ===');
  console.log(rootHTML);
  console.log('\n=== ERRORS (' + errors.length + ') ===');
  errors.forEach(e => console.log(e));
  console.log('\n=== WARNINGS (' + warnings.length + ') ===');
  warnings.forEach(w => console.log(w));
  console.log('\n=== ALL CONSOLE (' + consoleMessages.length + ') ===');
  consoleMessages.forEach(m => console.log(m));

  await browser.close();
  server.close();
})();
