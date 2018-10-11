import { IsNotEmpty } from 'class-validator';

export default class UserForm {
    @IsNotEmpty()
    mobileNo: String
    name: String
    description: String
    photo: Buffer
    createdBy: String
    createdDate: Date
    updatedDate: Date
    status: String

    constructor(mobileNo: String) {
        this.mobileNo = mobileNo
    }
}