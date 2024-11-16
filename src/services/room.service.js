import { AppDataSource } from "../config/AppDataSource.js";
import roomEntity from "../entities/room.entity.js";
 

const roomRepository = AppDataSource.getRepository(roomEntity);


export const getAllRoomsService =  async () =>{
    const allrooms = await roomRepository.find();
    return allrooms;
}