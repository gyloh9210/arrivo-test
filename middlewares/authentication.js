const { verifyToken } = require("../utils/jwt");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const user = verifyToken(token);

  if (user) {
    req.user = user;
    return next();
  }

  return res.sendStatus(403);
}

module.exports = {
  authenticateToken,
};
