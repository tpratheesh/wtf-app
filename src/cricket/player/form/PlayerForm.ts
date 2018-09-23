import { IsNotEmpty } from 'class-validator';

export default class PlayerForm {
    id: String
    @IsNotEmpty()
    name: String
    createdDate: Date
    updatedDate: Date
    active: boolean

    constructor(name) {
        this.name = name;
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
        this.active = true;
    }
}