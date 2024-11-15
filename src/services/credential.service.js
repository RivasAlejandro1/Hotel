import credentialEntity from "../entities/credential.entity.js";
import { AppDataSource } from "../config/AppDataSource.js";
const credentialRepository = AppDataSource.getRepository(credentialEntity);  


export const registerCredentialService = async (infoCredential) =>{
    const result = await credentialRepository.save(infoCredential);
    console.log(result);
    return "Las Credenciales han sido creadas";
}