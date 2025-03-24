import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class AuthController {
    async signup(req, res) {
        try {
            const { name, email, password} = req.body;
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashedPassword });

            await user.save();
            res.status(201).json({ message: "Register successfully" });
        } catch (err) {
            res.status(400).json({ message: err.message || "Error in SignUp" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
            res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }

    // async getCount(req, res) {
    //     try {
    //         const totalUsers = await UserService.getCount();
    //         res.status(200).json({ totalUsers });
    //     }
    //     catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // }

    // async getCurrentUser(req, res) {
    //     try {
    //         const user = await UserService.findById(req.user.id);
    //         if (!user) {
    //             return res.status(404).json({ message: "User not found" });
    //         }
    //         res.json(user);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: "Server error" });
    //     }
    // }
}
