import { Connection } from 'mongoose';
import { UserSettingSchema } from '../model/UserSettingSchema';

export const UserSettingProvider = [
    {
        provide: 'UserSettingModelToken',
        useFactory: (connection: Connection) => connection.model('UserSetting', UserSettingSchema),
        inject: ['DbConnectionToken'],
    },
];