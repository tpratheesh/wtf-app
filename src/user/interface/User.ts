import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: String
    readonly mobileNo: String
    readonly userType: String
    readonly description: String
    readonly photos: Buffer[]
    readonly createdBy: String
    readonly createdDate: Date
    readonly updatedDate: Date
}