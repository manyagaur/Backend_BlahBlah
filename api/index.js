// index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
