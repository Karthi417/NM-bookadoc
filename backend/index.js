import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import crypto from "crypto"; // Optional: Adjust if issues arise with import

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
};

// Generate a random string
const randomString = crypto.randomBytes(256).toString("base64");
console.log(randomString);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.send("HELLO MEDICARE");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1); // Exit on database connection failure
  }
};

// Start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
