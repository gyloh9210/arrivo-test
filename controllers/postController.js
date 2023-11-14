const express = require("express");
const { authenticateToken } = require("../middlewares/authentication");
const { getPosts } = require("../models/Post");
const router = express.Router();

router.get("/", authenticateToken, async function (req, res) {
  const type = req.user.membership === "Normal" ? "normal" : "premium";
  const posts = await getPosts(type, "published");

  return res.json({
    posts,
  });
});

module.exports = router;
