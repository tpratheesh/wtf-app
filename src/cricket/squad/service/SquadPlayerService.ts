import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Squad } from '../interface/Squad';
import SquadForm from '../form/SquadForm';
import SquadUpdateForm from '../form/SquadUpdateForm';
import { PlayerService } from 'cricket/player/service/PlayerService';
import { SquadPlayer } from '../interface/SquadPlayer';
import SquadPlayerForm from '../form/SquadPlayerForm';
import BattingForm from '../form/BattingForm';
import { PlayerInnings } from '../interface/PlayerInnings';
import { Batting } from '../interface/Batting';
import { Bowling } from '../interface/Bowling';
import { Fielding } from '../interface/Fielding';

@Injectable()
export class SquadPlayerService {
    constructor(
        @Inject('SquadPlayerModelToken')
        private readonly SquadPlayer: Model<SquadPlayer>,
        private readonly playerService: PlayerService,
        private readonly logger: Logger) { }

    async getSquadPlayerById(squadId: String): Promise<SquadPlayer> {
        const squad = await this.SquadPlayer.findById(squadId);
        if (squad == null) {
            throw new AppError('Invalid Squad')
        }
        return squad;
    }

    async updatePlayerInnings1(squadPlayerId, playerInnings): Promise<SquadPlayer> {
        return await this.SquadPlayer.findByIdAndUpdate(squadPlayerId, { $set: { innings1: playerInnings } }, { new: true });
    }
}