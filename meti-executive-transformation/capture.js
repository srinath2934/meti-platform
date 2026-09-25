const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  { name: 'Home', url: 'http://localhost:5173/' },
  { name: 'Candidate_Portal', url: 'http://localhost:5173/app' },
  { name: 'Evaluator_Portal', url: 'http://localhost:5173/evaluator' },
  { name: 'Admin_Portal', url: 'http://localhost:5173/admin' },
];

(async () => {
  const dir = './screenshots';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const item of urls) {
    try {
      console.log(`Navigating to ${item.name} (${item.url})...`);
      await page.goto(item.url, { waitUntil: 'networkidle0' });
      // Wait for any animations to finish
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: `${dir}/${item.name}.png`, fullPage: true });
      console.log(`Saved ${item.name}.png`);
    } catch (e) {
      console.error(`Failed to capture ${item.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
})();
