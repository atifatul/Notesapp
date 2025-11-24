const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Agar koi '/' par request kare toh kya ho?
router.route("/").get(protect, getNotes).post(protect, createNote);
// Iska matlab:
// GET request aayi toh 'getNotes' function chalo.
// POST request aayi toh 'createNote' function chalo.

// 2. Naya Route: ID ke liye
// Agar URL hai '/api/notes/123', toh ':id' ka matlab hai 123
router.route("/:id").delete(protect, deleteNote).put(protect, updateNote);

module.exports = router;
