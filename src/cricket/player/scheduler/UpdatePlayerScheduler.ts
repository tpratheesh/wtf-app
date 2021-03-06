import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdatePlayerJob } from '../job/UpdatePlayerJob';

@Injectable()
export class UpdatePlayerScheduler extends NestSchedule {
    constructor(private readonly updatePlayerJob: UpdatePlayerJob, private readonly logger: Logger) {
        super();
    }

    //@Interval(2000)
    intervalJob() {
        console.log('UpdatePlayerScheduler job');
        this.updatePlayerJob.parseAndUpdatePlayers();
        return true;
    }
}