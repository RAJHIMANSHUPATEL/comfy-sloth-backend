const express = require("express");
const { addProduct, getProducts } = require("../controller/productController");

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/", getProducts);

module.exports = router;