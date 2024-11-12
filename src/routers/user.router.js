import { Router } from 'express';
import { createUserController, getAllUserController, getUserByIdController } from '../controllers/user.controller.js';
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

/* userRouter.post("/", (req, res, next)=>{

    
    
    
    if(!validarNumero.test(req.params.id)) {
        res.status(400).send("El id debe ser un numero");
    } else{
        next();
    }
});  */
userRouter.post("/", createUserController); 

export default userRouter;