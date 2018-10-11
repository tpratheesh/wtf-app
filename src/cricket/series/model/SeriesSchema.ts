import * as mongoose from 'mongoose';

export const SeriesSchema = new mongoose.Schema({
    name: String,
    description: String,
    seriesUrl: String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});