import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/AuthService';
import { ConfigService } from 'config/ConfigService';
import { Logger } from 'logger/Logger';

@Injectable()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService, private readonly logger: Logger, config: ConfigService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromHeader("authorization"),
                passReqToCallback: true,
                secretOrKey: config.get('JWT_SECRET'),
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done(new UnauthorizedException(), false);
        }
        done(null, payload);
    }
}