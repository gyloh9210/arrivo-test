const yup = require("yup");

const createUserSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  fullname: yup.string().required(),
  admin: yup.boolean().optional(),
  membership: yup.string().oneOf(["Normal", "Premium"]),
});

module.exports = createUserSchema;
