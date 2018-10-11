import { IsNotEmpty } from 'class-validator';

export default class SeriesForm {
    @IsNotEmpty()
    name: String
    description: String
    seriesUrl: String
    createdDate: Date
    updatedDate: Date

    constructor(name, description) {
        this.name = name;
        this.description = description;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
    }
}