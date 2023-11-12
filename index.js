require('dotenv').config();
const express = require("express");
const config = require("./config");
const userController = require("./controllers/userController");

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

app.use("/user", userController);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});