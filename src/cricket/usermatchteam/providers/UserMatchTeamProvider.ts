import { Connection } from 'mongoose';
import { UserMatchTeamSchema } from '../model/UserMatchTeamSchema';

export const UserMatchTeamProvider = [
    {
        provide: 'UserMatchTeamModelToken',
        useFactory: (connection: Connection) => connection.model('UserMatchTeam', UserMatchTeamSchema),
        inject: ['DbConnectionToken'],
    },
];