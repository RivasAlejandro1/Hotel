import { AppDataSource } from "../config/AppDataSource.js";
import User from "../entities/user.entity.js";
import infoUsers from "../utils/infoUsers.js";

const userReposository = AppDataSource.getRepository(User);

export const getAllUserService = async ()=> {
    const allUser = await userReposository.find();
    return allUser;
};

export const getUserByIDService = async (id)=> {
    const userFinded = await userReposository.findOneBy({id: id});
    return userFinded;
};



export const modifeUserRolService = async(id/* , rol */) =>{
    const userFinded = await userReposository.findOneBy({id});
    if(!userFinded) throw new Error(`El usuario con el id ${id} no existe`);
    /* const result = await userReposository.update(
        {id},
        {rol}
    ); */

    const result = await userReposository.update(
        {id},
        {administrador: !userFinded.administrador}
    );
    
    return result;
}

export const modifeUserService = async (id, changesUser)=> {
    const existUser = await userReposository.existsBy({id});
    if(!existUser) throw new Error(`El usuario con el id ${id} no existe`);
    const result = await userReposository
    .update(
        {id},
        changesUser
    );
    return result;
};



export const userSeederService = async ()=> {

     await Promise.all(
        infoUsers.map( async(user) => {
        
        await userReposository.save(user);
    })) 

    return "¡User seeder done!";
};


/* //? No se esta usando
export const createUserService = async (user)=> {
    const newUser = {...user, administrador: false}
    console.log(newUser);
    const userFinded = await userReposository.save(newUser);
    return userFinded;
}; */