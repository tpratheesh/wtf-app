import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

export const UserMatchTeamSchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    userAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount' },
    players: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Player", autopopulate: true
    }],
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    viceCaptain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});
UserMatchTeamSchema.plugin(autopopulate);