import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Innings } from '../interface/Innings';
import InningsForm from '../form/InningsForm';

@Injectable()
export class InningsService {
    constructor(
        @Inject('InningsModelToken')
        private readonly Innings: Model<Innings>,
        private readonly logger: Logger) { }

    async getInningsById(inningsId: String): Promise<Innings> {
        const innings = await this.Innings.findById(inningsId);
        if (innings == null) {
            throw new AppError('Invalid Squad')
        }
        return innings;
    }

    async getOrCreateAndGetInningsById(inningsId: String): Promise<Innings> {
        const innings = await this.Innings.findById(inningsId);
        if (innings == null) {
            const newInnings = new this.Innings(new InningsForm());
            return await newInnings.save();
        }
        return innings;
    }

    async saveInnings(form: InningsForm): Promise<Innings> {
        const innings = await this.Innings.findById(form.id);
        if (innings == null) {
            const newInnings = new this.Innings(new InningsForm());
            return await newInnings.save();
        } else {
            return await this.Innings.findByIdAndUpdate(form.id, { $set: form }, { new: true });
        }
    }
}