import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
    name: String,
    testPlaying: Boolean,
    odiPlaying: Boolean,
    t20Playing: Boolean,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});