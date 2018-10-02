import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
    matchStartDate: mongoose.Schema.Types.Date,
    matchEndDate: mongoose.Schema.Types.Date,
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});