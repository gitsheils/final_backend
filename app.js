const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

app.listen(3001, () => {
  console.log(`App listening at port 3001`);
});

mongoose.connect("mongodb://127.0.0.1:27017/finalproject");

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use("/", require("./routes/index"));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
