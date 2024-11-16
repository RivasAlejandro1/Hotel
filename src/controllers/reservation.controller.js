import { getAllReservationsService } from "../services/reservation.service.js";

export const getAllReservationsController =  async (req, res) =>{
    try{
        const allReservation = await getAllReservationsService();
        res.status(200).send(allReservation);
    }
    catch(error){
        res.status(404).send(error.message);
    }

}
