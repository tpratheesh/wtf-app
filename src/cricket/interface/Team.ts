import { Document } from 'mongoose';

export interface Team extends Document {
    readonly name: String
    readonly description: String
    readonly createdDate: Date
    readonly updatedDate: Date
    readonly status: String
}