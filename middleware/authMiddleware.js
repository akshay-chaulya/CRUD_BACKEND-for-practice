import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header.authorization?.split(' ')[1];

        if (!token) res.status(401).json({message: "Unauthorized. No token provided"});

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id).select("-password");

        if (!user) return res.status(401).json({message: "Unauthorized. User not found"})

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({message: "Server error"});
        console.log("Error in user auth middleware: ", error)
    }
}