import { IsNotEmpty } from 'class-validator';

export default class MatchForm {
    id: String
    @IsNotEmpty()
    name: String
    description: String
    series: String
    matchDate: Date
    createdDate: Date
    updatedDate: Date

    constructor(name, description, series, matchDate) {
        this.name = name;
        this.description = description;
        this.series = series;
        this.matchDate = matchDate
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
    }
}