import { Router } from 'express';
import userRouter from './user.router.js';
import credentialRouter from './credential.router.js';
import reservationRouter from './reservation.router.js';
import roomRouter from './room.router.js';
import { deleteTokenCookie } from '../helpers/jwt/deleteTokenCookie.js';

const router = Router();

router.use("/user", userRouter);
router.use("/reservation", reservationRouter);
router.use("/", credentialRouter);
router.use("/room", roomRouter);
router.use("/logout", deleteTokenCookie);

export default router;