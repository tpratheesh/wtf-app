import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { GetLiveScoreJob } from '../job/GetLiveScoreJob';

@Injectable()
export class GetLiveScoreScheduler extends NestSchedule {
    constructor(private readonly getLiveScoreJob: GetLiveScoreJob, private readonly logger: Logger) {
        super();
    }

    @Interval(10000)
    intervalJob() {
        this.getLiveScoreJob.parseAndGetLiveScore();
        return false;
    }
}