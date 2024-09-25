const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
}, { timestamps: true });

// Create a compound index to ensure that the combination of cardId and username is unique
scoreSchema.index({ cardId: 1, username: 1 }, { unique: true });

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
