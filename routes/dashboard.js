const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify token & role
const authMiddleware = (role) => {
    return (req, res, next) => {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ error: "Access Denied" });
        }

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            if (decoded.role !== role) {
                return res.status(403).json({ error: "Access Forbidden" });
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid Token" });
        }
    };
};

// Routes for different roles
router.get("/admin", authMiddleware("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get("/doctor", authMiddleware("doctor"), (req, res) => {
    res.json({ message: "Welcome Doctor" });
});

router.get("/patient", authMiddleware("patient"), (req, res) => {
    res.json({ message: "Welcome Patient" });
});

router.get("/delivery", authMiddleware("delivery_boy"), (req, res) => {
    res.json({ message: "Welcome Delivery Boy" });
});

module.exports = router;
