const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");
const validUrl = require("valid-url");

router.get("/*", async (req, res) => {
  const url = req.params[0];

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  if (!validUrl.isWebUri(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const jobTitle = $("div.job__title h1").text().trim();

      res.json({
        message: "Scraped successfully",
        urlToScrape: url,
        jobTitle: jobTitle || "Job title not found",
      });
    })
    .catch((error) => {
      console.error("Error scraping:", error.message);
      res.status(500).json({ error: "Failed to scrape the URL" });
    });
});

module.exports = router;
