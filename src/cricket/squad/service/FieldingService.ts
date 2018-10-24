import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Fielding } from '../interface/Fielding';
import FieldingForm from '../form/FieldingForm';

@Injectable()
export class FieldingService {
    constructor(
        @Inject('FieldingModelToken')
        private readonly Fielding: Model<Fielding>,
        private readonly logger: Logger) { }

    async getFieldingById(fieldingId: String): Promise<Fielding> {
        const fielding = await this.Fielding.findById(fieldingId);
        if (fielding == null) {
            throw new AppError('Invalid Squad')
        }
        return fielding;
    }

    async getOrCreateAndGetFieldingById(inningsId: String): Promise<Fielding> {
        const fielding = await this.Fielding.findById(inningsId);
        if (fielding == null) {
            const newBatting = new this.Fielding(new FieldingForm());
            return await newBatting.save();
        }
        return fielding;
    }

    async saveFielding(form: FieldingForm): Promise<Fielding> {
        const fielding = await this.Fielding.findById(form.id);
        if (fielding == null) {
            const newBatting = new this.Fielding(new FieldingForm());
            return await newBatting.save();
        } else {
            return await this.Fielding.findByIdAndUpdate(form.id, { $set: form }, { new: true });
        }
    }
}