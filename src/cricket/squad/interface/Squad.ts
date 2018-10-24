import { Document } from 'mongoose';
import { Team } from 'cricket/team/interface/Team';
import { SquadPlayer } from './SquadPlayer';
import { PlayerInnings } from './PlayerInnings';

export interface Squad extends Document {
    readonly team: Team
    readonly players: [SquadPlayer]
    readonly innings1: PlayerInnings
    readonly innings2: PlayerInnings
    readonly createdDate: Date
    readonly updatedDate: Date
}