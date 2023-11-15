const axios = require("axios");
const config = require("../config");

const instance = axios.create({
  baseURL: config.billplz.api,
  timeout: 5000,
  headers: { Authorization: `Basic ${config.billplz.secret}` },
});

const SUBSCRIPTION_BILL_COLLECTION = "yo0wxb8n";

const convertToCents = (amount) => amount * 100;

const createBill = async ({ amount, email, name }) => {
  try {
    const response = await instance.post("/bills", {
      collection_id: SUBSCRIPTION_BILL_COLLECTION,
      description: "Account upgrade payment",
      email,
      name,
      amount: convertToCents(amount),
      callback_url: config.billplz.callback,
    });

    return response.data;
  } catch (err) {
    console.error("[createBill] failed to create", err);

    return undefined;
  }
};

module.exports = {
  createBill,
};
