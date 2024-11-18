import server from "./server.js";
import "reflect-metadata";
const PORT = 3000;
import { AppDataSource } from "./config/AppDataSource.js";
import { getAllUserService, userSeederService } from "./services/user.service.js";
import { getAllRoomsService, roomSeederService } from "./services/room.service.js";
import { credentialSeederService } from "./services/credential.service.js";
import { reservationSeederService } from "./services/reservation.service.js";

AppDataSource.initialize()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
      })
    })
    .then(async () =>{
      const users = await getAllUserService();
      if(users.length == 0){
        await credentialSeederService();
        await roomSeederService();
        const users = await getAllUserService();
        const rooms = await getAllRoomsService();
        reservationSeederService(users, rooms);
      }
    })
    .catch((error) => console.log(error))