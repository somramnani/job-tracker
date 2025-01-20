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
      $("meta[property='og:title']").attr("content") || // Open Graph
      $("span[itemprop='title']").text().trim() || // Schema.org
      $("div.job-title").text().trim(); // Fallback for custom divs

    const companyName =
      $("meta[property='og:site_name']").attr("content") || // Open Graph site name
      $("span[itemprop='hiringOrganization']").text().trim() || // Schema.org
      $("div.company-name").text().trim() || // Fallback for custom divs
      $("a.employer-name").text().trim(); // Another common structure

    res.json({
      message: "Scraped successfully",
      urlToScrape: url,
      jobTitle: jobTitle || "Job title not found",
      companyName: companyName || "Company name not found",
    });
  } catch (error) {
    console.error("Error scraping:", error.message);
    res.status(500).json({ error: "Failed to scrape the URL" });
  }
});

module.exports = router;
