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

@Injectable()
export class SquadService {
    constructor(
        @Inject('SquadModelToken')
        private readonly Squad: Model<Squad>,
        @Inject('SquadPlayerModelToken')
        private readonly SquadPlayer: Model<SquadPlayer>,
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

    async updateSquadTeam(squadId: String, team: String) {
        return await this.Squad.findByIdAndUpdate({ _id: squadId },
            {
                $set: { team: team }
            }, { new: true }
        );
    }

    async updateSquadPlayers(squadId: String, form: SquadUpdateForm) {
        let squadPlayers: Array<SquadPlayer> = [];

        for (let i = 0; i < form.players.length; i++) {
            const squadPlayerForm: SquadPlayerForm = form.players[i];
            const playerName = squadPlayerForm.player.name;

            let player = await this.playerService.getPlayerByName(playerName);
            if (player == null) {
                player = await this.playerService.savePlayer(squadPlayerForm.player);
            }
            let squadPlayer = await this.SquadPlayer.findOne({ player: player, squad: squadId });
            if (squadPlayer == null) {
                const newSquadPlayer = new this.SquadPlayer(form);
                squadPlayer = await newSquadPlayer.save();
                squadPlayer = await this.SquadPlayer.findByIdAndUpdate(squadPlayer._id, { player: player, role: squadPlayerForm.role, isPlaying: squadPlayerForm.isPlaying });
            } else {
                squadPlayer = await this.SquadPlayer.findByIdAndUpdate(squadPlayer._id, { player: player, role: squadPlayerForm.role, isPlaying: squadPlayerForm.isPlaying });
            }
            console.log(squadPlayer)
            squadPlayers.push(squadPlayer);
        }
        await this.updatePlayers(squadId, squadPlayers);
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