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
import { UpdateScoreCardScheduler } from './squad/scheduler/UpdateScoreCardScheduler';
import { UpdateScoreCardJob } from './squad/job/UpdateScoreCardJob';
import { PlayerInningsProvider } from './squad/providers/PlayerInningsProvider';
import { InningsProvider } from './squad/providers/InningsProvider';
import { FieldingProvider } from './squad/providers/FieldingProvider';
import { BowlingProvider } from './squad/providers/BowlingProvider';
import { BattingProvider } from './squad/providers/BattingProvider';
import { InningsService } from './squad/service/InningsService';
import { PlayerInningsService } from './squad/service/PlayerInningsService';
import { BattingService } from './squad/service/BattingService';
import { BowlingService } from './squad/service/BowlingService';
import { SquadPlayerService } from './squad/service/SquadPlayerService';
import { FieldingService } from './squad/service/FieldingService';
import { GetLiveScoreScheduler } from './score/scheduler/GetLiveScoreScheduler';
import { GetLiveScoreJob } from './score/job/GetLiveScoreJob';
import { ScoreService } from './score/service/ScoreService';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [TeamController, PlayerController, SeriesController, MatchController, UserMatchTeamController],
  providers: [TeamService, UpdateTeamScheduler, UpdateTeamJob, ...TeamProvider,
    PlayerService, UpdatePlayerScheduler, UpdatePlayerJob, ...PlayerProvider,
    SeriesService, UpdateSeriesScheduler, UpdateSeriesJob, ...SeriesProvider,
    MatchService, UpdateMatchScheduler, UpdateMatchJob, ...MatchProvider,
    SquadService, UpdateSquadScheduler, UpdateSquadJob, ...SquadProvider,
    SquadPlayerService, ...SquadPlayerProvider,
    ...PlayerInningsProvider,
    InningsService, ...InningsProvider,
    ...FieldingProvider,
    ...BowlingProvider,
    ...BattingProvider,
    UserMatchTeamService, ...UserMatchTeamProvider,
    UpdateScoreCardScheduler, UpdateScoreCardJob,
    PlayerInningsService,
    BattingService,
    BowlingService,
    FieldingService,
    ScoreService, GetLiveScoreScheduler, GetLiveScoreJob
  ],
})
export class CricketModule { }
