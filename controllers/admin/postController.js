const express = require("express");
const { authenticateToken } = require("../../middlewares/authentication");
const { validate } = require("../../middlewares/validation");
const createPostSchema = require("../../validations/postPostSchema");
const updatePostSchema = require("../../validations/putPostSchema");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../../models/Post");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validate(createPostSchema),
  async function (req, res) {
    const { title, body, categoryId, status, label } = req.body;

    await createPost({
      title,
      body,
      categoryId,
      status,
      label,
    });

    return res.json({
      success: 1,
    });
  }
);

router.get("/", authenticateToken, async function (req, res) {
  const posts = await getPosts();

  return res.json({
    posts,
  });
});

router.delete("/:id", authenticateToken, async function (req, res) {
  const { id } = req.params;

  await deletePost(id);

  return res.json({
    success: 1,
  });
});

router.put(
  "/:id",
  authenticateToken,
  validate(updatePostSchema),
  async function (req, res) {
    const { id } = req.params;
    const { title, body, categoryId, status, label } = req.body;

    await updatePost({
      title,
      body,
      categoryId,
      status,
      label,
      id,
    });

    return res.json({
      success: 1,
    });
  }
);

module.exports = router;
