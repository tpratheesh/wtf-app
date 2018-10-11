import SquadPlayerForm from "./SquadPlayerForm";

export default class SquadUpdateForm {
    players: [SquadPlayerForm]

    constructor(players) {
        this.players = players;
    }
}