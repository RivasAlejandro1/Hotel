import { Router } from "express";
import { getAllReservationsController, searchAvailableReservartionController } from "../controllers/reservation.controller.js";

const reservationRouter = Router();
reservationRouter.get("/", getAllReservationsController);
reservationRouter.get("/search", searchAvailableReservartionController);

export default reservationRouter;