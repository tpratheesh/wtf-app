import { Document } from 'mongoose';

export interface Innings extends Document {
    readonly total: Number
    readonly wickets: Number
    readonly extras: Number
    readonly totalDescription: String
    readonly extrasDescription: String

}

