const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(results);
  });
});

module.exports = router;
