import { Router } from 'express';
import userRouter from './user.router.js';
import credentialRouter from './credential.router.js';

const router = Router();

router.use("/user", userRouter);
router.use("/", credentialRouter);

export default router;