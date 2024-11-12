import { AppDataSource } from "../config/AppDataSource.js";
import userEntity from "../entities/user.entity.js";
import User from "../entities/user.entity.js";
import infoUsers from "../utils/infoUsers.js";

const userReposository = AppDataSource.getRepository(User);

export const getAllUserService = async ()=> {
    const allUser = await userReposository.find();
    return allUser;
};

export const getUserByIDService = async (id)=> {
    const userFinded = await userReposository.findOneBy({id});
    return userFinded;
};

export const createUserService = async (user)=> {
    const newUser = {...user, administrador: false}
    console.log(newUser);
    const userFinded = await userReposository.save(newUser);
    return userFinded;
};

export const modifeUserService = async (id, user)=> {
    const userFinded = await userReposository
    .update(
        {id},
        user
    );
    return userFinded;
};



export const userSeederService = async ()=> {

     await Promise.all(
        infoUsers.map( async(user) => {
        
        await userReposository.save(user);
    })) 

    return "¡User seeder done!";
};


