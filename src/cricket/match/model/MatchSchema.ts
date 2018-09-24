import * as mongoose from 'mongoose';
import { Timestamp } from 'bson';

export const MatchSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
    matchDate: Date,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});