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

const port = process.env.PORT || 4000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

module.exports = app;
