import { getAllUserService } from "../services/user.service.js";


export const getAllUserController =  async (req, res)=>{
    try{
        const allUser =  await getAllUserService();
        res.status(200).send(allUser);

    }
    catch(error){
        res.status(404).send(error)
    }

}

/* export const getUserByIdController =  async (req, res)=>{
    try{
        const allUser =  await getAllUserService();
        throw new Error();
        res.status(200).send(allUser);
    }
    catch(error){
        res.status(404).send(error);
    }

} */