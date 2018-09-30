import * as mongoose from 'mongoose';

export const UserAccountSchema = new mongoose.Schema({
    name: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});