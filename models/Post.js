const db = require("../utils/db");

async function getPosts(type = "none", status = "none") {
  const conditions = [];

  if (type === "premium") {
    conditions.push("Label = 'Premium'");
  } else if (type === "normal") {
    conditions.push("Label = 'Normal'");
  }

  if (status === "draft") {
    conditions.push("Status = 'Draft'");
  } else if (status === "published") {
    conditions.push("Status = 'Published'");
  } else if (status === "pending") {
    conditions.push("Status = 'Pending Review'");
  }

  const result = await db.query(
    `SELECT * FROM Posts ${
      conditions.length ? "WHERE " + conditions.join(" AND ") : ""
    }`
  );

  return result;
}

async function createPost({ title, body, categoryId, status, label }) {
  await db.query(
    `INSERT INTO Posts 
    (Title, Body, CategoryID, Status, Label) VALUES 
    (?, ?, ?, ?, ?)`,
    [title, body, categoryId, status, label]
  );
}

async function updatePost({ id, title, body, categoryId, status, label }) {
  const inputs = [];
  const values = [];

  if (title) {
    inputs.push("Title = ?");
    values.push(title);
  }

  if (body) {
    inputs.push("Body = ?");
    values.push(body);
  }

  if (categoryId) {
    inputs.push("CategoryID = ?");
    values.push(categoryId);
  }

  if (status) {
    inputs.push("Status = ?");
    values.push(status);
  }

  if (label) {
    inputs.push("Label = ?");
    values.push(label);
  }

  await db.query(`UPDATE Posts SET ${inputs.join(",")} WHERE PostID = ?`, [
    ...values,
    id,
  ]);
}

async function deletePost(postId) {
  await db.query("DELETE FROM Posts WHERE PostID = ?", [postId]);
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
