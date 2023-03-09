import { prisma } from './prisma-client';
import express from 'express';

const gameRouter = express.Router();

gameRouter.get('/games', async (request, response) =>{
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

export default gameRouter;