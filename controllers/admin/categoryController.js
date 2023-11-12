const express = require("express");
const { authenticateToken } = require("../../middlewares/authentication");
const { validate } = require("../../middlewares/validation");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../../models/Category");
const createCategorySchema = require("../../validations/postCategorySchema");
const updateCategorySchema = require("../../validations/putCategorySchema");

const router = express.Router();

router.post(
  "/",
  validate(createCategorySchema),
  authenticateToken,
  async function (req, res) {
    const { name, description } = req.body;

    await createCategory({
      name,
      description,
    });

    return res.json({
      success: 1,
    });
  }
);

router.put(
  "/:id",
  validate(updateCategorySchema),
  authenticateToken,
  async function (req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    await updateCategory({
      id,
      name,
      description,
    });

    return res.json({
      success: 1,
    });
  }
);

router.delete("/:id", authenticateToken, async function (req, res) {
  const { id } = req.params;

  await deleteCategory(id);

  return res.json({
    success: 1,
  });
});

router.get("/", authenticateToken, async function (req, res) {
  const categories = await getCategories();

  return res.json({
    categories,
  });
});

module.exports = router;
