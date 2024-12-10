import { Router } from "express";
import { getAllInfoRoomsController, 
    getAllReservationsController, 
    getSpecificReservationController, 
    makeAReservationController, 
    searchAvailableReservartionController, 
    searchSpecificAvailableRoomController 
} from "../controllers/reservation.controller.js";
import cleanBodySpecificReservation from "../middlewares/specificReservation.middleware.js";

const reservationRouter = Router();
reservationRouter.get("/", getAllReservationsController);
reservationRouter.get("/specific", cleanBodySpecificReservation, getSpecificReservationController);
reservationRouter.get("/search", searchAvailableReservartionController);
reservationRouter.get("/searchspecific", searchSpecificAvailableRoomController);
reservationRouter.get("/info", getAllInfoRoomsController);
reservationRouter.post("/", makeAReservationController);

export default reservationRouter;   