const express = require("express");
const { updatePayment } = require("../models/Payment");
const { updateUser } = require("../models/User");
const router = express.Router();

router.post("/", async function (req, res) {
  console.log('body', req.body);

  const { id, state, paid } = req.body;

  if (paid === 'false') {
    console.error("payment error");

    return res.json({
      success: 1
    })
  }

  const payment = await updatePayment({
    id,
    status: state,
  });

  await updateUser({
    id: payment.UserID,
    membership: 'Premium'
  })

  return res.json({
    success: 1,
  });
});

module.exports = router;
