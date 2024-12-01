import { Router } from "express";
import { getAllReservationsController, makeAReservationController, searchAvailableReservartionController, searchSpecificAvailableRoomController } from "../controllers/reservation.controller.js";

const reservationRouter = Router();
reservationRouter.get("/", getAllReservationsController);
reservationRouter.get("/search", searchAvailableReservartionController);
reservationRouter.get("/searchspecific", searchSpecificAvailableRoomController);
//reservationRouter.post("/", makeAReservationController);

export default reservationRouter;   