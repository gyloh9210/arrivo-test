require("dotenv").config();
const express = require("express");
const config = require("./config");
const adminUserController = require("./controllers/admin/userController");
const adminController = require("./controllers/adminController");
const adminCategoryController = require("./controllers/admin/categoryController")
const adminPostController = require("./controllers/admin/postController")

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
