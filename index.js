const express = require("express");
const cors = require("cors");
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

db.sequelize.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("<---Rentify Server Connected: 3001--->");
  });
});
