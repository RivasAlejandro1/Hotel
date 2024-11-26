import { compare } from "bcrypt";
import { AppDataSource } from "../config/AppDataSource.js";
import reservationEntity from "../entities/reservation.entity.js";
import infoReservations from "../utils/infoReservations.js";
import { compareAsc } from "date-fns";
import roomEntity from "../entities/room.entity.js";

const reservationRepository = AppDataSource.getRepository(reservationEntity);
const roomRepository = AppDataSource.getRepository(roomEntity);


export const getAllReservationsService =  async () =>{
    const allReservations = await reservationRepository.find();
    return allReservations;
}




export const searchAvailableReservartionService =  async(searchEntryDate, searchDepartuceDate) =>{
    
    
    const searchE = new Date(searchEntryDate);
    const searchD = new Date(searchDepartuceDate);
    const allReservations = await reservationRepository.find({
        relations:{
            room: true
        }
    });
    let allRooms = await roomRepository.find();
    const removeRoom = (id) =>{
        allRooms = allRooms.filter(room => room.id != id);
    }

    
    //* filter inavailable reservation
    for(const reservation of allReservations){
            const {entryDate, departureDate, room} = reservation;
            
            const Entry = new Date(entryDate);
            const Departuce = new Date(departureDate);
            //* Comparar que no inicien o acaben en la misma fecha
            if(compareAsc(Entry, searchE) == 0 || compareAsc(Departuce, searchD) == 0) {
                removeRoom(room.id);
                continue
            }

            //* Comparar que el inicio o el final no esten en el intervalo de tiempo de otras fechas
            if(compareAsc(Entry, searchE) == 1 && compareAsc(Entry, searchD) == -1) {
                removeRoom(room.id);
                continue
            }
            if(compareAsc(Departuce, searchE) == 1 && compareAsc(Departuce, searchD) == -1) {
                removeRoom(room.id);
                continue
            }

            //* Comparar que otro intervalo no esten dentro del intervalo que estamos buscando
            if(compareAsc(Entry, searchE) == -1 && compareAsc(Departuce, searchD) == 1) {
                removeRoom(room.id);
                continue
            }

    }

    return allRooms; 

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