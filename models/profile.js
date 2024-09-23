const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  DOB:{
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  about:{
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("UserProfile", postSchema);