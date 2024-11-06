import { Router } from 'express';
import userRouter from './user.router.mjs';

const router = Router();

router.use("/user", userRouter);

export default router;