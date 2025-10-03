import express from "express";
import { deleteMiddleware, loginMiddleware, signupMiddleware, updateMiddleware } from "../middlewares/user.middleware.js";
import { allUserController, deleteController, getUserDetailsByLoggedInUser, loginController, logoutController, signupController, updateController } from "../controllers/user.controller.js";
import { verifyCookies } from "../middlewares/verify.cookies.user.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signupMiddleware, signupController);
userRouter.route("/login").post(loginMiddleware, loginController);
userRouter.route("/logout").post(verifyCookies, logoutController);
userRouter.route("/update").put(verifyCookies, updateMiddleware, updateController);
userRouter.route("/delete").delete(verifyCookies, deleteMiddleware, deleteController);
userRouter.route("/all-user").get(verifyCookies, allUserController);
userRouter.route("/user-details").get(verifyCookies, getUserDetailsByLoggedInUser);

export default userRouter;