const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Unauthorized role." });
        }
        next();
    };
};

module.exports = roleMiddleware; // ✅ Ensure this export is present
