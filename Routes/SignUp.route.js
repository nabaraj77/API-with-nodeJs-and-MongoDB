const express = require("express");
const router = express.Router();
const SignUpController = require("../Controller/SignUpUser.controller");

router.get("/", SignUpController.getAllUsers);

//User Post
router.post("/", SignUpController.postUser);

//User Get By id
router.get(`/:id`, SignUpController.getUserById);

//User Patch By id
router.patch("/:id", SignUpController.updateUser);

//User delete By id
router.delete("/:id", SignUpController.deleteUser);

module.exports = router;
