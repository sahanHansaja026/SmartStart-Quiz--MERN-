const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path =require("path");

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

app.use("/Uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Profileimge", express.static(path.join(__dirname, "profile")));

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
