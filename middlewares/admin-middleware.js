const adminMiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;

        if (!adminRole) {
            return res.status(403).json({ message: "Access Denied. User is not an admin." });
        }
        next();
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = adminMiddleware;
