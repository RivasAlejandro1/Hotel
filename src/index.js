import server from "./server.js";
import "reflect-metadata";
const PORT = 3000;
import { AppDataSource } from "./config/AppDataSource.js";

AppDataSource.initialize()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}`)
      })
    })
    .catch((error) => console.log(error))