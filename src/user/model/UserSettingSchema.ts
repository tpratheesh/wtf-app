import * as mongoose from 'mongoose';

export const UserSettingSchema = new mongoose.Schema({
    selectedUserAccount: String,
    selectedTheme: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSetting' },
});