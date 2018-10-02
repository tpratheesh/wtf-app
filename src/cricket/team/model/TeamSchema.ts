import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
    id: String,
    name: String,
    shortName: String,
    active: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});