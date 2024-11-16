import credentialEntity from "../entities/credential.entity.js";
import { AppDataSource } from "../config/AppDataSource.js";
import infoCrenditials from "../utils/infoCredenitials.js";
const credentialRepository = AppDataSource.getRepository(credentialEntity);


export const existCredentialWithThatEmailService = async (email)=> {
    const credentialFinded = await credentialRepository.existsBy({email: email});
    return credentialFinded;
};



export const registerCredentialService = async (infoCredential) =>{
    const existEmail = await existCredentialWithThatEmailService(infoCredential.email);
    if(existEmail) throw new Error("El email ya esta en uso");

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

export const credentialSeederService = async ()=> {
    await Promise.all(
       infoCrenditials.map( async(user) => {
       await credentialRepository.save(user);
   })) 
   return "¡User seeder done!";
};
