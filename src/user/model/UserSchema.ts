import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    mobileNo: String,
    description: String,
    photo: Buffer,
    createdBy: String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    status: { type: String, default: 'OPEN' }
});