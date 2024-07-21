import express, { json } from "express";
import { connect } from "mongoose";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/Route.js";
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Use express.json() instead of body-parser
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use("/", userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Mongo Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
