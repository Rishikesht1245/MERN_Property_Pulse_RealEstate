import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

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
app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

//Api routes
app.use("/api/user", userRouter);
