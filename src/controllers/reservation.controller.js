import { 
    getAllInfoRoomsService, 
    getAllReservationsService, 
    getSpecificReservationService, 
    makeAReservationService, 
    searchAvailableReservartionService, 
    searchSpecificAvailableRoomService 
} from "../services/reservation.service.js";

export const getAllReservationsController =  async (req, res) =>{
    try{
        const allReservation = await getAllReservationsService();
        res.status(200).send(allReservation);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}
export const getSpecificReservationController = async (req, res) =>{
    try{
        const findedReservations =  await getSpecificReservationService(req.body);
        res.status(200).send(findedReservations);
    }
    catch(error){
        res.status(404).send(
            {
                error: error.message
            });
    }
}

export const getAllInfoRoomsController = async (req, res) =>{
    try{
        const  { entryDate, departureDate} = req.body;
        const result =  await getAllInfoRoomsService({
            entryDate, 
            departureDate
        });
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

export const searchAvailableReservartionController =  async (req, res) =>{
    try{
        const {entryDate, departureDate, type } = req.body;
        const allReservation = await searchAvailableReservartionService(entryDate, departureDate, type);
        res.status(200).send(allReservation);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}

export const searchSpecificAvailableRoomController =  async (req, res) =>{
    try{
        const {entryDate, departureDate, type, price, equal } = req.body;
        const info = {
            entryDate, 
            departureDate,
             type,
            price,
            equal
        };
        const allReservation = await searchSpecificAvailableRoomService(info);
        res.status(200).send(allReservation);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}

export const makeAReservationController = async (req, res) =>{
    try{
        const  { entryDate, departureDate, roomId, userId} = req.body;
        const result =  await makeAReservationService({
            entryDate, 
            departureDate,
            roomId,
            userId
        })
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send(error.message);
    }
}





