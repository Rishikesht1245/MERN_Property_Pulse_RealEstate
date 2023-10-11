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

// listening to port
const server = app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
//socket configuration
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let users = [];

// only adding users those are already not present in the array.
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  console.log(users);
  return users.find((user) => user.userId === receiverId);
};

io.on("connection", (socket) => {
  //when connection
  console.log("A user connected");

  // take user id and socket id from user
  socket.on("addUser", (userId) => {
    console.log("add user");
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // when client emit sendMessage it will be listened in server and it will fetch the receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(senderId);
    console.log(receiverId);
    console.log(text);
    console.log("Message arrived");
    const user = getUser(receiverId);
    console.log(user);
    // sending private messages from sender to receiver
    io.to(user?.socketId).emit("getMessage", { senderId, text });
  });

  // when user disconnect
  socket.on("disconnect", (socket) => {
    console.log(" A user disconnected");
    removeUser(socket.id);
  });
});
