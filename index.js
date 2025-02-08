const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
