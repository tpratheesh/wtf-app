import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Squad } from '../interface/Squad';
import SquadForm from '../form/SquadForm';

@Injectable()
export class SquadService {
    constructor(
        @Inject('SquadModelToken')
        private readonly Squad: Model<Squad>, private readonly logger: Logger) { }

    async saveSquad(form: SquadForm): Promise<Squad> {
        let Squad = await this.Squad.findById(form.id);
        if (Squad == null) {
            const newSquad = new this.Squad(form);
            return await newSquad.save();
        }
        return Squad;
    }

    async updateSquad(form: SquadForm): Promise<Squad> {
        const Squad = await this.Squad.findById(form.id);
        if (Squad == null) {
            throw new AppError('Invalid Squad')
        }
        return await this.Squad.findOneAndUpdate({ _id: form.id }, form);
    }

    async getSquadById(matchId: String): Promise<Squad> {
        const Squad = await this.Squad.findById(matchId);
        if (Squad == null) {
            throw new AppError('Invalid Squad')
        }
        return Squad;
    }

    async deleteSquad(matchId: Number) {
        const Squad = await this.Squad.findById(matchId);
        if (Squad == null) {
            throw new AppError('Invalid Squad')
        }
        await this.Squad.findByIdAndDelete({ _id: matchId });
    }
}