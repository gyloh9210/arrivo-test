const bcrypt = require('bcryptjs');

const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 8);
};

module.exports = {
  hashPassword,
};
