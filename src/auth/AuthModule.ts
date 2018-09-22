import { Module, HttpModule, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './service/AuthService';
import { UserService } from './service/UserService';
import { JwtStrategy } from './strategy/JwtStrategy';
import { User } from './model/User';
import { ConfigModule } from 'config/ConfigModule';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/AuthController';
import * as passport from 'passport';
import { LoggerModule } from 'logger/LoggerModule';

@Module({
    imports: [HttpModule, ConfigModule, LoggerModule, JwtModule.register({ secretOrPrivateKey: 'key' }),],
    providers: [AuthService, UserService, JwtStrategy, User],
    exports: [User, UserService,],
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