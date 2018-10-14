import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserMatchTeamService } from '../service/UserMatchTeamService';
import handleError from 'utils/ErrorHandler';
import UserMatchTeamForm from '../form/UserMatchTeamForm';
import { Logger } from 'logger/Logger';
import SuccessResponse from 'common/model/SuccessResponse';
import { UserMatchTeam } from '../interface/UserMatchTeam';

@Controller('api/cricket')
export class UserMatchTeamController {
  constructor(private readonly userMatchTeamService: UserMatchTeamService, private readonly logger: Logger) { }

  @Get('usermatchteam/:match/:account')
  async userMatchTeam(@Req() req, @Param() params): Promise<any> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting usermatchteam list')
    return await this.userMatchTeamService.getUserMatchTeamForMatchAndUserAccount(params.match, params.account)
      .catch(error => handleError(error));
  }

  @Post('usermatchteam')
  async updateUserAccount(@Req() req, @Body() form: UserMatchTeamForm): Promise<any> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting update usermatchteam')
    return await this.userMatchTeamService.saveUserMatchTeam(form)
      .catch(error => handleError(error));

  }
}