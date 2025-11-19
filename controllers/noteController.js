const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find(); // DB se saara data dhundo
  res.json(notes); // JSON format mein wapas bhejo
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Public
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body; // User ne jo bheja use pakdo

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const note = new Note({ title, content, category });
  const createdNote = await note.save(); // DB mein save karo

  res.status(201).json(createdNote);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    await note.deleteOne();
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNote ,deleteNote};
