import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Batting } from '../interface/Batting';
import BattingForm from '../form/BattingForm';

@Injectable()
export class BattingService {
    constructor(
        @Inject('BattingModelToken')
        private readonly Batting: Model<Batting>,
        private readonly logger: Logger) { }

    async getBattingById(battingId: String): Promise<Batting> {
        const batting = await this.Batting.findById(battingId);
        if (batting == null) {
            throw new AppError('Invalid Squad')
        }
        return batting;
    }

    async getOrCreateAndGetBattingById(inningsId: String): Promise<Batting> {
        const batting = await this.Batting.findById(inningsId);
        if (batting == null) {
            const newBatting = new this.Batting(new BattingForm());
            return await newBatting.save();
        }
        return batting;
    }

    async saveBatting(form: BattingForm): Promise<Batting> {
        const batting = await this.Batting.findById(form.id);
        if (batting == null) {
            const newBatting = new this.Batting(new BattingForm());
            return await newBatting.save();
        } else {
            return await this.Batting.findByIdAndUpdate(form.id, { $set: form }, { new: true });
        }
    }
}