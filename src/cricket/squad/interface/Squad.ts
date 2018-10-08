import { Document } from 'mongoose';

export interface Squad extends Document {
    team: String
    readonly players: [{
        id: String,
        isPlaying: boolean
    }]
    readonly createdDate: Date
    readonly updatedDate: Date
}