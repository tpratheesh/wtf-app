import { Document } from 'mongoose';

export interface Match extends Document {
    readonly name: String
    readonly description: String
    readonly series: String
    readonly matchStartDate: Date
    readonly matchEndDate: Date
    readonly squad1: String
    readonly squad2: String
    readonly matchUrl: String
    readonly createdDate: Date
    readonly updatedDate: Date
}