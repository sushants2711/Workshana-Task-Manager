import epxress from "express";
import { createTeamMiddleware, updateTeamMiddleware } from "../middlewares/team.middleware.js";
import { createTeamController, deleteTeamController, getTeamController, getTeamDetailsById, updateTeamController } from "../controllers/team.controller.js";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";

const teamRouter = epxress.Router();

teamRouter.route("/add").post(verifyCookies ,createTeamMiddleware, createTeamController);
teamRouter.route("/all").get(verifyCookies, getTeamController);
teamRouter.route("/update/:id").put(verifyCookies, updateTeamMiddleware, updateTeamController);
teamRouter.route("/delete/:id").delete(verifyCookies, deleteTeamController);
teamRouter.route("/details/:id").get(verifyCookies, getTeamDetailsById);

export default teamRouter;