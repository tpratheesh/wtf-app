import { Document } from 'mongoose';

export interface UserMatchTeam extends Document {
    readonly match: String
    readonly userAccount: String
    readonly players: Array<String>
    readonly captain: String
    readonly viceCaptain: String
}