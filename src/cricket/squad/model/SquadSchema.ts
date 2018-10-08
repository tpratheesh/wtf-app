import * as mongoose from 'mongoose';

export const SquadSchema = new mongoose.Schema({
    id: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    players: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        isPlaying: { type: Boolean, default: false }
    }],
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});