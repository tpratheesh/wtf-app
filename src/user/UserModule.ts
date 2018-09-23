import { Module, CacheModule, } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { DatabaseModule } from 'db/DatabaseModule';
import { UserProvider } from './providers/UserProvider';
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [UserController,],
  providers: [UserService,
    ...UserProvider,
  ],
  exports: [UserService,]
})
export class UserModule { }
