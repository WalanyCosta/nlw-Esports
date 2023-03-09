import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import {adRouter, gameRouter} from './controllers';

const app = express();

app.use(express.json());
app.use(cors());
app.use(adRouter)
app.use(gameRouter)

app.listen(3333, ()=>{
    console.log('Servidor está rodando na port:3333')
})