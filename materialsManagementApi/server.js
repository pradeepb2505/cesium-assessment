const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(8000, () => {
  console.log("Server is running.");
});

const index = require("./routes/index.js");
const materialsRoutes = require("./routes/materialsRoutes.js");

app.use("/", index);
app.use("/materials", materialsRoutes);

app.use(require("./libs/error.js"));

module.exports = app;
