import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) =>{
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select:{
                    ads: true,
                }
            }
        }
    });
    return response.json(games);
});


app.listen(3333, ()=>{
    console.log('Servidor rodando...')
})