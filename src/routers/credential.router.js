import { Router } from 'express';
import { findAccountByIdController, registerCredentialController } from '../controllers/credential.controller.js';
/* import { validatePassword, validateEmail } from '../validations/registerCredentialValidation.js';
import { validateUser } from '../validations/createUserValidation.js'; */
const credentialRouter = Router();

/* credentialRouter.post("/register", (req, res, next) =>{
    try{
        const { confirmPassword, password, email, name, lastName, birthdate, cedula} = req.body;
        validateEmail(email);
        validatePassword(password);
        if(confirmPassword !== password) throw new Error("El confirmPassword y el password deben ser iguales");
        validateUser(name, lastName, birthdate, cedula);
        req.body = {
            name,
            lastName,
            cedula,
            birthdate: new Date(birthdate),
            confirmPassword,
            password,
            email
        };
        next();
    }
    catch(error){
        res.status(400).send(error.message);
    }
}); */
credentialRouter.post("/register", registerCredentialController);

credentialRouter.get("/account/:id", findAccountByIdController);
//credentialRouter.post("/", loginCredentialController);
//credentialRouter.put("/", changeCredentialController);
export default credentialRouter;