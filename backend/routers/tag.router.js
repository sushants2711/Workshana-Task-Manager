import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";
import { createTagMiddleware, updateTagMiddleware } from "../middlewares/tag.middleware.js";
import { createTagController, deleteTagController, getAllTagController, TagDetailsById, updateTagController } from "../controllers/tag.controller.js";

const tagRouter = express.Router();

tagRouter.route("/add").post(verifyCookies, createTagMiddleware, createTagController);
tagRouter.route("/all").get(verifyCookies, getAllTagController);
tagRouter.route("/update/:id").put(verifyCookies, updateTagMiddleware, updateTagController);
tagRouter.route("/delete/:id").delete(verifyCookies, deleteTagController);
tagRouter.route("/details/:id").get(verifyCookies, TagDetailsById);

export default tagRouter;