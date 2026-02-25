const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Si ton site est en ligne (Vercel)
  await page.goto("file://" + __dirname + "/index.html", {
  waitUntil: "networkidle0",
});

  // Si tu veux utiliser ton fichier local :
  // await page.goto("file://" + __dirname + "/index.html", { waitUntil: "networkidle0" });

  await page.pdf({
    path: "Bradley-Goma-Portfolio.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "15mm",
      bottom: "20mm",
      left: "15mm",
    },
  });

  await browser.close();
  console.log("PDF généré avec succès !");
})();