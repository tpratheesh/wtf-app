import { IsNotEmpty } from 'class-validator';

export default class UserAccountForm {
    id: String
    @IsNotEmpty()
    name: String
    description: String
    user: String
    createdDate: Date
    updatedDate: Date

    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
    }
}