import { IsNotEmpty } from 'class-validator';

export default class SquadForm {
    id: String
    team: String
    createdDate: Date
    updatedDate: Date

    constructor(team) {
        this.team = team;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
    }
}