import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserMatchTeam } from '../interface/UserMatchTeam';
import UserMatchTeamForm from '../form/UserMatchTeamForm';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';

@Injectable()
export class UserMatchTeamService {

  constructor(
    @Inject('UserMatchTeamModelToken')
    private readonly UserMatchTeam: Model<UserMatchTeam>, private readonly logger: Logger) { }

  async getUserMatchTeamForMatchAndUserAccount(matchId: String, accountId: String): Promise<UserMatchTeam> {
    const userMatchTeam = await this.UserMatchTeam.findOne({ match: matchId, userAccount: accountId });
    return userMatchTeam;
  }

  async saveUserMatchTeam(form: UserMatchTeamForm): Promise<UserMatchTeam> {
    let userMatchTeam = null;
    if (form.id !== '') {
      userMatchTeam = await this.UserMatchTeam.findById(form.id);
    }
    if (userMatchTeam == null) {
      userMatchTeam = new this.UserMatchTeam(form);
      userMatchTeam = await userMatchTeam.save();
    } else {
      userMatchTeam = await this.UserMatchTeam.findOneAndUpdate({ _id: form.id }, form);
    }
    return userMatchTeam;
  }

  async deleteUserMatchTeam(userAccountId: Number) {
    const userMatchTeam = await this.UserMatchTeam.findById(userAccountId);
    if (userMatchTeam == null) {
      throw new AppError('Invalid User')
    }
    await this.UserMatchTeam.findByIdAndDelete({ _id: userAccountId });
  }
}