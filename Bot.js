const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certificate-errors',
  '--ignore-certificate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
];

const puppeteer = require('puppeteer');

const product_url =
  'https://www.walmart.com/ip/Lavalier-Clip-on-Lapel-Omnidirectional-Condenser-Microphone-For-SmartPhone/969327603?from=searchResults';

async function givePage() {
  const browser = await puppeteer.launch({
    headless: false,
    args: args,
  });
  const page = await browser.newPage();
  return page;
}

async function addToCart(page) {
  await page.goto(product_url);
}

async function checkout() {
  let page = await givePage();
  await addToCart(page);
}
checkout();
