import { Module, HttpModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './service/AuthService';
import { JwtStrategy } from './strategy/JwtStrategy';
import { JwtUser } from './model/JwtUser';
import { ConfigModule } from 'config/ConfigModule';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/AuthController';
import * as passport from 'passport';
import { LoggerModule } from 'logger/LoggerModule';
import { UserModule } from 'user/UserModule';
import LoginForm from './form/LoginForm';
import { CommonModule } from 'common/CommonModule';

@Module({
    imports: [HttpModule, ConfigModule, LoggerModule, UserModule, CommonModule, JwtModule.register({ secretOrPrivateKey: 'key' }),],
    providers: [AuthService, JwtStrategy, JwtUser, LoginForm],
    exports: [JwtUser, LoginForm],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/api/*', method: RequestMethod.ALL });
    }
}