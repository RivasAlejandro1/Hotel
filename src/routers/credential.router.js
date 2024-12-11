import { Router } from 'express';
import { findAccountByIdController, loginCredentialController, registerCredentialController } from '../controllers/credential.controller.js';
import checkInfoRegister from '../middlewares/checkInfoRegister.middleware.js';
const credentialRouter = Router();

credentialRouter.post("/register", checkInfoRegister, registerCredentialController);

credentialRouter.post("/login", loginCredentialController);

credentialRouter.get("/account/:id", findAccountByIdController);
export default credentialRouter;