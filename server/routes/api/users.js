const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.json(err);
    return res.json({
      message: "Welcome to users route",
    });
  });
});

module.exports = router;
