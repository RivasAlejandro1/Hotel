import { Router } from 'express';
import { /* createUserController, */ getAllUserController, getUserByIdController, modifeUserController } from '../controllers/user.controller.js';
import {/* validateUser, */ validateName, validateBirthdate,  validateCedula} from '../validations/createUserValidation.js';
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




userRouter.put("/:id", (req, res, next) =>{
    const { name, lastName, birthdate, cedula} = req.body; 
    const newBody = {};
    try{
        const id = req.params.id;
        if(id?.length == 0) throw new Error ("Debes enviar un id por params");
        if(!name && !lastName && !birthdate && !cedula) throw new Error("Debes enviar algun cambio por body con los nombres: name, birthdate, lastName o cedula");
        
        if(name) {
            validateName(name, "nombre");
            newBody.name = name;
        };
        if(birthdate){
            validateBirthdate(birthdate);
            newBody.birthdate = birthdate;
        } 
        if(lastName){
            validateName(lastName, "apellido");
            newBody.lastName = lastName;
        } 
        if(cedula) {
            validateCedula(cedula)
            newBody.cedula = cedula;
        }
        req.body = newBody;
        next();
        
    }
    catch(error){
        res.status(400).send(error.message)
    }
    
});
userRouter.put("/:id", modifeUserController);

/* userRouter.post("/", (req, res, next)=>{
    
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
userRouter.post("/", createUserController); */ 



export default userRouter;