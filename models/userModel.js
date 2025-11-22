const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Password hash karne wala tool

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Duplicate email nahi chalega
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// --- MAGIC TRICK (Middleware) ---
// User save hone se JUST PEHLE yeh function chalega
userSchema.pre("save", async function (next) {
  // Agar password change nahi hua (sirf naam update kiya), toh hash mat karo
  if (!this.isModified("password")) {
    next();
  }

  // Password ko Hash (Encrypt) kar do
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password match karne ka function (Login ke waqt kaam aayega)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
