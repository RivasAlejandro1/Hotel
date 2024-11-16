import { AppDataSource } from "../config/AppDataSource.js";
import reservationEntity from "../entities/reservation.entity.js";
 

const reservationRepository = AppDataSource.getRepository(reservationEntity);


export const getAllReservationsService =  async () =>{
    const allReservations = await reservationRepository.find();
    return allReservations;
}