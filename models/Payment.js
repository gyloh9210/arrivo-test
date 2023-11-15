const db = require("../utils/db");

async function getPayments() {
  const result = await db.query(`SELECT * FROM Payments`);

  return result;
}

async function getPayment(id) {
  const result = await db.query(`SELECT * FROM Payments WHERE PaymentID = ?`, [id]);

  if (result.length > 0) {
    return result[0];
  }

  return undefined;
}

async function createPayment({ id, amount, method = "billplz", status, userId }) {
  await db.query(
    `INSERT INTO Payments 
   (PaymentID, Amount, PaymentMethod, Status, UserID)
   VALUES
   (?, ?, ?, ?, ?)`,
    [id, amount, method, status, userId]
  );

  return getPayment(id);
}

async function updatePayment({ id, status }) {
  await db.query(`UPDATE Payments SET Status = ?, UpdatedAt = NOW() WHERE PaymentID = ?`, [
    status,
    id,
  ]);

  return getPayment(id);
}

module.exports = {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
};
