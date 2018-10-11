import { Document } from 'mongoose';
import { Player } from 'cricket/player/interface/Player';

export interface SquadPlayer extends Document {
    readonly player: Player,
    readonly role: String,
    readonly isPlaying: boolean,
    readonly squad: String
}