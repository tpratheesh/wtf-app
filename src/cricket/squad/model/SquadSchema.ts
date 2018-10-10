import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const SquadSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', autopopulate: { select: ['name', 'shortName'] } },
    players: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', autopopulate: { select: 'name' } },
        role: String,
        isPlaying: { type: Boolean, default: false }
    }],
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});
SquadSchema.plugin(autopopulate);