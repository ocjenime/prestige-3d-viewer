const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const PORT = 4178;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      // Strip the base path prefix
      if (urlPath.startsWith('/prestige-3d-viewer/')) {
        urlPath = urlPath.replace('/prestige-3d-viewer/', '/');
      }
      if (urlPath === '/') urlPath = '/index.html';

      let filePath = path.join(distDir, urlPath);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html');
      }
      const ext = path.extname(filePath);
      const types = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
        '.ttf': 'font/ttf',
      };
      const contentType = types[ext] || 'application/octet-stream';
      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

(async () => {
  const server = await startServer();

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    console.log('Navigating to page...');
    await page.goto(`http://localhost:${PORT}/prestige-3d-viewer/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(5000);

    const title = await page.title();
    console.log(`Page title: "${title}"`);

    const canvasCount = await page.locator('canvas').count();
    console.log(`Canvas elements: ${canvasCount}`);

    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return !!gl;
    });
    console.log(`WebGL available: ${hasWebGL}`);

    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log(`Body text preview: ${bodyText.substring(0, 300)}`);

    await page.screenshot({ path: path.join(__dirname, 'screenshot.png'), fullPage: false });
    console.log('Screenshot saved');

    if (errors.length > 0) {
      console.log(`\nConsole errors (${errors.length}):`);
      errors.slice(0, 10).forEach(e => console.log(`  - ${e.substring(0, 300)}`));
    } else {
      console.log('\nNo console errors!');
    }

    const passed = canvasCount > 0;
    console.log(`\n${passed ? '✓ TEST PASSED' : '✗ ISSUES FOUND'}`);

  } catch (err) {
    console.error('Test error:', err.message);
  } finally {
    await browser.close();
    server.close();
  }
})();
