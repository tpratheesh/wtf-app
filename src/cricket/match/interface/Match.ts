import { Document } from 'mongoose';

export interface Match extends Document {
    readonly name: String
    readonly description: String
    readonly series: String
    readonly matchDate: Date,
    readonly createdDate: Date
    readonly updatedDate: Date
}