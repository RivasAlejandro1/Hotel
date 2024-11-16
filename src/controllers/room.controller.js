import { createRoomService, getAllRoomsService } from "../services/room.service.js";

export const getAllRoomsController =  async (req, res) =>{
    try{
        const allRoom = await getAllRoomsService();
        res.status(200).send(allRoom);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}

export const createRoomController =  async (req, res)=>{
    try{
        const roomCreated =  await createRoomService(req.body);
        res.status(201).send(roomCreated);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }
}