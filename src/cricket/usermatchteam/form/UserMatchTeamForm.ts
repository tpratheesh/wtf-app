import { IsNotEmpty } from 'class-validator';

export default class UserMatchTeamForm {
    id: String
    @IsNotEmpty()
    match: String
    userAccount: String
    players: Array<String>
    captain: String
    viceCaptain: String

    constructor(match: String, userAccount: String, players: Array<String>, captain, viceCaptain) {
        this.match = match;
        this.userAccount = userAccount;
        this.players = players;
        this.captain = captain;
        this.viceCaptain = viceCaptain;
    }
}