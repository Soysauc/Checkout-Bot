const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certificate-errors',
  '--ignore-certificate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
];

const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const product_url =
  'https://creations.mattel.com/pages/hot-wheels-collectors-membership';
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

  await page.waitForSelector(
    'a[class="button button--primary hero-banner-add-to-cart submit-add-to-cart white-bg-cta"]'
  );
  await page.click(
    'a[class="button button--primary hero-banner-add-to-cart submit-add-to-cart white-bg-cta"]'
  );
  //   await page.waitForNavigation();
  await page.waitForSelector('label[ class="accept-terms-conditions_label"]');
  await page.click('label[ class="accept-terms-conditions_label"]');

  await page.waitForSelector(
    'button[class="cart__checkout-button button button--primary black-bg-cta"]'
  );
  await page.click(
    'button[class="cart__checkout-button button button--primary black-bg-cta"]'
  );
}

async function checkout() {
  var page = await givePage();
  await addToCart(page);
}
checkout();
