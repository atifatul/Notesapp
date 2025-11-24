const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken=require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // 1. Check karo sab kuch bheja hai ya nahi
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  // 2. Check karo user pehle se exist toh nahi karta
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 3. Naya User banao (Password apne aap hash ho jayega model ki wajah se)
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      // Token baad mein add karenge
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // User ko email se dhundo
  const user = await User.findOne({ email });

  // Check: User mila? AND Password match hua?
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), // Yahan Token generate hua! 🎫
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser};