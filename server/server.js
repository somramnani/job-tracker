const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const testRoute = require("./routes/test");

const app = express();

const corsOptions = {
  orgin: "*",
  credientals: true,
  optionSucessRate: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

module.exports = app;
