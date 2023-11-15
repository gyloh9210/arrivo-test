const express = require("express");
const { authenticateToken } = require("../middlewares/authentication");
const { getPosts } = require("../models/Post");
const { findUser } = require("../models/User");
const router = express.Router();

router.get("/", authenticateToken, async function (req, res) {
  const { Membership } = await findUser(req.user.email);
  const posts = await getPosts(Membership.toLowerCase(), "published");

  return res.json({
    posts,
  });
});

module.exports = router;
