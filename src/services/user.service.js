import { arrayBuffer } from "node:stream/consumers";
import { AppDataSource } from "../config/AppDataSource.js";
import User from "../entities/user.entity.js";
import infoUsers from "../utils/infoUsers.js";

const userReposository = AppDataSource.getRepository(User);

export const getAllUserService = async ()=> {
    const allUser = await userReposository.find();
    const withoutPasswordAllUser =  allUser.map((user) =>{
        const {password, ...withoutPasswordUser}   = user;
        return withoutPasswordUser
    })
    return withoutPasswordAllUser;
};

export const getUserByIDService = async (id)=> {
    const userFinded = await userReposository.findOneBy({id: id});
    const {password, ...withoutPasswordUser } = userFinded;
    return withoutPasswordUser;
};

export const getSpecificUsersService = async (info)=> {
    
    const searchInfo = {}

    if(info.cedula) searchInfo.cedula = info.cedula;
    if(info.name) searchInfo.name = info.name;
    if(info.lastName) searchInfo.lastName = info.lastName;
    if(info.birthdate) searchInfo.birthdate = info.birthdate;
    if(info.administrador) searchInfo.administrador = info.administrador;
    
    
    const allUser = await userReposository.find({
        where: searchInfo
    });

    const withoutPasswordAllUser =  allUser.map((user) =>{
        const {password, ...withoutPasswordUser}   = user;
        return withoutPasswordUser;
    });
    return withoutPasswordAllUser;
};



export const modifeUserRolService = async(id/* , rol */) =>{
    const userFinded = await userReposository.findOneBy({id});
    if(!userFinded) throw new Error(`El usuario con el id ${id} no existe`);

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