import { Router } from "express";
import { createRoomController, getAllRoomsController } from "../controllers/room.controller.js";
import checkToken from "../middlewares/checkToken.middleware.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.middleware.js";
import checkInfoRoom from "../middlewares/checkInfoRoom.middleware.js";

const roomRouter = Router();
roomRouter.get("/", checkToken, checkRoleAuth([true]), getAllRoomsController);
roomRouter.post("/",  
    checkToken,
    checkRoleAuth([true]),
    checkInfoRoom,
    createRoomController
);

export default roomRouter;