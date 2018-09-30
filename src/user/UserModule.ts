import { Module, CacheModule, } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { DatabaseModule } from 'db/DatabaseModule';
import { UserProvider } from './providers/UserProvider';
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';
import { UserAccountModule } from 'useraccount/UserAccountModule';
import { UserSettingProvider } from './providers/UserSettingProvider';
import { UserSettingService } from './service/UserSettingService';
import { UserSettingController } from './controller/UserSettingController';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, UserAccountModule , CacheModule.register()],
  controllers: [UserController, UserSettingController,],
  providers: [UserService, UserSettingService,
    ...UserProvider,
    ...UserSettingProvider
  ],
  exports: [UserService,]
})
export class UserModule { }
