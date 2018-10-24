import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Bowling } from '../interface/Bowling';
import BowlingForm from '../form/BowlingForm';

@Injectable()
export class BowlingService {
    constructor(
        @Inject('BowlingModelToken')
        private readonly Bowling: Model<Bowling>,
        private readonly logger: Logger) { }

    async getBowlingById(bowlingId: String): Promise<Bowling> {
        const bowling = await this.Bowling.findById(bowlingId);
        if (bowling == null) {
            throw new AppError('Invalid Squad')
        }
        return bowling;
    }

    async getOrCreateAndGetBowlingById(inningsId: String): Promise<Bowling> {
        const bowling = await this.Bowling.findById(inningsId);
        if (bowling == null) {
            const newBatting = new this.Bowling(new BowlingForm());
            return await newBatting.save();
        }
        return bowling;
    }

    async saveBowling(form: BowlingForm): Promise<Bowling> {
        const bowling = await this.Bowling.findById(form.id);
        if (bowling == null) {
            const newBatting = new this.Bowling(new BowlingForm());
            return await newBatting.save();
        } else {
            return await this.Bowling.findByIdAndUpdate(form.id, { $set: form }, { new: true });
        }
    }
}