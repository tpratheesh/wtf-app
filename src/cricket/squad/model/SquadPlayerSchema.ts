import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const SquadPlayerSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', autopopulate: { select: ['name', 'playerUrl'] } },
    role: String,
    isPlaying: { type: Boolean, default: true },
    squad: { type: mongoose.Schema.Types.ObjectId, ref: 'Squad' }
});
SquadPlayerSchema.plugin(autopopulate);