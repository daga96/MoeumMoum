const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const router = require("./routes");
const mongo = require("./config/mongo");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "100mb" }));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
