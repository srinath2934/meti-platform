const puppeteer = require('puppeteer');
const { smartuiSnapshot } = require('@lambdatest/puppeteer-driver');

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

  for (const item of urls) {
    try {
      console.log(`Navigating to ${item.name} (${item.url})...`);
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2500)); // wait for animations
      
      // Use LambdaTest SmartUI to take a visual snapshot
      await smartuiSnapshot(page, item.name);
      console.log(`Captured SmartUI snapshot for ${item.name}`);
    } catch (e) {
      console.error(`Failed to capture ${item.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('All SmartUI screenshots captured successfully.');
})();
