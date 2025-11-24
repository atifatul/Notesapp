const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check karo: Kya Header mein Authorization hai? Aur kya wo 'Bearer' se shuru hota hai?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Token nikalo (Bearer aur Token ke beech space hoti hai, isliye split karke 2nd part uthaya)
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify karo (Secret Key se check karo ki ye wahi token hai jo humne diya tha)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Token sahi hai! Ab User ko Database se dhundo (Password chodkar)
      // 'req.user' mein user ka data daal do, taaki aage Controller use kar sake.
      req.user = await User.findById(decoded.id).select("-password");

      next(); // 5. Sab sahi hai, aage badho (Controller ke paas jao)
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };