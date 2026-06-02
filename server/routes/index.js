const express = require("express");
const router = express.Router();
const scrapeRoute = require("./api/scrape");
const usersRoute = require("./api/users");
const saveUserRoute = require("./api/saveUser");

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Job-tracker's backend",
    documentation: "",
    author: "Som Ramnani",
  });
});

router.use("/api/scrape", scrapeRoute);
router.use("/api/users", usersRoute);
router.use("/api/save-user", saveUserRoute);

module.exports = router;
