import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    status: { type: String, default: 'OPEN' }
});