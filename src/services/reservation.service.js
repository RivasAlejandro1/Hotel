import { Brackets, Equal} from "typeorm"
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
    const allReservations = await reservationRepository.find({
        relations:["user", "room"]
    });
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
    
    const userFinded = await userRepository.findOneBy({id:userId});
    const roomFinded = await roomRepository.findOneBy({id:roomId});

    if(!userFinded) throw new Error(`El usuario con el id ${userId} no exite`);
    if(!roomFinded) throw new Error(`La habitación con el id ${roomId} no exite`);
    
    const newReservation = reservationRepository.create({
            user: userFinded,
            room: roomFinded,
            entryDate,
            departureDate,
            paid: false
    });
    
    await reservationRepository.save(newReservation);
    
    return "La Reservación se ha realizado con exito";
}

//* Admin
export const getAllInfoRoomsService = async({ entryDate, departureDate}) => {
 
    const findedReservations= await reservationRepository
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.room", "room")
    .getMany();

    const allRooms = await roomRepository.find();

    let allAvailableRooms = [...allRooms];
    const allUnavailableRooms = [];

    
    
   
    for(const reservation of findedReservations){
        if(existeChoqueConElIntervalo(entryDate, departureDate, reservation.entryDate, reservation.departureDate)){
            allUnavailableRooms.push(reservation.room);
            allAvailableRooms = allAvailableRooms.filter((room) => room.id != reservation.room?.id);
        }
    }

    console.log([
        allAvailableRooms,
        allUnavailableRooms
    ])

    return  [
        allAvailableRooms,
        allUnavailableRooms
    ]
}



export const getSpecificReservationService = async (searchInfo)=> {
    
    const allReservations = await reservationRepository.find({
        where: searchInfo,
        relations: {
            user: true,
            room: true
        }
    });
    return allReservations;
};

export const deleteReservationService = async (id)=> {
    await reservationRepository.delete({
            id
    })
    return `¡La reservación con el id ${id} fue eliminada con exito!`
}


export const modifeReservationService = async(id, changes)=> {
    
    const existReservation = await reservationRepository.existsBy({id});
    if(!existReservation) throw new Error(`La Reservación con el id ${id} no existe`);
    const { roomId, ...AllChangues} = changes;
    if(changes.roomId) {
        const existRoom = await roomRepository.findOneBy({id});
        if(!existReservation) throw new Error(`La Habitación con el id ${id} no existe`);
        AllChangues.room = roomId;
        console.log("LOOK:")
    }
    
    console.log("AllChangues: ", AllChangues)


    await reservationRepository.update(   
        {id},
        AllChangues
    )
    return "La reservación se ha cambiado correctamente"

}


const existeChoqueConElIntervalo = (entryDate, departureDate, reservationEntryDate, reservationDepartureDate) =>{

    const searchE = new Date(entryDate);
    const searchD = new Date(departureDate);

    const Entry = new Date(reservationEntryDate);
    const Departuce = new Date(reservationDepartureDate);
    //* Comparar que no inicien o acaben en la misma fecha
    if(compareAsc(Entry, searchE) == 0 || compareAsc(Departuce, searchD) == 0) return true;

    //* Comparar que el inicio o el final no esten en el intervalo de tiempo de otras fechas
    if(compareAsc(Entry, searchE) == 1 && compareAsc(Entry, searchD) == -1) return true;
    if(compareAsc(Departuce, searchE) == 1 && compareAsc(Departuce, searchD) == -1) return true;

    //* Comparar que otro intervalo no esten dentro del intervalo que estamos buscando
    if(compareAsc(Entry, searchE) == -1 && compareAsc(Departuce, searchD) == 1) return true;

    return false
}