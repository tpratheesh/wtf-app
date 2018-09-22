import { Connection } from 'mongoose';
import { UserSchema } from '../model/UserSchema';

export const UserProvider = [
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DbConnectionToken'],
    },
];