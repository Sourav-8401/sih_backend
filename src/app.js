import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());


//routes import
import userRouter from "./routes/user.routes.js";


app.use("/users",userRouter)

export {app}