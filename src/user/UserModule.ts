import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { DatabaseModule } from 'db/DatabaseModule'
import { UserProvider } from './providers/UserProvider';
import { LoggerModule } from 'logger/LoggerModule';

@Module({
  imports: [DatabaseModule, LoggerModule, CacheModule.register()],
  controllers: [UserController,],
  providers: [UserService,
    ...UserProvider,
  ],
  exports: [UserService,]
})
export class UserModule { }
