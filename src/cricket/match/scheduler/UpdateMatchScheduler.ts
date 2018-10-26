import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateMatchJob } from '../job/UpdateMatchJob';

@Injectable()
export class UpdateMatchScheduler extends NestSchedule {
    constructor(private readonly updateMatchJob: UpdateMatchJob, private readonly logger: Logger) {
        super();
    }

    @Cron('0 10 15 ? * * *')
    intervalJob() {
        console.log('UpdateMatchScheduler job');
        this.updateMatchJob.parseAndUpdateMatchList();
        return true;
    }
}