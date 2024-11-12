import express from 'express';
import router from './routers/index.js';
const server = express();


server.use(express.json());
server.use(router);

export default server;
