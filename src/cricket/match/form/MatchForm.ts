import { IsNotEmpty } from 'class-validator';
import SquadForm from '../../squad/form/SquadForm';

export default class MatchForm {
    id: String
    @IsNotEmpty()
    name: String
    description: String
    series: String
    matchStartDate: Date
    matchEndDate: Date
    squad1: String
    squad2: String
    matchUrl: String
    createdDate: Date
    updatedDate: Date

    constructor(name, description, series, matchStartDate, matchEndDate, squad1, squad2, matchUrl) {
        this.name = name;
        this.description = description;
        this.series = series;
        this.matchStartDate = matchStartDate;
        this.matchEndDate = matchEndDate;
        this.squad1 = squad1;
        this.squad2 = squad2;
        this.matchUrl = matchUrl;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
    }
}