import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from 'user/service/UserService';
import LoginForm from '../form/LoginForm';
import { ConfigService } from 'config/ConfigService';
import { Logger } from 'logger/Logger';

@Injectable()
export class AuthService {

    private readonly config;

    constructor(private readonly userService: UserService, private readonly logger: Logger, config: ConfigService) {
        this.config = config
    }

    async createToken(form: LoginForm) {
        const secretOrKey = this.config.get('JWT_SECRET');
        const user = await this.userService.findUserByMobileNo(form.userName);
        // check password here
        try {
            const token = jwt.sign(JSON.stringify(user), secretOrKey);
            this.logger.log('Token created');
            return { token };
        } catch (error) {
            this.logger.error('Error while creating Token');
        }
    }

    async validateUser(signedUser): Promise<boolean> {
        const user = await this.userService.findUserByMobileNo(signedUser.mobileNo);
        if (!user)
            return false;
        return true;
    }

    async generateOTP(mobileNo) {
        ;
    }
}