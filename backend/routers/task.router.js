import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";
import { createTaskMiddleware, updateTaskMiddleware } from "../middlewares/task.middleware.js";
import { createTaskController, deleteTaskController, getAllTaskController, getTaskByIdController, updateTaskController } from "../controllers/task.controller.js";

const taskRoute = express.Router();

taskRoute.route("/add").post(verifyCookies, createTaskMiddleware, createTaskController);
taskRoute.route("/all").get(verifyCookies, getAllTaskController);
taskRoute.route("/update/:id").put(verifyCookies, updateTaskMiddleware, updateTaskController);
taskRoute.route("/delete/:id").delete(verifyCookies, deleteTaskController);
taskRoute.route("/details/:id").get(verifyCookies, getTaskByIdController);

export default taskRoute;