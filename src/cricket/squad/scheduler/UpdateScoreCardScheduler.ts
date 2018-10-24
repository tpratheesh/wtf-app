import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateScoreCardJob } from '../job/UpdateScoreCardJob';

@Injectable()
export class UpdateScoreCardScheduler extends NestSchedule {
    constructor(private readonly updateScoreCardJob: UpdateScoreCardJob, private readonly logger: Logger) {
        super();
    }

    // @Interval(1000)
    intervalJob() {
        console.log('UpdateScoreCardScheduler job');
        this.updateScoreCardJob.parseAndUpdateScoreCard();
        return true;
    }
}