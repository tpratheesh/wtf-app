import { Document } from 'mongoose';

export interface Player extends Document {
    readonly name: String
    readonly active: boolean
    readonly createdDate: Date
    readonly updatedDate: Date
}