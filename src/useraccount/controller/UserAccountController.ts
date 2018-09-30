import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserAccountService } from '../service/UserAccountService';
import handleError from 'utils/ErrorHandler';
import UserForm from '../form/UserAccountForm';
import { Logger } from 'logger/Logger';
import SuccessResponse from 'common/model/SuccessResponse';

@Controller('api')
export class UserAccountController {
  constructor(private readonly userService: UserAccountService, private readonly logger: Logger) { }

  @Get('useraccount/list')
  async userAccountList(@Req() req): Promise<any> {
    const userName = req.user.name
    const userId = req.user._id
    this.logger.log('User ' + userName + ' requesting user account list')
    return await this.userService.getUserAccounts(userId)
      .catch(error => handleError(error));
  }

  @Put('useraccount')
  async createUserAccount(@Req() req, @Body() userForm: UserForm): Promise<SuccessResponse> {
    const userName = req.user.name
    const userId = req.user._id
    this.logger.log('User ' + userName + ' requesting create new user account')
    userForm.user = userId
    await this.userService.saveUserAccount(userForm)
      .catch(error => handleError(error));
    return new SuccessResponse('User Created Successfully');
  }

  @Post('useraccount')
  async updateUserAccount(@Req() req, @Body() userForm: UserForm): Promise<SuccessResponse> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting update user account')
    await this.userService.updateUserAccount(userForm)
      .catch(error => handleError(error));
    return new SuccessResponse('User Updated Successfully');
  }

  @Get('useraccount/:id')
  async getUserAccountById(@Req() req, @Param() params): Promise<any> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting get user account by ID')
    return await this.userService.getUserAccountById(params.id)
      .catch(error => handleError(error));
  }

  @Delete('useraccount/:id')
  async deleteUserAccount(@Req() req, @Param() params): Promise<SuccessResponse> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting delete user account by ID')
    await this.userService.deleteUserAccount(params.id)
      .catch(error => handleError(error));
    return new SuccessResponse('User Deleted Successfully');
  }
}