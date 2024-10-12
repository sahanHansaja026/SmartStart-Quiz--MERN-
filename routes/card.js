const express = require("express");
const Posts = require("../models/card");
const multer = require("multer");
const path = require("path");

const routers = express.Router();

// Upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Save post
routers.post("/posts/save", upload.single("image"), async (req, res) => {
  try {
    const { email,card_id, title, summery } = req.body;

    if (!email || !card_id ||!title || !summery || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = req.file.filename; 

    const newPost = new Posts({
      email,
      title,
      summery,
      card_id,
      image: imagePath, 
    });

    await newPost.save();
    return res.status(200).json({ success: "Post saved successfully" });
  } catch (error) {
    console.error("Error saving post:", error); 
    return res.status(500).json({ error: "Server error, please try again" });
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
    console.error("Error fetching posts:", error); 
    return res.status(500).json({ error: "Server error, please try again" });
  }
});

// get a specific post by ID
routers.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId).exec();
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//get a count
routers.get("/posts/count", async (req, res) => {
  try {
    const count = await Posts.countDocuments();
    return res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error("Error fetching post count:", error); 
    return res.status(500).json({ error: "Server error, please try again" });
  }
});


module.exports = routers;
