import { Module, CacheModule, } from '@nestjs/common';
import { TeamController } from './team/controller/TeamController';
import { DatabaseModule } from 'db/DatabaseModule'
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';
import { TeamService } from './team/service/TeamService';
import { TeamProvider } from './team/providers/TeamProvider';
import { UpdateTeamScheduler } from './team/scheduler/UpdateTeamScheduler';
import { UpdateTeamJob } from './team/job/UpdateTeamJob';
import { UpdatePlayerJob } from './player/job/UpdatePlayerJob';
import { PlayerService } from './player/service/PlayerService';
import { PlayerProvider } from './player/providers/PlayerProvider';
import { GetLiveScoreScheduler } from './score/scheduler/GetLiveScoreScheduler';
import { GetLiveScoreJob } from './score/job/GetLiveScoreJob';
import { SeriesService } from './series/service/SeriesService';
import { SeriesController } from './series/controller/SeriesController';
import { PlayerController } from './player/controller/PlayerController';
import { UpdateSeriesScheduler } from './series/scheduler/UpdateSeriesScheduler';
import { UpdateSeriesJob } from './series/job/UpdateSeriesJob';
import { SeriesProvider } from './series/providers/SeriesProvider';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [TeamController, PlayerController, SeriesController],
  providers: [TeamService, UpdateTeamScheduler, UpdateTeamJob, ...TeamProvider,
    PlayerService, UpdateTeamScheduler, UpdatePlayerJob, ...PlayerProvider,
    GetLiveScoreScheduler, GetLiveScoreJob,
    SeriesService, UpdateSeriesScheduler, UpdateSeriesJob, ...SeriesProvider],
})
export class CricketModule { }
