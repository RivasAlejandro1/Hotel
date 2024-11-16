import { Router } from "express";
import { getAllRoomsController } from "../controllers/room.controller.js";

const roomRouter = Router();
roomRouter.get("/", getAllRoomsController);

export default roomRouter;