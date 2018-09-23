import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Team } from '../interface/Team';
import TeamForm from '../form/TeamForm';

@Injectable()
export class TeamService {
    constructor(
        @Inject('TeamModelToken')
        private readonly Team: Model<Team>, private readonly logger: Logger) { }

    async getTeams(): Promise<Team[]> {
        return await this.Team.find();
    }

    async saveTeam(form: TeamForm): Promise<Team> {
        const user = new this.Team(form);
        return await user.save();
    }

    async updateTeam(form: TeamForm): Promise<Team> {
        const Team = await this.Team.findById(form.id);
        if (Team == null) {
            throw new AppError('Invalid Team')
        }
        return await this.Team.findOneAndUpdate({ _id: form.id }, form);
    }

    async getTeamById(userId: String): Promise<Team> {
        const user = await this.Team.findById(userId);
        if (user == null) {
            throw new AppError('Invalid Team')
        }
        return user;
    }

    async deleteTeam(userId: Number) {
        const user = await this.Team.findById(userId);
        if (user == null) {
            throw new AppError('Invalid Team')
        }
        await this.Team.findByIdAndDelete({ _id: userId });
    }
}