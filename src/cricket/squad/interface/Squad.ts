import { Document } from 'mongoose';
import { Team } from 'cricket/team/interface/Team';
import { SquadPlayer } from './SquadPlayer';

export interface Squad extends Document {
    readonly team: Team
    readonly players: [SquadPlayer]
    readonly createdDate: Date
    readonly updatedDate: Date
}