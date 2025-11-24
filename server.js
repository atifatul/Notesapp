const express = require("express"); // 1. Express ko import kiya
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const cors=require("cors");
dotenv.config();
connectDB();

const Note = require("./models/noteModel");

const app = express(); // 2. Express ka ek variable/app banaya

app.use(cors());
app.use(express.json());

// 3. Ek basic API route banaya test karne ke liye
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// 4. Server ko ek port par sunne (listen) ke liye bola
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
