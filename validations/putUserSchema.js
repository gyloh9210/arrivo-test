const yup = require("yup");

const updateUserSchema = yup.object({
  username: yup.string().optional(),
  password: yup.string().optional(),
  email: yup.string().email().optional(),
  fullname: yup.string().optional(),
  membership: yup.string().oneOf(["Normal", "Premium"]),
});

module.exports = updateUserSchema;
