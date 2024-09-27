const express = require("express");
const Posts = require("../models/card"); // models import
const routee = express.Router();

// Search posts by partial title
// Search posts by partial title
routee.post("/search", (req, res) => {
  const { title: title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Module name is required" });
  }

  // Use a regular expression to match any word starting with the input letters
  const regex = new RegExp(`\\b${title}`, 'i'); // \b for word boundary, case-insensitive

  Posts.find({ title: { $regex: regex } })
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ error: "No Module is found" });
      }
      return res.status(200).json({ success: true, existingPosts: posts });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});


module.exports = routee; // export routee
