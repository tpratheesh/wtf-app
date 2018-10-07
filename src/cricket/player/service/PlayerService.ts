import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Player } from '../interface/Player';
import PlayerForm from '../form/PlayerForm';

@Injectable()
export class PlayerService {
    constructor(
        @Inject('PlayerModelToken')
        private readonly Player: Model<Player>, private readonly logger: Logger) { }

    async getPlayers(): Promise<Player[]> {
        return await this.Player.find();
    }

    async savePlayer(form: PlayerForm): Promise<Player> {
        let player = await this.Player.findOne({ name: form.name });
        if (player == null) {
            const newPlayer = new this.Player(form);
            return await newPlayer.save();
        }
        return player;
    }

    async updatePlayer(form: PlayerForm): Promise<Player> {
        const player = await this.Player.findById(form.id);
        if (player == null) {
            throw new AppError('Invalid Player')
        }
        return await this.Player.findOneAndUpdate({ _id: form.id }, form);
    }

    async getPlayerById(playerId: String): Promise<Player> {
        const player = await this.Player.findById(playerId);
        if (player == null) {
            throw new AppError('Invalid Player')
        }
        return player;
    }

    async deletePlayer(playerId: Number) {
        const player = await this.Player.findById(playerId);
        if (player == null) {
            throw new AppError('Invalid Player')
        }
        await this.Player.findByIdAndDelete({ _id: playerId });
    }
}