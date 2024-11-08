import { AppDataSource } from "../config/AppDataSource.js";
import User from "../entities/user.entity.js";

const userReposository = AppDataSource.getRepository(User);
export const getAllUserService = async ()=> {
    const allUser = await userReposository.find();
    return allUser;
};
/* export const getUserByIDService = async ()=> {
    const userFinded = await userReposository.findOneBy("id");
    return userFinded;
};
 */


