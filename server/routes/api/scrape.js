const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "welcome to scraper",
  });
});

module.exports = router;
