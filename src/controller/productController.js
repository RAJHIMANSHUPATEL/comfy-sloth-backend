const Product = require("../model/product.model");

// // comment

// // Add Product
// const addProduct = async (req, res) => {
//     try {
//         const {
//             name,
//             price,
//             image,
//             colors,
//             company,
//             description,
//             category,
//             shipping,
//         } = req.body;

//         // check for missing parameters
//         if (
//             !name ||
//             !price ||
//             !image ||
//             !company ||
//             !description ||
//             !category
//         ) {
//             return res
//                 .status(400)
//                 .json({ message: "Please provide all required fields" });
//         }

//         const product = new Product({
//             name,
//             price,
//             image,
//             colors,
//             company,
//             description,
//             category,
//             shipping,
//         });
//         await product.save();

//         res.status(201).json({
//             message: "Product created successfully",
//             product,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//         console.log(error);
//     }
// };

// // Get all Products
// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.find(); // fetch all products
//         res.status(200).json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// // get product by id
// const getProductById = async (req, res) => {
//     try {
//         const { id } = req.query;

//         if (!id) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }
//         const product = await Product.findById(id);
//         console.log(product);
//         res.status(200).json({
//             message: "Prodcut fetched successfully",
//             data: product,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: "Server Error",
//         });
//     }
// };

// module.exports = {
//     addProduct,
//     getProducts,
//     getProductById,
// };

// Add products

const addProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            image,
            images,
            colors,
            company,
            description,
            category,
            shipping,
            stock,
            featured,
            reviews,
            stars,
        } = req.body;

        if (!name || !price || !company || !description || !category || !image) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const product = new Product({
            name,
            price,
            image,
            images,
            colors,
            company,
            description,
            category,
            shipping,
            stock,
            featured,
            reviews,
            stars,
        });

        await product.save();

        res.status(200).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const resProducts = products.map((p) => {
            return {
                _id: p._id,
                name: p.name,
                price: p.price,
                image: p.image,
                colors: p.colors,
                company: p.company,
                description: p.description,
                category: p.category,
                shipping: p.shipping,
                featured: p.featured
            };
        });

        res.status(200).json(resProducts);
        console.log(products);
    } catch (error) {
        res.status(400).json({ message: "Server Error" });
        console.log(error)
    }
};


// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Detailed response
        const formattedProduct = {
            _id: product._id,
            stock: product.stock,
            price: product.price,
            shipping: product.shipping,
            featured: product.featured,
            colors: product.colors,
            category: product.category,
            images: product.images,
            reviews: product.reviews,
            stars: product.stars,
            name: product.name,
            description: product.description,
            company: product.company,
        };

        res.status(200).json(formattedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
};
