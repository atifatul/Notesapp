const mongoose = require("mongoose");

// 1. Schema define kar rahe hain (Blueprint/Naksha)
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Iske bina data save nahi hoga
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // 2. Yeh bahut kaam ki cheez hai
  }
);

// 3. Model create kar rahe hain
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;