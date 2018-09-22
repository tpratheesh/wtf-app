import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import handleError from 'utils/ErrorHandler';
import { AuthService } from 'auth/service/AuthService';
import LoginForm from '../form/LoginForm';
import { Logger } from 'logger/Logger';
import SuccessResponse from 'user/model/common/SuccessResponse';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly logger: Logger) { }

    @Post('login')
    async login(@Body() form: LoginForm): Promise<any> {
        this.logger.log('Create Token request')
        return await this.authService.createToken(form)
            .catch(error => handleError(error));
    }

    @Post('otp/generate/:mobileNo')
    async otpRequest(@Param() params): Promise<SuccessResponse> {
        this.logger.log('Create Token request')
        await this.authService.generateOTP(params.mobileNo)
            .catch(error => handleError(error));
        return new SuccessResponse('We have generated a OTP for you. You will receive OTP in your mobile number.');
    }
}