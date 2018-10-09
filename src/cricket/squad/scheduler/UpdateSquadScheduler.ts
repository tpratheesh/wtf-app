import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateSquadJob } from '../../squad/job/UpdateSquadJob';

@Injectable()
export class UpdateSquadScheduler extends NestSchedule {
    constructor(private readonly updateMatchJob: UpdateSquadJob, private readonly logger: Logger) {
        super();
    }

    @Interval(1000)
    intervalJob() {
        console.log('UpdateSquadScheduler job');
        this.updateMatchJob.parseAndUpdateSquadList();
        return true;
    }
}