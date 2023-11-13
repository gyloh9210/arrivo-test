const yup = require("yup");

const createPostSchema = yup.object({
  title: yup.string().required(),
  body: yup.string().required(),
  categoryId: yup.number().required(),
  status: yup
    .string()
    .oneOf(["Draft", "Published", "Pending Review"])
    .required(),
  label: yup.string().oneOf(["Normal", "Premium"]).required(),
});

module.exports = createPostSchema;
