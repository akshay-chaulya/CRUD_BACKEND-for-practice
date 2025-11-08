import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password)  return res.status(400).json({ message: 'Email and password are required' });

        const existingUser = await userModel.findOne({email});

        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hasPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ email, password: hasPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        delete newUser._doc.password;

        res.json({ message: 'User registered successfully', user: newUser, token });

        res.json({});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error("Something went wrong during signup:", error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        delete user._doc.password;

        res.json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error("Something went wrong during login:", error);
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.error("Something went wrong during logout:", error);
    }
}

export const profile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
         res.status(500).json({ message: 'Server Error' });
        console.error("Something went wrong during profile:", error);
    }
}