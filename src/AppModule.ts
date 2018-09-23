import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { DatabaseModule } from 'db/DatabaseModule'
import { AuthModule } from 'auth/AuthModule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from 'user/UserModule';
import { CricketModule } from 'cricket/CricketModule';
import { CommonModule } from 'common/CommonModule';

@Module({
    imports: [AuthModule, DatabaseModule, UserModule, CricketModule, CommonModule, CacheModule.register()],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        }],
})
export class AppModule { }
