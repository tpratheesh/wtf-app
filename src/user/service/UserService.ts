import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/User';
import UserForm from '../form/UserForm';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { UserAccountService } from 'useraccount/service/UserAccountService';
import UserAccountForm from 'useraccount/form/UserAccountForm';
import { UserSettingService } from './UserSettingService';

@Injectable()
export class UserService {

  constructor(
    @Inject('UserModelToken')
    private readonly User: Model<User>,
    private readonly userAccountService: UserAccountService,
    private readonly userSettingService: UserSettingService,
    private readonly logger: Logger) { }

  async getUsers(): Promise<User[]> {
    return await this.User.find();
  }

  async saveUser(form: UserForm): Promise<User> {
    const user = new this.User(form);
    return await user.save();
  }

  async updateUser(form: UserForm): Promise<User> {
    const User = await this.User.findById(form.id);
    if (User == null) {
      throw new AppError('Invalid User')
    }
    return await this.User.findOneAndUpdate({ _id: form.id }, form);
  }

  async getUserById(userId: String): Promise<User> {
    const user = await this.User.findById(userId);
    if (user == null) {
      throw new AppError('Invalid User')
    }
    return user;
  }

  async deleteUser(userId: Number) {
    const user = await this.User.findById(userId);
    if (user == null) {
      throw new AppError('Invalid User')
    }
    await this.User.findByIdAndDelete({ _id: userId });
  }

  async findUserByMobileNo(mobileNo: String): Promise<User> {
    let user = await this.User.findOne({ mobileNo: mobileNo })
    if (user == null) {
      user = await this.saveUser(new UserForm(mobileNo));
      let form = new UserAccountForm('default', 'Default Account created for all Users');
      form.user = user._id
      const userAccount = await this.userAccountService.saveUserAccount(form);
      this.userSettingService.createUserSettings(user._id, userAccount._id);
    }
    return user;
  }
}