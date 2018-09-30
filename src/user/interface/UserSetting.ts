import { Document } from 'mongoose';

export interface UserSetting extends Document {
    selectedUserAccount: String
    selectedTheme: String
    readonly user: String
}