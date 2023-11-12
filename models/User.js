const db = require("../utils/db");

async function getUsers() {
  const result = await db.query(`SELECT * FROM Users`);

  return result;
}

async function findUser(email) {
  const result = await db.query(`SELECT * FROM Users WHERE email = ?`, [email]);

  if (result.length > 0) {
    return result[0];
  }
}

async function createUser({
  username,
  hashedPassword,
  email,
  name,
  membership = "normal",
  admin = false,
}) {
  const result = await db.query(
    `INSERT INTO Users (Username, Password, Email, Fullname, Membership, Admin)
        VALUES
        (?, ?, ?, ?, ?, ?)`,
    [username, hashedPassword, email, name, membership, admin]
  );

  return result;
}

module.exports = {
  getUsers,
  createUser,
  findUser,
};
