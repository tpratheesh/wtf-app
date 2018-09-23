import { Document } from 'mongoose';

export interface Team extends Document {
    readonly name: String
    readonly testPlaying: boolean
    readonly odiPlaying: boolean
    readonly t20Playing: boolean
    readonly active: boolean
    readonly createdDate: Date
    readonly updatedDate: Date
}