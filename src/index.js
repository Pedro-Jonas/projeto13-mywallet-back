import express, { json } from 'express';
import cors from 'cors';

import { postSingup, postSingin } from './Controllers/authController.js';
import { postRegisters, getRegisters } from './Controllers/registersController.js';

const server = express();
server.use(cors());
server.use(json());

server.post('/sign-up', postSingup);

server.post('/sign-in', postSingin);

server.post('/registers', postRegisters);

server.get('/registers', getRegisters);

server.listen(5000);