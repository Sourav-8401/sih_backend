import express from "express"
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", router);