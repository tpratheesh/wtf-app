import { Document } from 'mongoose';

export interface Bowling extends Document {
    readonly runs: Number
    readonly balls: Number
    readonly ER: Number
    readonly wickets: Number
    readonly maiden: Number
    readonly points: Number
}