import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
const app = express();
import cors from "cors";

dotenv.config({
    path: 'env'
})

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cors());

connectDB();