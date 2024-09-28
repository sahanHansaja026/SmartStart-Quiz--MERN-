const express = require("express");
const Score = require("../models/score");

const router = express.Router();

// Route to save score
router.post("/score/save", async (req, res) => {
  const { cardId, score, username, email } = req.body;

  try {
    const newScore = new Score({
      cardId,
      score,
      username,
      email,
    });
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({
          error: "The combination of Card ID and Username already exists",
        });
    } else {
      res.status(500).json({ error: "Failed to save score" });
    }
  }
});

// GET all scores for the current user
router.get("/scores", async (req, res) => {
  const { email } = req.query; 
  try {
    const scores = await Score.find({ email: email });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to get top 5 most used cardId
router.get("/top-card-ids", async (req, res) => {
  try {
    const topCardIds = await Score.aggregate([
      {
        // Group by cardId and count occurrences
        $group: {
          _id: "$cardId",
          count: { $sum: 1 },
        },
      },
      {
        // Sort by count in descending order
        $sort: { count: -1 },
      },
      {
        // Limit to top 5
        $limit: 5,
      },
    ]);

    res.status(200).json(topCardIds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top card IDs" });
  }
});


module.exports = router;
