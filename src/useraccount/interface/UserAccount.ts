import { Document } from 'mongoose';

export interface UserAccount extends Document {
    readonly name: String
    readonly description: String
    readonly user: String
    readonly createdDate: Date
    readonly updatedDate: Date
}