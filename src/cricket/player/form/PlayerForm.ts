import { IsNotEmpty } from 'class-validator';

export default class PlayerForm {
    id: String
    @IsNotEmpty()
    name: String
    playerUrl: String
    createdDate: Date
    updatedDate: Date
    active: boolean

    constructor(name, playerUrl = '') {
        this.name = name;
        this.playerUrl = playerUrl
        if (this.createdDate == null) {
            this.createdDate = new Date();
        }
        this.updatedDate = new Date();
        this.active = true;
    }
}