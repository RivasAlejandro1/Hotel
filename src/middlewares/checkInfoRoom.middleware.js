import { validatePrice, validateRoomNumber, validateRoomType } from "../validations/createRoomValidation.js";

const checkInfoRoom = async (req, res, next) =>{
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
   
}

export default checkInfoRoom;
