import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Match } from '../interface/Match';
import MatchForm from '../form/MatchForm';
import * as moment from 'moment';
import * as mongoose from 'mongoose';

@Injectable()
export class MatchService {
    constructor(
        @Inject('MatchModelToken')
        private readonly Match: Model<Match>, private readonly logger: Logger) { }

    async getMatchListBySeries(seriesId: String): Promise<Match[]> {
        return await this.Match.find({ series: seriesId });
    }

    async getMatchListToday(): Promise<Match[]> {
        const today = moment().utc(false).startOf('day')
        const tomorrow = moment(today).utc(false).endOf('day')
        return await this.Match.find(
            {
                $and: [{
                    matchStartDate: {
                        $gte: today.toDate(),
                    },
                    matchEndDate: {
                        $lt: tomorrow.toDate()
                    }
                }]
            }).sort({ matchStartDate: 'asc' });
    }

    async getMatchListUpcoming(): Promise<Match[]> {
        const today = moment().utc(false);
        const tomorrow = moment(today).utc(false).endOf('day').add(2, 'days');
        return await this.Match.find(
            {
                $and: [{
                    matchStartDate: {
                        $gte: today.toDate(),
                    },
                    matchEndDate: {
                        $lt: tomorrow.toDate()
                    }
                }]
            }).sort({ matchStartDate: 'asc' });
    }

    async saveMatch(form: MatchForm): Promise<Match> {
        let match = await this.Match.findOne({ name: form.name });
        if (match == null) {
            const newMatch = new this.Match(form);
            return await newMatch.save();
        } else {
            form.id = match._id;
            return await this.updateMatch(form);
        }
    }

    async updateMatch(form: MatchForm): Promise<Match> {
        const match = await this.Match.findById(form.id);
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        return await this.Match.findOneAndUpdate({ _id: form.id }, form);
    }

    async updateMatchName(id: String, matchName: String) {
        const match = await this.Match.findById(id);
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        return await this.Match.findOneAndUpdate({ _id: id }, { name: matchName });
    }

    async getMatchById(matchId: String): Promise<Match> {
        const match = await this.Match.findById(matchId);
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        return match;
    }

    async getMatchByName(matchName: String): Promise<Match> {
        const match = await this.Match.findOne({ name: matchName })
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        return match;
    }

    async deleteMatch(matchId: Number) {
        const match = await this.Match.findById(matchId);
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        await this.Match.findByIdAndDelete({ _id: matchId });
    }
}