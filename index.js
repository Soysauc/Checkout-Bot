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
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.waitForSelector('label[ class="accept-terms-conditions_label"]');
  await page.click('label[ class="accept-terms-conditions_label"]');

  await page.waitForSelector(
    'button[class="cart__checkout-button button button--primary black-bg-cta"]'
  );
  await page.click(
    'button[class="cart__checkout-button button button--primary black-bg-cta"]'
  );
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

async function fillBilling(page) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.waitForSelector("input[id='checkout_email']");

  await page.type("input[id='checkout_email']", 'test154@gmail.com');
  await page.waitForTimeout(100);
  await page.type("input[id='checkout_billing_address_first_name']", 'John');
  await page.waitForTimeout(100);
  await page.type("input[id='checkout_billing_address_last_name']", 'Doe');
  await page.waitForTimeout(100);
  await page.type(
    "input[id='checkout_billing_address_address1']",
    '30419 Double Dr'
  );
  await page.waitForTimeout(100);
  await page.type("input[id='checkout_billing_address_city']", 'Wesley Chapel');
  await page.waitForTimeout(100);
  await page.select("select[id='checkout_billing_address_province']", 'FL');
  await page.waitForTimeout(100);
  await page.type("input[id='checkout_billing_address_zip']", '33544');
  await page.waitForSelector('button[ id="continue_button"]');
  await page.click('button[ id="continue_button"]');
}

async function checkout() {
  var page = await givePage();
  await addToCart(page);
  await fillBilling(page);
}
checkout();

// This stuff may be beneficial for the future
//   await page.waitForNavigation();
//   await page.hover(
//     'a[class="button button--primary hero-banner-add-to-cart submit-add-to-cart white-bg-cta"]'
//   );
