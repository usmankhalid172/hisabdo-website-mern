export default async function run(page, ui) {
  // scroll through page to trigger reveals
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal:not(.reveal-visible)')].length
  );
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'hisabdo-home-scrolled.png', fullPage: true });
  const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  // FAQ interaction
  const faqBtn = page.locator('.faq-item summary').first();
  await faqBtn.click();
  await page.waitForTimeout(400);
  const faqOpen = await page.evaluate(() => document.querySelector('.faq-item').open);
  const revealVisible = await page.evaluate(() => document.querySelectorAll('.reveal.reveal-visible').length);
  const revealTotal = await page.evaluate(() => document.querySelectorAll('.reveal').length);
  return { hiddenBeforeFullScroll: hidden, revealVisible, revealTotal, overflowX, faqOpen };
}
