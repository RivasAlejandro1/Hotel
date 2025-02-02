import { /* createUserService, */ getAllUserService, getSpecificUsersService, getUserByIDService, modifeUserRolService, modifeUserService } from "../services/user.service.js";


export const getAllUserController =  async (req, res)=>{
    try{
        const allUser =  await getAllUserService();
        res.status(200).send(allUser);

    }
    catch(error){
        res.status(404).send(error)
    }

}
export const getUserByIdController =  async (req, res)=>{
    try{
        const userFinded =  await getUserByIDService(req.params.id);
        if(userFinded == null) throw new Error(`Usuario con el id ${req.params.id} no existe.`)
        res.status(200).send(userFinded);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

} 
export const getSpecificUsersController =  async (req, res)=>{
    try{
        const { 
            cedula, 
            name, 
            lastName, 
            birthdate, 
            administrador
        } = req.body;
        
        
        const info =  { 
            cedula, 
            name, 
            lastName, 
            birthdate, 
            administrador
        };



        const findedUsers =  await getSpecificUsersService(info);
        res.status(200).send(findedUsers);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

} 

export const modifeUserController =  async (req, res)=>{
    try{
        const modifedUser =  await modifeUserService(req.params.id,req.body);
        res.status(200).send(modifedUser);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

};

export const modifeRolUserController =  async (req, res)=>{
    try{
        const modifedUser =  await modifeUserRolService(req.params.id,req.body.rol);
        res.status(200).send(modifedUser);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

};

/* export const createUserController =  async (req, res)=>{
    try{
        const userCreated =  await createUserService(req.body);
        res.status(200).send(userCreated);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

}; */