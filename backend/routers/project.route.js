import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";
import { createProjectMiddleware, updateProjectMiddleware } from "../middlewares/project.middleware.js";
import { createProjectController, deleteProjectController, getAllProjectController, getProjectById, updateProjectController } from "../controllers/project.controller.js";

const projectRoute = express.Router();

projectRoute.route("/add").post(verifyCookies, createProjectMiddleware, createProjectController);
projectRoute.route("/all").get(verifyCookies, getAllProjectController);
projectRoute.route("/update/:id").put(verifyCookies, updateProjectMiddleware, updateProjectController);
projectRoute.route("/delete/:id").delete(verifyCookies, deleteProjectController);
projectRoute.route("/details/:id").get(verifyCookies, getProjectById);

export default projectRoute;