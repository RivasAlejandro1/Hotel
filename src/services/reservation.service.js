import { compare } from "bcrypt";
import { Brackets, Equal, LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm"
import { AppDataSource } from "../config/AppDataSource.js";
import reservationEntity from "../entities/reservation.entity.js";
import infoReservations from "../utils/infoReservations.js";
import { compareAsc } from "date-fns";
import roomEntity from "../entities/room.entity.js";
import userEntity from "../entities/user.entity.js";

const reservationRepository = AppDataSource.getRepository(reservationEntity);
const roomRepository = AppDataSource.getRepository(roomEntity);
const userRepository = AppDataSource.getRepository(userEntity);


export const getAllReservationsService =  async () =>{
    const allReservations = await reservationRepository.find();
    return allReservations;
}

export const searchSpecificAvailableRoomService = async(info) =>{
    
    const {entryDate, departureDate, price, equal, type} = info;



    const priceConditions = equal == 1 ?  "room.precio  >= :price" : "room.precio  <= :price";   


    
    const searchE = new Date(entryDate);
    const searchD = new Date(departureDate);

    const findedReservations = await reservationRepository
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.room", "room")
    .where(priceConditions , {price})
    .andWhere(
        new Brackets((qb) => {
            qb.where("room.tipo = :type", {type})
        }),
    )
    .getMany();

    let findedRooms = await roomRepository
    .createQueryBuilder("room")
    .where(priceConditions , {price})
    .andWhere("room.tipo = :type", {type})
    .getMany();

    const removeRoom = (id) =>{
        findedRooms = findedRooms.filter(room => room.id != id);
    }

    if(!entryDate && !departureDate) return findedRooms;
    if(Number.isNaN(Date.parse(entryDate))) return findedRooms;
    if(Number.isNaN(Date.parse(departureDate))) return findedRooms;
    for(const reservation of findedReservations){
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




    return findedRooms;
}

export const searchAvailableReservartionService =  async(searchEntryDate, searchDepartuceDate,type) =>{
    
    const objectRoom = {};

    if(type) objectRoom.tipo = type;objectRoom

    const searchE = new Date(searchEntryDate);
    const searchD = new Date(searchDepartuceDate);
    const allReservations = await reservationRepository.find({
        
        relations:{
            room: true
        },
        where:{
            room:{
                tipo:Equal(type), 
            }
        } ,
    });
    let allRooms = await roomRepository.find({
        where:objectRoom
    });
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

export const makeAReservationService = async ({userId, roomId, entryDate, departureDate}) => {
    
    const userExist = await userRepository.findOneBy({id:userId});
    const roomExist = await roomRepository.findOneBy({id:roomId});

    if(!userExist) throw new Error(`El usuario con el id ${userId} no exite`);
    if(!roomExist) throw new Error(`La habitación con el id ${roomId} no exite`);
    
    
    const newReservation = {
        userId,
        roomId,
        entryDate,
        departureDate
    };
    
    await reservationRepository.save(newReservation);
    
    return "La Reservación se ha realizado con exito";
}