const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // User ki ID ko token mein chupa rahe hain
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token 30 din baad expire ho jayega
  });
};

module.exports = generateToken;