require("dotenv").config();
const express = require("express");
const config = require("./config");
const adminUserController = require("./controllers/admin/userController");
const adminController = require("./controllers/adminController");
const adminCategoryController = require("./controllers/admin/categoryController");
const adminPostController = require("./controllers/admin/postController");

const authController = require("./controllers/authController");
const categoryController = require("./controllers/categoryController");
const postController = require("./controllers/postController");
const accountController = require("./controllers/accountController");

const webhookController = require("./controllers/billplzWebhook");

const app = express();
const port = config.server.port;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/admin", adminController);
app.use("/admin/user", adminUserController);
app.use("/admin/category", adminCategoryController);
app.use("/admin/post", adminPostController);

app.use("/auth", authController);
app.use("/category", categoryController);
app.use("/post", postController);
app.use("/account", accountController);

app.use("/webhook", webhookController);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
