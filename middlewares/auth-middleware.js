const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log("Received Authorization header:", token);

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    const actualToken = token.replace("Bearer", "").trim();
    try {
        const isVerified = jwt.verify(actualToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email: isVerified.email}).select({
            password: 0,
        });
        
        console.log("Token is verified successfully:", userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();


    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
