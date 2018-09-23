import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateTeamJob } from '../job/UpdateTeamJob';

@Injectable()
export class UpdateTeamScheduler extends NestSchedule {
    constructor(private readonly updateTeamJob: UpdateTeamJob, private readonly logger: Logger) {
        super();
    }

    @Interval(2000)
    intervalJob() {
        console.log('interval job');
        this.updateTeamJob.parseAndUpdateTeams();
        return true;
    }
}