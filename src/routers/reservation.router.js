import { Router } from "express";
import { getAllInfoRoomsController, 
    getAllReservationsController, 
    getSpecificReservationController, 
    makeAReservationController, 
    searchAvailableReservartionController, 
    searchSpecificAvailableRoomController,
    deleteReservationController,
    modifeReservationController
} from "../controllers/reservation.controller.js";
import cleanBodySpecificReservation from "../middlewares/specificReservation.middleware.js";
import checkToken from "../middlewares/checkToken.middleware.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.middleware.js";

const reservationRouter = Router();
reservationRouter.get("/", checkToken, checkRoleAuth([true]), getAllReservationsController);
reservationRouter.get("/specific" , checkToken, checkRoleAuth([true]), cleanBodySpecificReservation, getSpecificReservationController);
reservationRouter.get("/search" , checkToken, checkRoleAuth([true]), searchAvailableReservartionController);
reservationRouter.get("/searchspecific" , checkToken, checkRoleAuth([true]), searchSpecificAvailableRoomController);
reservationRouter.post("/info" , checkToken, checkRoleAuth([true]), getAllInfoRoomsController);
reservationRouter.post("/", checkToken, makeAReservationController);
reservationRouter.delete("/:id", checkToken, checkRoleAuth([true]), deleteReservationController);
reservationRouter.put("/:id", checkToken, checkRoleAuth([true]), modifeReservationController);

export default reservationRouter;   