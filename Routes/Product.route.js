const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/Product.controller");

router.get("/", ProductController.getAllProducts);

//Products Post
router.post("/", ProductController.postProduct);

//Product Get By id
router.get(`/:id`, ProductController.getProductById);

//Product Patch By id
router.patch("/:id", ProductController.updateProduct);

//Product delete By id
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
