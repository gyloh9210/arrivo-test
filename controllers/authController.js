const express = require("express");
const { validate } = require("../middlewares/validation");
const postLoginSchema = require("../validations/postLoginSchema");
const UserModel = require("../models/User");
const { comparePassword } = require("../utils/crypto");
const { generateAccessToken } = require("../utils/jwt");

const router = express.Router();

router.post("/login", validate(postLoginSchema), async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findUser(email);

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordCorrect = await comparePassword(password, user.Password);

  if (isPasswordCorrect) {
    const token = generateAccessToken({
      username: user.Username,
      email: user.Email,
      admin: user.Admin,
      membership: user.Membership,
      userId: user.UserID
    });

    return res.json({ token });
  }

  return res.status(401).json({
    message: "Invalid credential",
  });
});

module.exports = router;
