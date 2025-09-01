const express = require("express");
const productRouter = require("./routes/product.route")
const userRouter = require("./routes/user.route")
const app = express();
const port = 3000;
const cors = require("cors")
require("dotenv").config();
require("./config/conn")

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/api/products", productRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res)=> {
    res.status(200).json({
        message: "Hello World"
    })
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})