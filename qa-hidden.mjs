export default async function run(page, ui) {
  // scroll slowly to bottom so every reveal triggers
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(2000);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal:not(.reveal-visible)')].map(el => {
      const r = el.getBoundingClientRect();
      return (el.querySelector('h2,h3')?.textContent || el.textContent.slice(0, 40)) + ' | top=' + Math.round(r.top + window.scrollY);
    })
  );
  const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  return { hiddenCount: hidden.length, hidden: hidden.slice(0, 20), overflowX };
}
