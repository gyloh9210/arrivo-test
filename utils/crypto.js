const bcrypt = require('bcryptjs');

const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 8);
};

const comparePassword = (rawPassword, hashedPassword) => {
  return bcrypt.compareSync(rawPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword
};
