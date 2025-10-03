import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.connect.js";
import userRouter from "./routers/user.route.js";
import tagRouter from "./routers/tag.router.js";
import teamRouter from "./routers/team.router.js";
import projectRoute from "./routers/project.route.js";
import taskRoute from "./routers/task.router.js";
import reportRouter from "./routers/report.route.js";

// dotenv configration
dotenv.config();

// initialize the app with the help of express
const app = express();

// initialize the port 
const PORT = process.env.PORT || 5600;

// connect the db 
connectDb();

// call the cookie parser
app.use(cookieParser());

// convert the data into a json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define the cors policy 
// app.use(cors()); 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// api end points
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/report", reportRouter);


// server started
app.listen(PORT, () => {
    console.log(`server started in http://localhost:${PORT}`);
});
