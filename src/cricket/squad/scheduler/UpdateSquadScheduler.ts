import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateMatchJob } from '../../match/job/UpdateMatchJob';

@Injectable()
export class UpdateSquadScheduler extends NestSchedule {
    constructor(private readonly updateMatchJob: UpdateMatchJob, private readonly logger: Logger) {
        super();
    }

    // @Interval(1000)
    intervalJob() {
        console.log('UpdateSquadScheduler job');
        this.updateMatchJob.parseAndUpdateMatchList();
        return true;
    }
}