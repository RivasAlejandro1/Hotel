import { Router } from 'express';
import { getAllUserController } from '../controllers/user.controller.js';
const userRouter = Router();

userRouter.get("/", getAllUserController);
userRouter.get("/:id", getAllUserController); 

export default userRouter;