import { AppDataSource } from "../config/AppDataSource.js";
import roomEntity from "../entities/room.entity.js";
import infoRooms from "../utils/infoRooms.js";
 

const roomRepository = AppDataSource.getRepository(roomEntity);


export const getAllRoomsService =  async () =>{
    const allrooms = await roomRepository.find();
    return allrooms;
}
export const createRoomService = async (room)=> {
    const existRoom = await roomRepository.existsBy({numero: room.numero});
    if(existRoom) throw new Error(`Ya existe una habitación con el numero ${room.numero} `)
    const roomFinded = await roomRepository.save(room);
    return roomFinded;
};



export const roomSeederService = async ()=> {
    await Promise.all(
       infoRooms.map( async(room) => {
       await roomRepository.save(room);
   })) 

   return "¡Room Seeder done!";
};

