const express = require("express");
const UserModel = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");

// Login
const loginController = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;

    const user = await UserModel.findOne({ name });

    console.log("fetched user Data", user);
    console.log(await user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        };
        console.log(response);
        res.json(response);
    } else {
        res.status(401);
        throw new Error("Invalid UserName or Password");
    }
});

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
    // Hash password before saving




    // Create a new user
    const user = await UserModel.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Registration Error");
    }
});

module.exports = { loginController, registerController }