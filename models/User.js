const db = require("../utils/db");

async function getUsers() {
  const result = await db.query(
    `SELECT UserID, Username, Email, Fullname, Membership, Admin, CreatedAt FROM Users`
  );

  return result;
}

async function findUser(email) {
  const result = await db.query(`SELECT * FROM Users WHERE Email = ? AND Admin = 0`, [email]);

  if (result.length > 0) {
    return result[0];
  }

  return undefined;
}

async function findAdmin(email) {
  const result = await db.query(`SELECT * FROM Users WHERE Email = ? AND Admin = 1`, [email]);

  if (result.length > 0) {
    return result[0];
  }
  
  return undefined;
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

async function updateUser({
  hashedPassword = null,
  email = null,
  name = null,
  membership = null,
  username = null,
  id
}) {
  const inputs = [];
  const values = [];

  if (hashedPassword) {
    inputs.push("Password = ?");
    values.push(hashedPassword);
  }

  if (email) {
    inputs.push("Email = ?");
    values.push(email);
  }

  if (name) {
    inputs.push("Fullname = ?");
    values.push(name);
  }

  if (membership) {
    inputs.push("Membership = ?");
    values.push(membership);
  }

  if (username) {
    inputs.push("Username = ?");
    values.push(username);
  }

  await db.query(`UPDATE Users SET ${inputs.join(",")} WHERE UserID = ?`, [
    ...values,
    id,
  ]);
}

async function deleteUser(id) {
  await db.query("DELETE FROM Users WHERE UserID = ?", [id]);
}

module.exports = {
  getUsers,
  createUser,
  findUser,
  deleteUser,
  updateUser,
  findAdmin
};
