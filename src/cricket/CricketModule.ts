import { Module, CacheModule, } from '@nestjs/common';
import { TeamController } from './controller/TeamController';
import { DatabaseModule } from 'db/DatabaseModule'
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';
import { TeamService } from './service/TeamService';
import { TeamProvider } from './providers/TeamProvider';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [TeamController,],
  providers: [TeamService,
    ...TeamProvider],
})
export class CricketModule { }
