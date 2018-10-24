import { Document } from 'mongoose';

export interface Batting extends Document {
    readonly runs: Number
    readonly balls: Number
    readonly SR: Number
    readonly fours: Number
    readonly sixes: Number
    readonly points: Number
    readonly description: String
    readonly batOrder: Number
}