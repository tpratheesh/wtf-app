import { Document } from 'mongoose';
import { Batting } from './Batting';
import { Bowling } from './Bowling';
import { Fielding } from './Fielding';

export interface PlayerInnings extends Document {
    readonly batting: Batting
    readonly bowling: Bowling
    readonly fielding: Fielding
}

