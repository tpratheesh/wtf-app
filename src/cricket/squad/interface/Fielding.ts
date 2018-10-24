import { Document } from 'mongoose';

export interface Fielding extends Document {
    readonly catches: Number
    readonly stumping: Number
    readonly runOuts: Number
    readonly points: Number
}