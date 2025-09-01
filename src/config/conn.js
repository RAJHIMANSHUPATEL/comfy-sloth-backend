const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/comfy-sloth"
const url = "mongodb+srv://himanshurajpatel138:AiYGvG3NoWTyYtGH@cluster0.kzmyeum.mongodb.net/?retryWrites=true&w=majority&appName=comfy-sloth"

// const url = process.env.URL
mongoose.connect(url)
.then(()=> {
    console.log("DB Connection successfull")
})
.catch((error)=> {
    console.log(error);
})