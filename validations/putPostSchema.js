const yup = require("yup");

const updatePostSchema = yup.object({
  title: yup.string().optional(),
  body: yup.string().optional(),
  categoryId: yup.number().optional(),
  status: yup
    .string()
    .oneOf(["Draft", "Published", "Pending Review"])
    .optional(),
  label: yup.string().oneOf(["Normal", "Premium"]).optional(),
});

module.exports = updatePostSchema;
