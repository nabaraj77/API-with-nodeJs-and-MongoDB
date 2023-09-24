const express = require("express");

const app = express();
app.use(express.json());
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

//CONNECTING TO MONGODB calling the function
require("./initDB")();
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Product Section
const ProductRoute = require("./Routes/Product.route");
app.use("/products", ProductRoute);

//User Sign Up Section
const SignUpRoute = require("./Routes/SignUp.route");
app.use("/signUp", SignUpRoute);

//Handling other api requests that are not available
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port${PORT}`);
});
