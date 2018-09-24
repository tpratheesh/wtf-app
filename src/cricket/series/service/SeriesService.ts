import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Series } from '../interface/Series';
import SeriesForm from '../form/SeriesForm';

@Injectable()
export class SeriesService {
    constructor(
        @Inject('SeriesModelToken')
        private readonly Series: Model<Series>, private readonly logger: Logger) { }

    async getSeriesList(): Promise<Series[]> {
        return await this.Series.find();
    }

    async saveSeries(form: SeriesForm): Promise<Series> {
        let team = await this.Series.findOne({ name: form.name });
        if (team == null) {
            const newSeries = new this.Series(form);
            return await newSeries.save();
        }
    }

    async updateSeries(form: SeriesForm): Promise<Series> {
        const team = await this.Series.findById(form.id);
        if (team == null) {
            throw new AppError('Invalid Series')
        }
        return await this.Series.findOneAndUpdate({ _id: form.id }, form);
    }

    async getSeriesById(teamId: String): Promise<Series> {
        const team = await this.Series.findById(teamId);
        if (team == null) {
            throw new AppError('Invalid Series')
        }
        return team;
    }

    async deleteSeries(teamId: Number) {
        const team = await this.Series.findById(teamId);
        if (team == null) {
            throw new AppError('Invalid Series')
        }
        await this.Series.findByIdAndDelete({ _id: teamId });
    }
}