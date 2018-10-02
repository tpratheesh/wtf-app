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
        let series = await this.Series.findOne({ name: form.name });
        if (series == null) {
            const newSeries = new this.Series(form);
            return await newSeries.save();
        }
        return series;
    }

    async updateSeries(form: SeriesForm): Promise<Series> {
        const series = await this.Series.findById(form.id);
        if (series == null) {
            throw new AppError('Invalid Series')
        }
        return await this.Series.findOneAndUpdate({ _id: form.id }, form);
    }

    async getSeriesById(matchId: String): Promise<Series> {
        const series = await this.Series.findById(matchId);
        if (series == null) {
            throw new AppError('Invalid Series')
        }
        return series;
    }

    async deleteSeries(matchId: Number) {
        const series = await this.Series.findById(matchId);
        if (series == null) {
            throw new AppError('Invalid Series')
        }
        await this.Series.findByIdAndDelete({ _id: matchId });
    }
}