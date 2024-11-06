import { DataSource } from "typeorm"
import "dotenv/config"
import User from "../entities/user.entity.js";


export const PASSWORD= process.env.PASSWORD;
export const DATABASE= process.env.DATABASE;
export const INFOUSER= process.env.INFOUSER;
export const PORT_DATABASE = Number(process.env.PORT_DATABASE);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: PORT_DATABASE,
    username: INFOUSER,
    password: PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})