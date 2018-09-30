import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Logger } from 'logger/Logger';
import { UserSetting } from '../interface/UserSetting';
import AppError from 'exception/AppError';
import CreateUserSettingForm from '../form/CreateUserSettingForm';
import { UserAccount } from 'useraccount/interface/UserAccount';

@Injectable()
export class UserSettingService {

  constructor(
    @Inject('UserSettingModelToken')
    private readonly UserSetting: Model<UserSetting>,
    private readonly logger: Logger) { }

  async getUserSettings(userId: String): Promise<UserSetting> {
    return await this.UserSetting.findOne({ user: userId });
  }

  async createUserSettings(userId, selectedUserAccount) {
    const userSettingForm = new CreateUserSettingForm(selectedUserAccount, 'default', userId);
    const userSetting = new this.UserSetting(userSettingForm);
    return await userSetting.save();

  }

  async updateSelectedUserAccount(userId: String, selectedUserAccount: String): Promise<UserSetting> {
    let userSetting = await this.getUserSettings(userId);
    if (userSetting == null) {
      throw new AppError('Invalid User')
    }
    userSetting.selectedUserAccount = selectedUserAccount;
    userSetting.save();
    return await this.getUserSettings(userId);
  }
}