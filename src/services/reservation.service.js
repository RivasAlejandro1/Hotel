import { AppDataSource } from "../config/AppDataSource.js";
import reservationEntity from "../entities/reservation.entity.js";
import infoReservations from "../utils/infoReservations.js";

const reservationRepository = AppDataSource.getRepository(reservationEntity);


export const getAllReservationsService =  async () =>{
    const allReservations = await reservationRepository.find();
    return allReservations;
}


export const reservationSeederService = async (users, rooms)=> {
    let count = 0;
    await Promise.all(
        infoReservations.map( async(reservation) => {
           if(count > 2) count = 0;
           reservation.user = users[count];
           reservation.room = rooms[count];
           count = count +1;
            await reservationRepository.save(reservation);
   })) 

   console.log("¡reservation Seeder done!");
};