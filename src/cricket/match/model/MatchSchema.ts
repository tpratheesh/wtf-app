import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
    matchStartDate: mongoose.Schema.Types.Date,
    matchEndDate: mongoose.Schema.Types.Date,
    squad1: { type: mongoose.Schema.Types.ObjectId, ref: 'Squad' },
    squad2: { type: mongoose.Schema.Types.ObjectId, ref: 'Squad' },
    matchUrl: String,
    createdDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedDate: { type: mongoose.Schema.Types.Date, default: Date.now },
});