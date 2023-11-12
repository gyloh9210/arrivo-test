const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const { comparePassword } = require("../utils/crypto");
const { generateAccessToken } = require("../utils/jwt");

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;

  const user = await UserModel.findUser(email);

  const isPasswordCorrect = await comparePassword(password, user.Password);

  if (isPasswordCorrect) {
    const token = generateAccessToken({
      username: user.Username,
      email: user.Email,
      admin: user.Admin,
      membership: user.Membership
    });

    return res.json({ token });
  }

  return res.status(401).json({
    message: "Invalid credential"
  });
});

module.exports = router;
