import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const SquadSchema = new mongoose.Schema({
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', autopopulate: { select: ['name', 'shortName'] } },
    players: [{
        type: mongoose.Schema.Types.ObjectId, ref: "SquadPlayer", autopopulate: true
    }],
    innings1: { type: mongoose.Schema.Types.ObjectId, ref: 'Innings', autopopulate: true },
    innings2: { type: mongoose.Schema.Types.ObjectId, ref: 'Innings', autopopulate: true },
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});
SquadSchema.plugin(autopopulate);