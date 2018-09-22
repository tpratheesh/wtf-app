import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { DatabaseModule } from 'db/DatabaseModule'
import { AuthModule } from 'auth/AuthModule';
import { UserProvider } from './providers/UserProvider';
import { LoggerModule } from 'logger/LoggerModule';

@Module({
  imports: [DatabaseModule, AuthModule, LoggerModule, CacheModule.register()],
  controllers: [UserController,],
  providers: [UserService,
    ...UserProvider,
  ],
})
export class UserModule { }
