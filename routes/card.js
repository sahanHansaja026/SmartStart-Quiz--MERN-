const express = require("express");
const Posts = require("../models/card");
const multer = require("multer");
const path = require("path");

const routers = express.Router();

// Upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../client/src/uploads")); // Adjust the path as needed
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Save post
routers.post("/post/save", upload.single("image"), async (req, res) => {
  try {
    const { email, title,summery } = req.body;

    if (!email || !title || !summery|| !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = req.file.filename;

    const newPost = new Posts({
      email,
      title,
      summery,
      image: imagePath,
    });

    await newPost.save();
    return res.status(200).json({ success: "Post saved successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all posts
routers.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find().sort({ _id: -1 }).exec();
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Other routes...

module.exports = routers;
