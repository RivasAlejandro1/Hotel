import credentialEntity from "../entities/credential.entity.js";
import { AppDataSource } from "../config/AppDataSource.js";
const credentialRepository = AppDataSource.getRepository(credentialEntity);  


export const registerCredentialService = async (infoCredential) =>{
    await credentialRepository.save(infoCredential);
    return "Las Credenciales han sido creadas";
}

//? No es necesaria, por los momentos
export const findAccountByIdService = async(id) => {
    const accountFinded = await credentialRepository.findOne({
            relations: ["user"],
            where:{
                id
            }
        });
    return accountFinded;
}