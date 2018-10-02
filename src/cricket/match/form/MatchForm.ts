import { IsNotEmpty } from 'class-validator';

export default class MatchForm {
    id: String
    @IsNotEmpty()
    name: String
    description: String
    series: String
    matchStartDate: Date
    matchEndDate: Date
    team1: String
    team2: String
    createdDate: Date
    updatedDate: Date

    constructor(name, description, series, matchStartDate, matchEndDate, team1, team2) {
        this.name = name;
        this.description = description;
        this.series = series;
        this.matchStartDate = matchStartDate;
        this.matchEndDate = matchEndDate;
        this.team1 = team1;
        this.team2 = team2;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
    }
}