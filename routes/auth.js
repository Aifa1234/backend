const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const router = express.Router();
require("dotenv").config();

// User Signup (Registers both User & Profile)
router.post("/signup", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ status: 400, message: "All fields are required" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: 409, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create Profile with default values
        const profile = new Profile({
            name,
            email,
            contactNo: "",
            gender: "other",
            role: "basic",
            aboutMe: "",
            age: 0,
            profilePic: ""
        });

        await profile.save({ session });

        // Create User linked to Profile
        const user = new User({
            email,
            password: hashedPassword,
            role: "basic",
            profile: profile._id
        });

        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            status: 201,
            message: "User registered successfully",
            user,
            profile
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "All fields are required" });
        }

        const user = await User.findOne({ email }).populate("profile");
        if (!user) {
            return res.status(401).json({ status: 401, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 401, message: "Invalid credentials" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ status: 500, message: "JWT Secret is not configured" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            status: 200,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                profileId: user.profile.id
            },
            profile: user.profile
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
