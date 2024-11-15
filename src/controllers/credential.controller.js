import { registerCredentialService } from "../services/credential.service.js";

export const registerCredentialController =  async (req, res)=>{
    try{

        console.log("hola")
        const { password, email} = req.body;
        const infoCredential = {password, email};
        const result =  await registerCredentialService(infoCredential);
        
        res.status(200).send(result); 
    }
    catch(error){
        res.status(400).send(error);
    }

}
