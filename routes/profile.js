const express = require("express");
const Posts = require("../models/profile");
const multer = require("multer");
const path = require("path");

const routerrees = express.Router();

//upload subtitle
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../client/src/profile")); // for images
    } else {
      cb(new Error("Invalid fieldname"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

routerrees.post(
  "/profile/save",
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        DOB,
        job,
        about,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !job ||
        !DOB ||
        !about 
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const imagePath = req.files["image"]
        ? req.files["image"][0].filename
        : null;

      const newPost = new Posts({
        first_name,
        last_name,
        email,
        phone,
        DOB,
        job,
        about,
        image: imagePath,
      });

      await newPost.save();
      return res.status(200).json({ success: "Post saved successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);
// Get posts by email
routerrees.get("/profiles", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query parameters

    // Validate email
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = (page - 1) * limit;

    // Find posts by email, sort, and paginate
    const posts = await Posts.find({ email })
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();

    const totalPosts = await Posts.countDocuments({ email });

    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      existingPosts: posts,
      totalPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message); // Log the error for debugging
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});




// get a specific post by ID
routerrees.get("/profile/:id", async (req, res) => {
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

// update post
routerrees.put("/profile/update/:id", async (req, res) => {
  try {
    await Posts.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({ success: "Post updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = routerrees;
