const express = require("express");
const { authenticateToken } = require("../middlewares/authentication");
const { getCategories } = require("../models/Category");
const router = express.Router();

router.get("/", authenticateToken, async function (req, res) {
  const categories = await getCategories();

  return res.json({
    categories,
  });
});

module.exports = router;
