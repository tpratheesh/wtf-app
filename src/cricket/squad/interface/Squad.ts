import { Document } from 'mongoose';

export interface Squad extends Document {
    team: String
    readonly players: [{
        _id: String,
        role: String,
        isPlaying: boolean
    }]
    readonly createdDate: Date
    readonly updatedDate: Date
}