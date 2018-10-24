
import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const PlayerInningsSchema = new mongoose.Schema({
    batting: { type: mongoose.Schema.Types.ObjectId, ref: 'Batting', autopopulate: true },
    bowling: { type: mongoose.Schema.Types.ObjectId, ref: 'Bowling', autopopulate: true },
    fielding: { type: mongoose.Schema.Types.ObjectId, ref: 'Fielding', autopopulate: true },
});
PlayerInningsSchema.plugin(autopopulate);

