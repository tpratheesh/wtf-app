import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from '../service/UserService';
import handleError from 'utils/ErrorHandler';
import { Logger } from 'logger/Logger';
import { UserSettingService } from '../service/UserSettingService';

@Controller('api')
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService, private readonly logger: Logger) { }

  @Get('usersetting')
  async userList(@Req() req): Promise<any> {
    const userName = req.user.name
    const userId = req.user._id
    this.logger.log('User ' + userName + ' requesting user list')
    return await this.userSettingService.getUserSettings(userId)
      .catch(error => handleError(error));
  }

  @Post('usersetting/selectedUserAccount/update/:value')
  async updateUserSetting(@Req() req, @Param() params): Promise<any> {
    const userName = req.user.name
    const userId = req.user._id
    this.logger.log('User ' + userName + ' requesting update user setting')
    return await this.userSettingService.updateSelectedUserAccount(userId, params.value)
      .catch(error => handleError(error));
  }
}