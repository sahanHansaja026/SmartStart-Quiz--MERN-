const express = require("express");
const router = express.Router();
const Card = require("../models/card"); // Card model

// Route to get title from Card collection by card_id
router.get("/card-title/:card_id", async (req, res) => {
  try {
    const cardId = req.params.card_id;

    // Find the card by card_id
    const card = await Card.findOne({ card_id: cardId });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    // Respond with the card's title
    res.status(200).json({ title: card.title });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch card title" });
  }
});

module.exports = router;
