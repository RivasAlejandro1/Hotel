import { Router } from 'express';
import userRouter from './user.router.js';
import credentialRouter from './credential.router.js';
import reservationRouter from './reservation.router.js';

const router = Router();

router.use("/user", userRouter);
router.use("/", credentialRouter);
router.use("/reservation", reservationRouter);

export default router;