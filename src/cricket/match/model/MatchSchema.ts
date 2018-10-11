import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const MatchSchema = new mongoose.Schema({
    name: String,
    description: String,
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', autopopulate: { select: 'name' } },
    matchStartDate: mongoose.Schema.Types.Date,
    matchEndDate: mongoose.Schema.Types.Date,
    squad1: { type: mongoose.Schema.Types.ObjectId, ref: 'Squad', autopopulate: { select: ['team', 'players'] } },
    squad2: { type: mongoose.Schema.Types.ObjectId, ref: 'Squad', autopopulate: { select: ['team', 'players'] } },
    matchUrl: String,
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});
MatchSchema.plugin(autopopulate);