import { IsNotEmpty } from 'class-validator';

export default class SquadUpdateForm {
    id: String
    players: {
        name: String,
        role: String,
        isPlaying: { type: Boolean, default: false }
    }[]

    constructor(id, players) {
        this.id = id;
        this.players = players;
    }
}