import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { DatabaseModule } from 'db/DatabaseModule'
import { AuthModule } from 'auth/AuthModule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from 'user/UserModule';

@Module({
    imports: [AuthModule, DatabaseModule, UserModule, CacheModule.register()],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        }],
})
export class AppModule { }
