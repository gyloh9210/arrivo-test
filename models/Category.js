const db = require("../utils/db");

async function getCategories() {
  const result = await db.query("SELECT * FROM Categories");

  return result;
}

async function createCategory({ name, description }) {
  const result = await db.query(
    `INSERT INTO Categories (Name, Description, Activated) 
    VALUES 
    (?, ?, 1)`,
    [name, description]
  );

  return result;
}

async function deleteCategory(id) {
  await db.query("DELETE FROM Categories WHERE CategoryID = ?", [id]);
}

async function updateCategory({ id, name = null, description = null }) {
  const inputs = [];
  const values = [];

  if (name) {
    inputs.push("Name = ?");
    values.push(name);
  }

  if (description) {
    inputs.push("Description = ?");
    values.push(description);
  }

  await db.query(
    `UPDATE Categories SET ${inputs.join(",")} WHERE CategoryId = ?`,
    [...values, id]
  );
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
