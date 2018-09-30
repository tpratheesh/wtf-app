import { Module, CacheModule, } from '@nestjs/common';
import { UserAccountController } from './controller/UserAccountController';
import { UserAccountService } from './service/UserAccountService';
import { DatabaseModule } from 'db/DatabaseModule';
import { UserAccountProvider } from './providers/UserAccountProvider';
import { LoggerModule } from 'logger/LoggerModule';
import { CommonModule } from 'common/CommonModule';
import UserAccountForm from './form/UserAccountForm';

@Module({
  imports: [DatabaseModule, LoggerModule, CommonModule, CacheModule.register()],
  controllers: [UserAccountController,],
  providers: [UserAccountService, UserAccountForm,
    ...UserAccountProvider,
  ],
  exports: [UserAccountService, UserAccountForm]
})
export class UserAccountModule { }
