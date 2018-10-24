import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { GetLiveScoreJob } from '../job/GetLiveScoreJob';

@Injectable()
export class GetLiveScoreScheduler extends NestSchedule {
    constructor(private readonly getLiveScoreJob: GetLiveScoreJob) {
        super();
    }

    @Interval(20000)
    intervalJob() {
        console.log('parseAndGetLiveScore');
        this.getLiveScoreJob.parseAndGetLiveScore();
        return false;
    }
}