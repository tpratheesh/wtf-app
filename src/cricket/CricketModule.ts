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
import { SeriesService } from './series/service/SeriesService';
import { SeriesController } from './series/controller/SeriesController';
import { PlayerController } from './player/controller/PlayerController';
import { UpdateSeriesScheduler } from './series/scheduler/UpdateSeriesScheduler';
import { UpdateSeriesJob } from './series/job/UpdateSeriesJob';
import { SeriesProvider } from './series/providers/SeriesProvider';
import { MatchService } from './match/service/MatchService';
import { UpdateMatchJob } from './match/job/UpdateMatchJob';
import { MatchProvider } from './match/providers/MatchProvider';
import { UpdateMatchScheduler } from './match/scheduler/UpdateMatchScheduler';
import { MatchController } from './match/controller/MatchController';
import { UpdatePlayerScheduler } from './player/scheduler/UpdatePlayerScheduler';
import { SquadService } from './squad/service/SquadService';
import { SquadProvider } from './squad/providers/SquadProvider';
import { UpdateSquadScheduler } from './squad/scheduler/UpdateSquadScheduler';
import { UpdateSquadJob } from './squad/job/UpdateSquadJob';
import { SquadPlayerProvider } from './squad/providers/SquadPlayerProvider';
import { UserMatchTeamController } from './usermatchteam/controller/UserMatchTeamController';
import { UserMatchTeamService } from './usermatchteam/service/UserMatchTeamService';
import { UserMatchTeamProvider } from './usermatchteam/providers/UserMatchTeamProvider';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [TeamController, PlayerController, SeriesController, MatchController, UserMatchTeamController],
  providers: [TeamService, UpdateTeamScheduler, UpdateTeamJob, ...TeamProvider,
    PlayerService, UpdatePlayerScheduler, UpdatePlayerJob, ...PlayerProvider,
    SeriesService, UpdateSeriesScheduler, UpdateSeriesJob, ...SeriesProvider,
    MatchService, UpdateMatchScheduler, UpdateMatchJob, ...MatchProvider,
    SquadService, UpdateSquadScheduler, UpdateSquadJob, ...SquadProvider,
    ...SquadPlayerProvider,
    UserMatchTeamService, ...UserMatchTeamProvider
  ],
})
export class CricketModule { }
