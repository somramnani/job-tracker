require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/", routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server ready on port ${PORT}.`);
  });
}

module.exports = app;
