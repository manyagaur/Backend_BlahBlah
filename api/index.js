// index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from './routes/posts.js';

const app = express();

// Middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend origin
  res.header("Access-Control-Allow-Credentials", true); // Allow cookies
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // Allow HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow necessary headers
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/posts', postRoutes);

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
