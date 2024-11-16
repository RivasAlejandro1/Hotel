import { Router } from "express";
import { getAllReservationsController } from "../controllers/reservation.controller.js";

const reservationRouter = Router();
reservationRouter.get("/", getAllReservationsController);

export default reservationRouter;