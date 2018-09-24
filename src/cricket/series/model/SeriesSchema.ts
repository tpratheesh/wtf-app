import * as mongoose from 'mongoose';

export const SeriesSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});