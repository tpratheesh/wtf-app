import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Match } from '../interface/Match';
import MatchForm from '../form/MatchForm';

@Injectable()
export class MatchService {
    constructor(
        @Inject('MatchModelToken')
        private readonly Match: Model<Match>, private readonly logger: Logger) { }

    async getMatchListBySeries(seriesId: String): Promise<Match[]> {
        return await this.Match.find({ series: seriesId });
    }

    async saveMatch(form: MatchForm): Promise<Match> {
        let match = await this.Match.findOne({ name: form.name });
        if (match == null) {
            const newMatch = new this.Match(form);
            return await newMatch.save();
        }
    }

    async updateMatch(form: MatchForm): Promise<Match> {
        const match = await this.Match.findById(form.id);
        if (match == null) {
            throw new AppError('Invalid Match')
        }
        return await this.Match.findOneAndUpdate({ _id: form.id }, form);
    }

    async getMatchById(matchId: String): Promise<Match> {
        const match = await this.Match.findById(matchId);
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