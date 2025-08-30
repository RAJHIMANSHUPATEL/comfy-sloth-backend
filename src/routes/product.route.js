const express = require("express");
const { addProduct, getProducts, getProductById } = require("../controller/productController");

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/", getProducts);
router.get("/single-product", getProductById);

module.exports = router;