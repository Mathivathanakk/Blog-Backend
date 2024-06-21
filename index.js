import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Database/config.js";
import authRoute from './Routers/authRouter.js';
import userRoute  from './Routers/userRouter.js';
import cookieParser from "cookie-parser";
import postRoute from './Routers/postRouter.js';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB();

app.get("/", (res, req) => {
  res.status(200).send("Welcome to the API");
});


//API ROUTES

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)

app.listen(process.env.PORT, () => {
  console.log("Server is running on the port");
});
