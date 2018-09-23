import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from '../service/UserService';
import handleError from 'utils/ErrorHandler';
import UserForm from '../form/UserForm';
import { Logger } from 'logger/Logger';
import SuccessResponse from 'common/model/SuccessResponse';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService, private readonly logger: Logger) { }

  @Get('user/list')
  async userList(@Req() req): Promise<any> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting user list')
    return await this.userService.getUsers()
      .catch(error => handleError(error));
  }

  @Put('user')
  async createUser(@Req() req, @Body() userForm: UserForm): Promise<SuccessResponse> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting create new user')
    userForm.createdBy = userName
    await this.userService.saveUser(userForm)
      .catch(error => handleError(error));
    return new SuccessResponse('User Created Successfully');
  }

  @Post('user')
  async updateUser(@Req() req, @Body() userForm: UserForm): Promise<SuccessResponse> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting update user')
    await this.userService.updateUser(userForm)
      .catch(error => handleError(error));
    return new SuccessResponse('User Updated Successfully');
  }

  @Get('user/:id')
  async getUserById(@Req() req, @Param() params): Promise<any> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting get user by ID')
    return await this.userService.getUserById(params.id)
      .catch(error => handleError(error));
  }

  @Delete('user/:id')
  async deleteUser(@Req() req, @Param() params): Promise<SuccessResponse> {
    const userName = req.user.name
    this.logger.log('User ' + userName + ' requesting delete user by ID')
    await this.userService.deleteUser(params.id)
      .catch(error => handleError(error));
    return new SuccessResponse('User Deleted Successfully');
  }
}