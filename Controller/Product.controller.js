const Product = require(`../Models/Product.models`);
const mongoose = require("mongoose");
const createError = require("http-errors");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getProductById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const results = await Product.findById(id);
      if (!results) {
        throw createError(404, "Product Not Found");
      }
      console.log(results);
      res.send(results);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const update = req.body;
      const options = { new: true };
      const results = await Product.findByIdAndUpdate(id, update, options);
      if (!results) {
        throw createError(404, "Product Id does not exist.");
      }
      res.send("Updated");
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const results = await Product.findByIdAndDelete(id);
      if (!results) {
        throw createError(404, "Product Does not exist.");
      }
      res.send("Deleted");
      console.log(results);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
      }
      next(error);
    }
  },
};
