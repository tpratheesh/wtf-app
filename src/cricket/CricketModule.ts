import { Module, CacheModule, } from '@nestjs/common';
import { TeamController } from './team/controller/TeamController';
import { DatabaseModule } from 'db/DatabaseModule'
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';
import { TeamService } from './team/service/TeamService';
import { TeamProvider } from './team/providers/TeamProvider';
import { UpdateTeamScheduler } from './team/scheduler/UpdateTeamScheduler';
import { UpdateTeamJob } from './team/job/UpdateTeamJob';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [TeamController,],
  providers: [TeamService, UpdateTeamScheduler, UpdateTeamJob,
    ...TeamProvider],
})
export class CricketModule { }
