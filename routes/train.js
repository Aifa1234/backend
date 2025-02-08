const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Get live train status
router.get("/status/:trainNumber", async (req, res) => {
    try {
        const { trainNumber } = req.params;

        const options = {
            method: "GET",
            url: `https://indian-railway-api.p.rapidapi.com/v1/live/${trainNumber}`,
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Corrected
                "X-RapidAPI-Host": "indian-railway-api.p.rapidapi.com"
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching train status:", error.message);
        res.status(500).json({ error: "Error fetching train status" });
    }
});

module.exports = router;
