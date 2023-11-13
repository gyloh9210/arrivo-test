const express = require("express");
const { authenticateToken } = require("../../middlewares/authentication");
const { validate } = require("../../middlewares/validation");
const user = require("../../models/User");
const { hashPassword } = require("../../utils/crypto");
const createUserSchema = require("../../validations/postUserSchema");
const updateUserSchema = require("../../validations/putUserSchema");

const router = express.Router();

router.get("/", authenticateToken, async function (req, res, next) {
  res.json(await user.getUsers());
});

router.post(
  "/",
  authenticateToken,
  validate(createUserSchema),
  async function (req, res, next) {
    const { username, password, fullname, admin, membership, email } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
      await user.createUser({
        username,
        hashedPassword,
        email,
        name: fullname,
        admin: admin ?? 0,
        membership,
      });

      res.json({ success: 1 });
    } catch (err) {
      console.error(`Failed to create user`, err.message);
      next(err);
    }
  }
);

router.delete("/:id", authenticateToken, async function (req, res) {
  const { id } = req.params;

  await user.deleteUser(id);

  return res.json({
    success: 1,
  });
});

router.put(
  "/:id",
  authenticateToken,
  validate(updateUserSchema),
  async function (req, res) {
    const { id } = req.params;
    const { username, password, fullname, membership, email } = req.body;

    let hashedPassword = "";

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    await user.updateUser({
      hashedPassword,
      email,
      name: fullname,
      membership,
      username,
      id,
    });

    return res.json({
      success: 1,
    });
  }
);

module.exports = router;
