const express = require('express');
const Score = require('../models/score');

const router = express.Router();

// Route to save score
router.post('/score/save', async (req, res) => {
    const { cardId, score, username, email } = req.body;
  
    try {
      const newScore = new Score({
        cardId,
        score,
        username,
        email,
      });
      await newScore.save();
      res.status(201).json({ message: 'Score saved successfully!' });
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error code
        res.status(400).json({ error: 'The combination of Card ID and Username already exists' });
      } else {
        res.status(500).json({ error: 'Failed to save score' });
      }
    }
  });
  

module.exports = router;
