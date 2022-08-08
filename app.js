// essential setup
require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");

// database
const connectDB = require("./db/connect");

//  middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("E-commerece API");
});

// custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
