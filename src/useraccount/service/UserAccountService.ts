import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserAccount } from '../interface/UserAccount';
import UserAccountForm from '../form/UserAccountForm';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';

@Injectable()
export class UserAccountService {

  constructor(
    @Inject('UserAccountModelToken')
    private readonly UserAccount: Model<UserAccount>, private readonly logger: Logger) { }

  async getUserAccounts(userId: String): Promise<UserAccount[]> {
    return await this.UserAccount.find({ user: userId });
  }

  async saveUserAccount(form: UserAccountForm): Promise<UserAccount> {
    const userAccount = new this.UserAccount(form);
    return await userAccount.save();
  }

  async updateUserAccount(form: UserAccountForm): Promise<UserAccount> {
    const UserAccount = await this.UserAccount.findById(form.id);
    if (UserAccount == null) {
      throw new AppError('Invalid User')
    }
    return await this.UserAccount.findOneAndUpdate({ _id: form.id }, form);
  }

  async getUserAccountById(userAccountId: String): Promise<UserAccount> {
    const userAccount = await this.UserAccount.findById(userAccountId);
    if (userAccount == null) {
      throw new AppError('Invalid User')
    }
    return userAccount;
  }

  async deleteUserAccount(userAccountId: Number) {
    const userAccount = await this.UserAccount.findById(userAccountId);
    if (userAccount == null) {
      throw new AppError('Invalid User')
    }
    await this.UserAccount.findByIdAndDelete({ _id: userAccountId });
  }
}