import { getAllReservationsService, searchAvailableReservartionService } from "../services/reservation.service.js";

export const getAllReservationsController =  async (req, res) =>{
    try{
        const allReservation = await getAllReservationsService();
        res.status(200).send(allReservation);
    }
    catch(error){
        res.status(404).send(error.message);
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

