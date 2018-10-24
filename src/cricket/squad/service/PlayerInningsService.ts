import { Inject, Injectable, FilesInterceptor } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Innings } from '../interface/Innings';
import InningsForm from '../form/InningsForm';
import { PlayerInnings } from '../interface/PlayerInnings';
import PlayerInningsForm from '../form/PlayerInningsForm';
import BattingForm from '../form/BattingForm';
import BowlingForm from '../form/BowlingForm';
import FieldingForm from '../form/FieldingForm';
import { BattingService } from './BattingService';
import { BowlingService } from './BowlingService';
import { Fielding } from '../interface/Fielding';
import { FieldingService } from './FieldingService';

@Injectable()
export class PlayerInningsService {
    constructor(
        @Inject('PlayerInningsModelToken')
        private readonly PlayerInnings: Model<PlayerInnings>,
        private readonly battingService: BattingService,
        private readonly bowlingService: BowlingService,
        private readonly fieldingService: FieldingService,
        private readonly logger: Logger) { }

    async getPlayerInningsById(inningsId: String): Promise<PlayerInnings> {
        const innings = await this.PlayerInnings.findById(inningsId);
        if (innings == null) {
            throw new AppError('Invalid Squad')
        }
        return innings;
    }

    async getOrCreateAndGetInningsById(inningsId: String): Promise<PlayerInnings> {
        const innings = await this.PlayerInnings.findById(inningsId);
        if (innings == null) {
            const batting = await this.battingService.saveBatting(new BattingForm());
            const bowling = await this.bowlingService.saveBowling(new BowlingForm());
            const fielding = await this.fieldingService.saveFielding(new FieldingForm());

            const newInnings = new this.PlayerInnings(new PlayerInningsForm(batting._id, bowling._id, fielding._id));
            return await newInnings.save();
        }
        return innings;
    }

    async saveInnings(form: PlayerInningsForm): Promise<PlayerInnings> {
        const innings = await this.PlayerInnings.findById(form.id);
        if (innings == null) {
            const newInnings = new this.PlayerInnings(new InningsForm());
            return await newInnings.save();
        } else {
            return await this.PlayerInnings.findByIdAndUpdate(form.id, { $set: form }, { new: true });
        }
    }

    async updateBatting(inningsId, battingId): Promise<PlayerInnings> {
        return await this.PlayerInnings.findByIdAndUpdate(inningsId, { $set: { batting: battingId } }, { new: true });
    }

    async updateBowling(inningsId, bowlingId): Promise<PlayerInnings> {
        return await this.PlayerInnings.findByIdAndUpdate(inningsId, { $set: { bowling: bowlingId } }, { new: true });
    }

    async updateFielding(inningsId, fieldingId): Promise<PlayerInnings> {
        return await this.PlayerInnings.findByIdAndUpdate(inningsId, { $set: { fielding: fieldingId } }, { new: true });
    }
}