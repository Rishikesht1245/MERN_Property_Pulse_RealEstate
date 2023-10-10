import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user/user.routes.js";
import authRouter from "./routes/user/auth.routes.js";
import listingRouter from "./routes/user/listing.routes.js";
import messengerRoutes from "./routes/user/messenger.routes.js";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// allowing json inputs
app.use(express.json());

// Enabling cookie Parser
app.use(cookieParser());

// connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Internal Server error", error);
  });

// listening to port
const server = app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

//Api routes -- User
app.use("/api/user", userRouter);
// Auth routes -- User
app.use("/api/auth", authRouter);
// listing routes
app.use("/api/listing", listingRouter);
// messenger routes
app.use("/api/conversation", messengerRoutes);

// middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // internal server error
  //mongo duplicate error || custom Error or Internal server error
  const message =
    (err.code === 11000 && "User Already Exists") ||
    err.message ||
    "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//socket configuration
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
});
