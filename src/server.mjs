import express from 'express';
import router from './routers/index.mjs';
const server = express();

server.use(router);

export default server;
