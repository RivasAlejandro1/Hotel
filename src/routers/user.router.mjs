import { Router } from 'express';
import { getAllUser } from '../controllers/user.controller.mjs';
const userRouter = Router();

userRouter.get("/", getAllUser);

export default userRouter;