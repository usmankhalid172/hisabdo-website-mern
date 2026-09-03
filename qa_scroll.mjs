export default async function run(page, ui) {
  // Scroll to bottom step by step, then back to top
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  return await page.evaluate(() => ({
    fadeups: document.querySelectorAll(".fade-up").length,
    visible: document.querySelectorAll(".fade-up.visible").length,
    docHeight: document.body.scrollHeight,
  }));
}
