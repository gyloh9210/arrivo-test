const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { hashPassword } = require("../utils/crypto");

router.get("/", async function (req, res, next) {
  try {
    res.json(await user.getUsers());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

// for testing only
router.post("/", async function (req, res, next) {
  const { username, password, name, admin, membership, email } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    await user.createUser({
      username,
      hashedPassword,
      email,
      name,
      admin,
      membership,
    });

    res.json({ success: 1 });
  } catch (err) {
    console.error(`Failed to create user`, err.message);
    next(err);
  }
});

module.exports = router;
