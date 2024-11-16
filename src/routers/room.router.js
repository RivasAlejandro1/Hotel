import { Router } from "express";
import { createRoomController, getAllRoomsController } from "../controllers/room.controller.js";

const roomRouter = Router();
roomRouter.get("/", getAllRoomsController);

/* roomRouter.post("/", (req, res, next) =>{
}); */
roomRouter.post("/", createRoomController);

export default roomRouter;