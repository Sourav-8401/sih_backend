import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import bodyParser from "body-parser";
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
// app.use(bodyParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());


//routes import
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import adminRouter from "./routes/admin.routes.js"
import workerRouter from "./routes/worker.routes.js"
app.use("/users",userRouter)
app.use("/tasks",taskRouter)
app.use("/admins",adminRouter)
app.use("/worker",workerRouter)
export {app}