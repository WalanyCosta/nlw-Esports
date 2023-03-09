import express from 'express';
import { convertHourStringToMinute } from '../utils/convert-hour-string-to-minute';
import { convertHourMinutesToHourString } from '../utils/convert-minutes-to-hour-string';
import { prisma } from './prisma-client';

const adRouter = express.Router();

adRouter.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            UseVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where:{
            gameId,
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertHourMinutesToHourString(ad.hourStart),
            hourEnd: convertHourMinutesToHourString(ad.hourEnd),
        }
    }))
})

adRouter.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const { discord } = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord
    })
})

adRouter.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinute(body.hourStart),
            hourEnd: convertHourStringToMinute(body.hourEnd),
            UseVoiceChannel: false
        }
    })

    return response.status(201).json(ad)
})

export default adRouter;