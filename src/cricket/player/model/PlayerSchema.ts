import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    name: String,
    playerUrl: String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});