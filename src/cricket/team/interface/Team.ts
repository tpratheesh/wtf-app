import { Document } from 'mongoose';

export interface Team extends Document {
    readonly name: String
    readonly shortName: String
    readonly active: boolean
    readonly createdDate: Date
    readonly updatedDate: Date
}