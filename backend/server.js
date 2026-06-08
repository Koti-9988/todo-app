const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("users", UserSchema);

// API route → fetch data
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});