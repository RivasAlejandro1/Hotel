import { findAccountByIdService, loginCredentialService, registerCredentialService } from "../services/credential.service.js";


export const registerCredentialController =  async (req, res)=>{
    const {name, birthdate, lastName, cedula, password, email} = req.body;
    const infoUser = {
        name,
        birthdate, 
        lastName, 
        cedula,
        administrador: false
    };
    const infoCredential = {
        password,
        email, 
        user: infoUser
    };

    try{
        const result =  await registerCredentialService(infoCredential);
        res.status(200).send(result); 
    }
    catch(error){
        res.status(400).send(error.message);
    }

}

export const loginCredentialController = async (req, res) =>{
    try{
        const {password, email} = req.body;
        const {accesstoken, id, administrador } =  await loginCredentialService(email, password);
        res.header("authorization", accesstoken).json({
            message: "Usuario autenticado",
            id,
            administrador,
            token: accesstoken,
        })
        //res.status(200).send();
    }
    catch(error){
        res.status(404).send(error.message)
    }
} 


export const findAccountByIdController = async (req, res)=>{

    try {
        const accountFinded = await findAccountByIdService(req.params.id) 
        res.status(200).send(accountFinded);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}