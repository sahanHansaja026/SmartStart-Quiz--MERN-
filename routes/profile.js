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

    const userProfile = await Posts.findOne({ email }); // Ensure Posts is the correct model

    if (!userProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      userProfile,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
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
// Update post by email
routerrees.put("/profile/update/email", async (req, res) => {
  try {
    const { email, first_name, last_name, phone, DOB, job, about } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Prepare an object with fields to update
    const updateData = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (phone) updateData.phone = phone;
    if (DOB) updateData.DOB = DOB;
    if (job) updateData.job = job;
    if (about) updateData.about = about;

    const updatedPost = await Posts.findOneAndUpdate(
      { email }, // Find by email
      { $set: updateData }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: "Post updated successfully", updatedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


module.exports = routerrees;
