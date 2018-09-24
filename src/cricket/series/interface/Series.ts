import { Document } from 'mongoose';

export interface Series extends Document {
    readonly name: String
    readonly description: String
    readonly createdDate: Date
    readonly updatedDate: Date
}