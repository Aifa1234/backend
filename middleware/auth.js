const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) return res.status(403).json({ error: "Access Forbidden" });
        req.user = decoded;
        next();
    } catch {
        res.status(400).json({ error: "Invalid Token" });
    }
};

module.exports = authMiddleware;
