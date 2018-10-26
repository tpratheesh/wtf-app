import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { Logger } from 'logger/Logger';
import { UpdateSeriesJob } from '../job/UpdateSeriesJob';

@Injectable()
export class UpdateSeriesScheduler extends NestSchedule {
    constructor(private readonly updateSeriesJob: UpdateSeriesJob, private readonly logger: Logger) {
        super();
    }

    @Cron('0 0 15 ? * * *')
    intervalJob() {
        console.log('UpdateSeriesScheduler job');
        this.updateSeriesJob.parseAndUpdateSeriesList();
        return true;
    }
}