import { IsNotEmpty } from 'class-validator';

export default class UserMatchTeamForm {
    id: String
    @IsNotEmpty()
    match: String
    userAccount: String
    players: Array<String>

    constructor(match: String, userAccount: String, players: Array<String>) {
        this.match = match;
        this.userAccount = userAccount;
        this.players = players;
    }
}