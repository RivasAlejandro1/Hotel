import credentialEntity from "../entities/credential.entity.js";
import { AppDataSource } from "../config/AppDataSource.js";
import bcrypt from 'bcrypt';
import infoCrenditials from "../utils/infoCredenitials.js";
import { genereteAccessToken } from "../helpers/jwt/generateToken.js";
const credentialRepository = AppDataSource.getRepository(credentialEntity);


export const loginCredentialService = async (email, password) =>{
    const ErrorInvalidCredentials = ()=>{
        throw new Error(`El email o las contraseñas son invalidas`);
    }
    
    const credentialFinded = await credentialRepository.findOne({
        where: {
            email
        },
        relations:{
            user: true
        }
    });

    if(!credentialFinded) ErrorInvalidCredentials();
    const validPassword = await bcrypt.compare(password, credentialFinded.password);
    if(!validPassword) ErrorInvalidCredentials();

    
    const  { user } = credentialFinded;
    const  { id, administrador} = user;
    
    const accesstoken = genereteAccessToken({id, administrador});
    console.log(accesstoken)
    
    return {
        accesstoken,
        id: id,
        administrador
    };
}


export const existCredentialWithThatEmailService = async (email)=> {
    const credentialFinded = await credentialRepository.existsBy({email: email});
    return credentialFinded;
};



export const registerCredentialService = async (infoCredential) =>{
    const existEmail = await existCredentialWithThatEmailService(infoCredential.email);
    if(existEmail) throw new Error("El email ya esta en uso");
    const passwordHashed =  await bcrypt.hash(infoCredential.password, 10);
    if(!passwordHashed) throw new Error("La contraseña no puede ser hasheada");

    await credentialRepository.save({...infoCredential, password: passwordHashed});
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
       await registerCredentialService(user);
   })) 
   console.log("¡User seeder done!");
};
