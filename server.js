const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");  // Import axios to make HTTP requests

// Import routes
const postRouter = require("./routes/question");
const cardRouter = require("./routes/card");
const authRoutes = require("./routes/auth");
const profileRouter = require("./routes/profile");
const scoreRouter = require("./routes/score");
const SearchRouter = require("./routes/search");
const DashRouter = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(postRouter);
app.use(cardRouter);
app.use(profileRouter);
app.use(scoreRouter);
app.use(SearchRouter);
app.use(DashRouter);

// Serve static files (e.g., images)
app.use("/Uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Profileimge", express.static(path.join(__dirname, "profile")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/quiz_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api/auth", authRoutes); // New authentication route

// New Route for AI Integration
app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Send the request to the Python AI service
    const response = await axios.post("http://localhost:5000/generate", { prompt });
    
    // Return the AI-generated text back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with AI service:", error);
    res.status(500).send("An error occurred while generating text.");
  }
});
