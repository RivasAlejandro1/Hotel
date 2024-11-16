import { getAllRoomsService } from "../services/room.service.js";

export const getAllRoomsController =  async (req, res) =>{
    try{
        const allRoom = await getAllRoomsService();
        res.status(200).send(allRoom);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}
