import { Document } from 'mongoose';

export interface Match extends Document {
    readonly name: String
    readonly description: String
    readonly series: String
    readonly matchStartDate: Date
    readonly matchEndDate: Date
    readonly team1: String
    readonly team2: String
    readonly createdDate: Date
    readonly updatedDate: Date
}