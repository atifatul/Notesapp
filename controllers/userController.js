const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
      // Token baad mein add karenge
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

module.exports = { registerUser };