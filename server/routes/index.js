const express = require("express");
const router = express.Router();
const scrapeRoute = require("./api/scrape/scrape");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Job-tracker's backend",
    documentation: "",
    author: "Som Ramnani",
  });
});

router.use("/api/scrape", scrapeRoute);

module.exports = router;
