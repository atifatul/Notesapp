const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = asyncHandler(async (req, res) => {
  // Purana Code: const notes = await Note.find();

  // Naya Code: Sirf wo notes jinki 'user' field mein meri ID hai
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
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

  const note = new Note({ user: req.user._id, title, content, category });
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

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body; // Naya data
  const note = await Note.findById(req.params.id); // Purana note dhundo

  if (note) {
    // Agar naya title hai toh woh lo, nahi toh purana hi rehne do
    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;

    const updatedNote = await note.save(); // Save karo
    res.json(updatedNote); // Wapas bhejo
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNote, deleteNote, updateNote };
