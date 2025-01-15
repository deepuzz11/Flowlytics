import Router from "express"
import userAuthController from "../Controller/user.js"
import userAuthMiddleware from "../middleware/userMiddleware.js";

const userRouter = Router()

userRouter.post("/auth/sign-up", userAuthController.SignUp);
userRouter.post("/auth/login", userAuthController.SignIn);
userRouter.get("/auth/logout", userAuthMiddleware, userAuthController.LogOut)
export default userRouter