const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.goto("https://portfolio-brady.vercel.app", {
    waitUntil: "networkidle0"
  });

  // Désactiver toutes les animations
  await page.addStyleTag({
    content: `
      * {
        animation: none !important;
        transition: none !important;
      }
      .reveal {
        opacity: 1 !important;
        transform: none !important;
      }
      .cursor,
      .cursor-follower,
      .lightbox,
      .gallery-filters,
      nav {
        display: none !important;
      }
    `
  });

  // Attendre que tout soit stable
  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.pdf({
    path: "Bradley-Goma-Portfolio.pdf",
    format: "A4",
    printBackground: true,
    fullPage: true
  });

  await browser.close();
  console.log("PDF généré correctement !");
})();