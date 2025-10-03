import express from "express";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";
import { groupByOwnersController, lastWeekClosedController, reportCompletedTaskController, taskCompleteByTeamController } from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.route("/task-complete").get(verifyCookies, reportCompletedTaskController);
reportRouter.route("/team-closed").get(verifyCookies, taskCompleteByTeamController);
reportRouter.route("/admin-owners/closed").get(verifyCookies, groupByOwnersController);
reportRouter.route("/last-week/closed").get(verifyCookies, lastWeekClosedController);

export default reportRouter;