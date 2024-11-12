import { createUserService, getAllUserService, getUserByIDService } from "../services/user.service.js";


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
export const createUserController =  async (req, res)=>{
    try{
        const userCreated =  await createUserService(req.params.body);
        res.status(200).send(userCreated);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }

} 