import express, { json } from 'express';
import cors from 'cors';

import registersRouter from './routes/registers.Routes.js';
import authRouter from './routes/auth.Routes.js';

const server = express();
server.use(cors());
server.use(json());

server.use(authRouter);
server.use(registersRouter);

server.listen(5000);