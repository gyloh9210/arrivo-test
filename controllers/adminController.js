const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const { comparePassword } = require("../utils/crypto");
const { generateAccessToken } = require("../utils/jwt");
const { validate } = require("../middlewares/validation");
const postLoginSchema = require("../validations/postLoginSchema");

router.post(
  "/login",
  validate(postLoginSchema),
  async function (req, res, next) {
    const { email, password } = req.body;

    const user = await UserModel.findAdmin(email);

    const isPasswordCorrect = await comparePassword(password, user.Password);

    if (isPasswordCorrect) {
      const token = generateAccessToken({
        username: user.Username,
        email: user.Email,
        admin: user.Admin,
        userId: user.UserID
      });

      return res.json({ token });
    }

    return res.status(401).json({
      message: "Invalid credential",
    });
  }
);

module.exports = router;
