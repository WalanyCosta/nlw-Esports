import express, { NextFunction, Request, Response } from 'express';
import { convertHourStringToMinute } from '../utils/convert-hour-string-to-minute';
import { convertHourMinutesToHourString } from '../utils/convert-minutes-to-hour-string';
import { prisma } from './prisma-client';
import * as z from 'zod'; 
import { AnyZodObject, string } from 'zod';

const adRouter = express.Router();

const dataSchema = z.object({ 
    params: z.object({
        id: string({
            invalid_type_error: 'id is string',
            required_error: 'id is necessary'
        }).min(5, {message: 'id is empty'})
    }).optional(),
    body: z.object({
        name: z.string({
            invalid_type_error: 'name is string',
            required_error: 'name is necessary'
        })
        .min(1, { message: 'name is empty' }),
        weekDays: z.number({
            invalid_type_error: 'weekDays is number array',
            required_error: 'weekDays is necessary'
        })
        .array()
        .min(1, {message: 'weekDays is empty'}),
        yearsPlaying: z.number({
            invalid_type_error: 'name is number',
            required_error: 'yearsPlaying is necessary'
        }),
        hourStart: z.string({
            invalid_type_error: 'hourStart is string',
            required_error: 'hourStart is necessary'
        })
        .min(1, {message: 'hourStart is empty'}),
        hourEnd: z.string({
            invalid_type_error: 'hourEnd is string',
            required_error: 'hourEnd is necessary'
        })
        .min(1, { message: 'hourEnd is empty' }),
        discord: z.string({
            invalid_type_error: 'discord is string',
            required_error: 'discord is  necessary'
        })
        .min(1, { message: 'discord is empty' }),
        UseVoiceChannel: z.boolean({
            invalid_type_error: 'useVoiceChanner is boolean',
            required_error: 'UseVoiceChannel is necessary'
        })
    }).optional()
})

const validate = (schema: AnyZodObject) => async function (req: Request, res: Response, next: NextFunction){
    try {
        await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query
        })
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }    
} 

adRouter.get('/games/:id/ads', validate(dataSchema), async (request, response) => {
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

adRouter.get('/ads/:id/discord', validate(dataSchema), async (request, response) => {
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

adRouter.post('/games/:id/ads', validate(dataSchema), async (request, response) => {
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