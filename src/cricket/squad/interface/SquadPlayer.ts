import { Document } from 'mongoose';
import { Player } from 'cricket/player/interface/Player';
import { PlayerInnings } from './PlayerInnings';

export interface SquadPlayer extends Document {
    readonly player: Player,
    readonly role: String,
    readonly isPlaying: boolean,
    readonly squad: String
    innings1: PlayerInnings
    innings2: PlayerInnings
}