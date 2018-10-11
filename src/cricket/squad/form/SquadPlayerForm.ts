import { IsNotEmpty } from 'class-validator';
import PlayerForm from 'cricket/player/form/PlayerForm';

export default class SquadPlayerForm {
    @IsNotEmpty()
    player: PlayerForm
    role: String
    isPlaying: boolean

    constructor(player: PlayerForm, role: String, isPlaying: boolean = false) {
        this.player = player;
        this.role = role;
        this.isPlaying = isPlaying;
    }
}