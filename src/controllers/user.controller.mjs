import { getAllUserService } from "../services/user.service.mjs";


export const getAllUser = (req, res) =>{
    const allUser =  getAllUserService;
    res.send(allUser);
}