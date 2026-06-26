const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/UserRoute");
const PostRouter = require("./Routes/PostRouter");
const adminRouter = require("./Routes/AdminRouter");
const cors = require("cors");
const path = require("path");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

// 1. API Route Middlewares
app.use("/auth", userRoute);
app.use("/post", PostRouter);
app.use("/admin", adminRouter);

// 2. Pi Network Validation Route (Fixed & Positioned correctly for Vercel)
app.get("/validation-key.txt", (req, res) => {
  res.type("text/plain");
  // ⚠️ REPLACE THE TEXT BELOW WITH YOUR ACTUAL KEY FROM PI BROWSER
  res.send("PASTE_YOUR_ACTUAL_PI_KEY_HERE"); 
});

// 3. Base Route
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

const port = process.env.PORT || 9000;

mongoose.connect(process.env.URL, (error) => {
  if (error) {
    console.log("connexion failed");
  } else {
    console.log("database is connected");
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

module.exports = app;