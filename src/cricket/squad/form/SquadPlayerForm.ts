import { IsNotEmpty } from 'class-validator';
import PlayerForm from 'cricket/player/form/PlayerForm';
import PlayerInningsForm from './PlayerInningsForm';

export default class SquadPlayerForm {
    @IsNotEmpty()
    player: PlayerForm
    role: String
    isPlaying: boolean
    innings1: PlayerInningsForm
    innings2: PlayerInningsForm

    constructor(player: PlayerForm, role: String, isPlaying: boolean = false) {
        this.player = player;
        this.role = role;
        this.isPlaying = isPlaying;
    }
}