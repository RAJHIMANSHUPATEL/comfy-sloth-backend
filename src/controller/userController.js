const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all required fields" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashPassword, role });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // Remove password before sending user data
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    registerUser,
    loginUser
};
