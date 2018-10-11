import { IsNotEmpty } from 'class-validator';

export default class TeamForm {
    @IsNotEmpty()
    name: String
    @IsNotEmpty()
    shortName: String
    active: boolean
    createdDate: Date
    updatedDate: Date

    constructor(name, shortName) {
        this.name = name;
        this.shortName = shortName;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
        this.active = true;
    }
}