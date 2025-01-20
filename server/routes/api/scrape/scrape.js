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

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const jobTitle =
      $("meta[property='og:title']").attr("content") ||
      $("span[itemprop='title']").text().trim() ||
      $("div.job-title").text().trim();

    const companyName =
      $("meta[property='og:site_name']").attr("content") ||
      $("span[itemprop='hiringOrganization']").text().trim() ||
      $("div.company-name").text().trim() ||
      $("a.employer-name").text().trim();

    res.json({
      message: "Scraped successfully",
      urlToScrape: url,
      jobTitle: jobTitle || "Job title not found",
      companyName: companyName,
    });
  } catch (error) {
    console.error("Error scraping:", error.message);
    res.status(500).json({ error: "Failed to scrape the URL" });
  }
});

module.exports = router;
