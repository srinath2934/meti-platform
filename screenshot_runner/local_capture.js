const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urls = [
  { name: '01_Landing_Post_Feedback', url: 'http://localhost:5173/' },
  { name: '02_Orientation_VideoExplainer_V01_V02', url: 'http://localhost:5173/video' },
  { name: '03_Candidate_Registration_Consent', url: 'http://localhost:5173/login' },
  { name: '04_Candidate_Profile_Evidence', url: 'http://localhost:5173/profile?parsed=true' },
  { name: '05_Checkout_Post_Feedback', url: 'http://localhost:5173/checkout' },
  { name: '06A_Candidate_Dashboard_Journey', url: 'http://localhost:5173/app' },
  { name: '06B_Candidate_Findings_Roadmap_P1_P8', url: 'http://localhost:5173/app?view=findings' },
  { name: '07_Assessment_Adaptive_Questions', url: 'http://localhost:5173/assessment?step=1' },
  { name: '08_Candidate_Workspace_Post_Feedback', url: 'http://localhost:5173/case' },
  { name: '09_Candidate_Video_Post_Feedback', url: 'http://localhost:5173/studio' },
  { name: '10_Evaluator_Portal_Post_Feedback', url: 'http://localhost:5173/evaluator' },
  { name: '11_Admin_Portal_Post_Feedback', url: 'http://localhost:5173/admin' }
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const primaryOutDir = path.join(__dirname, 'screenshots');
  const rootOutDir = path.join(__dirname, '..', 'screenshots');
  const artifactOutDir = 'C:\\Users\\SRINATH\\.gemini\\antigravity-ide\\brain\\f70288c6-75cf-4879-8145-fd77a97aaa59\\screenshots';

  for (const dir of [primaryOutDir, rootOutDir, artifactOutDir]) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Clear obsolete files from local screenshot directories so only clean official captures remain
  for (const dir of [primaryOutDir, rootOutDir]) {
    const existing = fs.readdirSync(dir);
    for (const file of existing) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isFile() && file.endsWith('.png')) {
        fs.unlinkSync(filePath);
      }
    }
    console.log(`Cleared local directory: ${dir}`);
  }

  for (const item of urls) {
    try {
      console.log(`Navigating to ${item.name} (${item.url})...`);
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2500));
      
      const file1 = path.join(primaryOutDir, `${item.name}.png`);
      const file2 = path.join(rootOutDir, `${item.name}.png`);
      const file3 = path.join(artifactOutDir, `${item.name}.png`);
      
      await page.screenshot({ path: file1, fullPage: true });
      fs.copyFileSync(file1, file2);
      fs.copyFileSync(file1, file3);
      
      console.log(`Saved screenshot to:`);
      console.log(` -> ${file1}`);
      console.log(` -> ${file2}`);
    } catch (e) {
      console.error(`Failed to capture ${item.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('All local capture screenshots completed.');
})();
