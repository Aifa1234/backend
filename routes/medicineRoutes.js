const express = require("express");
const Medicine = require("../models/Medicine");


const router = express.Router();

// ✅ Pharmacist can add medicine
router.post("/add", async (req, res) => {
    try {
        const { name, manufacturer, price, stock, expiryDate, description } = req.body;

        // Validate required fields
        if (!name || !manufacturer || !price || !stock || !expiryDate) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const medicine = new Medicine({
            name,
            manufacturer,
            price,
            stock,
            expiryDate,
            description,
            createdBy: req.user.id, // Get pharmacist ID from token
        });

        await medicine.save();
        res.status(201).json({ message: "Medicine added successfully", medicine });
    } catch (err) {
        console.error("Error adding medicine:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get all medicines (Public or Authenticated Users Only)
router.get("/get", async (req, res) => {
    try {
        const medicines = await Medicine.find().populate("createdBy", "name email");
        res.json(medicines);
    } catch (err) {
        console.error("Error fetching medicines:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
