import { IsNotEmpty } from 'class-validator';

export default class TeamForm {
    id: String
    @IsNotEmpty()
    name: String
    description: String
    createdDate: Date
    updatedDate: Date
    status: String
}