const puppeteer = require('puppeteer');

const product_url =
  'https://www.walmart.com/ip/Lavalier-Clip-on-Lapel-Omnidirectional-Condenser-Microphone-For-SmartPhone/969327603?from=searchResults';

async function createPage() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(product_url);
  console.log('done');
}
createPage();
