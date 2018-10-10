import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AppError from 'exception/AppError';
import { Logger } from 'logger/Logger';
import { Squad } from '../interface/Squad';
import SquadForm from '../form/SquadForm';
import SquadUpdateForm from '../form/SquadUpdateForm';
import { PlayerService } from 'cricket/player/service/PlayerService';
import * as mongoose from 'mongoose';

@Injectable()
export class SquadService {
    constructor(
        @Inject('SquadModelToken')
        private readonly Squad: Model<Squad>,
        private readonly playerService: PlayerService,
        private readonly logger: Logger) { }

    async saveSquad(form: SquadForm): Promise<Squad> {
        let squad = await this.Squad.findById(form.id);
        if (squad == null) {
            const newSquad = new this.Squad(form);
            return await newSquad.save();
        }
        return squad;
    }

    async updateSquad(form: SquadForm): Promise<Squad> {
        const squad = await this.Squad.findById(form.id);
        if (squad == null) {
            throw new AppError('Invalid Squad')
        }
        return await this.Squad.findOneAndUpdate({ _id: form.id }, form);
    }

    async getSquadById(squadId: String): Promise<Squad> {
        const squad = await this.Squad.findById(squadId);
        if (squad == null) {
            throw new AppError('Invalid Squad')
        }
        return squad;
    }

    async deleteSquad(squadId: String) {
        const squad = await this.Squad.findById(squadId);
        if (squad == null) {
            throw new AppError('Invalid Squad')
        }
        await this.Squad.findByIdAndDelete({ _id: squadId });
    }

    async updateSquadPlayers(form: SquadUpdateForm) {
        let players = [];

        for (let i = 0; i < form.players.length; i++) {
            let player = form.players[i];
            const p = await this.playerService.getPlayerByName(player.name.toString());
            players.push({ _id: p._id, role: player.role, isPlaying: player.isPlaying });
        }
        await this.updatePlayers(form.id, players);
    }

    async updatePlayers(squadId, players) {
        console.log(squadId)
        console.log('***')
        console.log(players)
        await this.Squad.findByIdAndUpdate({ _id: squadId },
            {
                $set: { players: players }
            }, { new: true }
        );
    }
}