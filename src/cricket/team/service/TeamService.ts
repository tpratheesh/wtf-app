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
        let team = await this.Team.findOne({ name: form.name });
        //console.log(team.id)
        if (team == null) {
            const newTeam = new this.Team(form);
            return await newTeam.save();
        }
    }

    async updateTeam(form: TeamForm): Promise<Team> {
        const team = await this.Team.findById(form.id);
        if (team == null) {
            throw new AppError('Invalid Team')
        }
        return await this.Team.findOneAndUpdate({ _id: form.id }, form);
    }

    async getTeamById(teamId: String): Promise<Team> {
        const team = await this.Team.findById(teamId);
        if (team == null) {
            throw new AppError('Invalid Team')
        }
        return team;
    }

    async deleteTeam(teamId: Number) {
        const team = await this.Team.findById(teamId);
        if (team == null) {
            throw new AppError('Invalid Team')
        }
        await this.Team.findByIdAndDelete({ _id: teamId });
    }
}