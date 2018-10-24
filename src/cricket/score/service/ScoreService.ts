import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import * as moment from 'moment';
import { Tedis } from "redis-typescript";

@Injectable()
export class ScoreService {

    constructor() { }

    private readonly redisClient = new Tedis({
        port: 16442,
        host: "redis-16442.c72.eu-west-1-2.ec2.cloud.redislabs.com",
        password: "qBsRPeLeQWVZczYOcc5GC1n4DJZrFAqu"
    })

    async getLiveMatches(): Promise<any> {
        const matches = await this.redisClient.get('matches');
        if (typeof matches == "string")
            return JSON.parse(matches)
        else
            return []
    }

    async setLiveMatches(liveMatches): Promise<any> {
        await this.redisClient.set('matches', JSON.stringify(liveMatches));
    }
}