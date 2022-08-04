const express = require("express");
const mongoose = require("mongoose");
const api = require("./route/api");
const app = express();
const PORT = 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", api);

mongoose.connect("mongodb://localhost/expense", { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log("Server start listining on port " + PORT);
});
