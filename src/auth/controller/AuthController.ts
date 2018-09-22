import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import { AuthService } from 'auth/service/AuthService';
import LoginForm from '../form/LoginForm';
import { Logger } from 'logger/Logger';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly logger: Logger) { }

    @Post('login')
    async login(@Body() form: LoginForm): Promise<any> {
        this.logger.log('Create Token request')
        return await this.authService.createToken(form)
            .catch(error => handleError(error));
    }
}