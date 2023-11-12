const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessToken({ username, email, admin, membership }) {
  return jwt.sign({ username, email, admin, membership }, config.jwt.secret, {
    expiresIn: "7d",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (err) {
    return undefined;
  }
}

module.exports = {
  generateAccessToken,
  verifyToken,
};
