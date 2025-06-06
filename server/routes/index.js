const express = require("express");
const router = express.Router();
const scrapeRoute = require("./api/scrape");
const usersRoute = require("./api/users");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Job-tracker's backend",
    documentation: "",
    author: "Som Ramnani",
  });
});

router.use("/api/scrape", scrapeRoute);
router.use("/api/users", usersRoute);

module.exports = router;
