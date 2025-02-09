const express = require('express');
const Medicine = require('../models/Medicine');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware'); // Ensure correct import

const router = express.Router();

// Add medicine (Only Pharmacist)
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, stock, expiryDate, manufacturer } = req.body;

    if (!name || !price || !stock || !expiryDate) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newMedicine = new Medicine({
      name,
      description,
      price,
      stock,
      expiryDate,
      manufacturer
    });

    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully', medicine: newMedicine });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
