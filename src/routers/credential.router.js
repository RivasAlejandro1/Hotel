import { Router } from 'express';
import { registerCredentialController } from '../controllers/credential.controller.js';
import { validatePassword, validateEmail } from '../validations/registerCredentialValidation.js';
const credentialRouter = Router();

/* credentialRouter.post("/register", (req, res, next) =>{
    try{
        const { confirmPassword, password, email} = req.body;
        validateEmail(email);
        validatePassword(password);
        if(confirmPassword !== password) throw new Error("El confirmPassword y el password deben ser iguales");
        next();
    }
    catch(error){
        res.status(400).send(error.message);
    }
}); */
credentialRouter.post("/register", registerCredentialController);
//credentialRouter.post("/", loginCredentialController);
//credentialRouter.put("/", changeCredentialController);
export default credentialRouter;