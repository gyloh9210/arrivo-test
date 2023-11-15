const express = require("express");
const { authenticateToken } = require("../middlewares/authentication");
const { findUser } = require("../models/User");
const { createBill } = require("../services/billplz");
const { createPayment } = require("../models/Payment");
const router = express.Router();

router.post("/upgrade", authenticateToken, async function (req, res) {
  const user = await findUser(req.user.email);

  if (user.Membership === "Premium") {
    return res.status(500).json({
      message: "This account is already a Premium user",
    });
  }

  const bill = await createBill({
    amount: 20,
    email: user.Email,
    name: user.FullName,
  });

  if (!bill) {
    return res.status(500).json({
      message: "Failed to make payment",
    });
  }

  const payment = await createPayment({
    id: bill.id,
    amount: parseInt(bill.amount)/100,
    status: bill.state,
    userId: user.UserID
  });

  return res.json({
    ...payment,
    payment_url: bill.url,
  });
});

module.exports = router;
