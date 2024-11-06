import { getAllUserService } from "../services/user.service.js";


export const getAllUser = (req, res) =>{
    const allUser =  getAllUserService();
    
    console.log(typeof [])
    console.log(typeof {})
    res.send(allUser);
}