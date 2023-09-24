const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchmena = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const Product = mongoose.model("product", ProductSchmena);
module.exports = Product;
