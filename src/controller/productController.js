const Product = require("../model/product.model");
const User = require("../model/user.model");

// comment

// Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            image,
            colors,
            company,
            description,
            category,
            shipping,
        } = req.body;

        // check for missing parameters
        if (
            !name ||
            !price ||
            !image ||
            !company ||
            !description ||
            !category
        ) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        const product = new Product({
            name,
            price,
            image,
            colors,
            company,
            description,
            category,
            shipping,
        });
        await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.log(error);
    }
};

// Get all Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // fetch all products
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// get product by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const product = await Product.findById(id);
        console.log(product);
        res.status(200).json({
            message: "Prodcut fetched successfully",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
};
