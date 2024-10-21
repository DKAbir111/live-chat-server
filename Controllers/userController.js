const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing
const UserModel = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");

const loginController = () => { };

// Register Controller
const registerController = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All necessary inputs are required");
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("Email already exists");
    }

    // Check if username already exists
    const existingUserName = await UserModel.findOne({ name });
    if (existingUserName) {
        res.status(400);
        throw new Error("Username already exists");
    }

    // // Hash the password before saving
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await UserModel.create({ name, email, password: hashedPassword })
});