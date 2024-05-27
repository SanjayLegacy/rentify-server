const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const helmet = require("helmet");

app.use(express.json());
app.use(cors());
app.use(helmet());

const db = require("./models");

const authRouter = require("./routes/authRoutes");
app.use("/auth", authRouter);

const propertyRouter = require("./routes/propertyRoutes");
app.use("/property", propertyRouter);

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("<---Rentify Server Connected--->");
  });
});
