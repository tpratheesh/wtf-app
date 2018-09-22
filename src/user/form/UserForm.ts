import { IsNotEmpty } from 'class-validator';

export default class UserForm {
    id: String

    @IsNotEmpty()
    name: String

    description: String
    createdBy: String
    createdDate: Date
    updatedDate: Date
    status: String
}