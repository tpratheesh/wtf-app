import { Connection } from 'mongoose';
import { UserAccountSchema } from '../model/UserAccountSchema';

export const UserAccountProvider = [
    {
        provide: 'UserAccountModelToken',
        useFactory: (connection: Connection) => connection.model('UserAccount', UserAccountSchema),
        inject: ['DbConnectionToken'],
    },
];