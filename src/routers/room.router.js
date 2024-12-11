import { Router } from "express";
import { createRoomController, getAllRoomsController } from "../controllers/room.controller.js";
import { validatePrice, validateRoomNumber, validateRoomType } from "../validations/createRoomValidation.js";
import checkToken from "../middlewares/checkToken.middleware.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.middleware.js";

const roomRouter = Router();
roomRouter.get("/", checkToken, checkRoleAuth([true]), getAllRoomsController);

roomRouter.post("/", (req, res, next) =>{
    const {numero, tipo, precio} = req.body;
    req.body = {numero, tipo, precio};
    try{
        validateRoomNumber(numero);
        validateRoomType(tipo);
        validatePrice(precio)
        next();
    }
    catch(error){
        res.status(400).send(error.message);
    }
   
});
roomRouter.post("/",  checkToken, checkRoleAuth([true]), createRoomController);

export default roomRouter;