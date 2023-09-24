const SignUpUsers = require(`../Models/SignUp.model`);
const mongoose = require("mongoose");
const createError = require("http-errors");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await SignUpUsers.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const results = await SignUpUsers.findById(id);
      if (!results) {
        throw createError(404, "User Not Found");
      }
      console.log(results);
      res.send(results);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const update = req.body;
      const options = { new: true };
      const results = await SignUpUsers.findByIdAndUpdate(id, update, options);
      if (!results) {
        throw createError(404, "User Id does not exist.");
      }
      res.send("Updated");
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const results = await SignUpUsers.findByIdAndDelete(id);
      if (!results) {
        throw createError(404, "User Does not exist.");
      }
      res.send("Deleted");
      console.log(results);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    }
  },
  postUser: async (req, res, next) => {
    try {
      const user = new SignUpUsers(req.body);
      console.log(user);
      const userExist = await SignUpUsers.findOne(
        { email: user.email },
        { phone: user.phone }
      );
      if (!userExist) {
        const result = await user.save();
        res.send("User Created");
      }
      throw createError(409, "User already exists.");
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
      }
      next(error);
    }
  },
};
