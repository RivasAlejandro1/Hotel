import { Router } from 'express';
import { createUserController, getAllUserController, getUserByIdController, modifeUserController } from '../controllers/user.controller.js';
import validateUser from '../validations/createUserValidation.js';
const userRouter = Router();

userRouter.get("/", getAllUserController);
userRouter.get("/:id", (req, res, next)=>{
    const validarNumero = /^\d+$/ 
    
    if(!validarNumero.test(req.params.id)) {
        res.status(400).send("El id debe ser un numero");
    } else{
        next();
    }
}); 
userRouter.get("/:id", getUserByIdController); 


userRouter.post("/", (req, res, next)=>{
    
    const { name, lastName, birthdate, cedula} = req.body; 
    try{
        validateUser(name, lastName, birthdate, cedula);
        req.body = {
            name,
            lastName,
            cedula,
            birthdate: new Date(birthdate)
        };
        next();
    }
    catch(error){
        res.status(400).send(error.message);
    }
    
});
userRouter.post("/", createUserController); 

userRouter.put("/:id", modifeUserController); 
export default userRouter;