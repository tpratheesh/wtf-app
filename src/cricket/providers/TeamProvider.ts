import { Connection } from 'mongoose';
import { TeamSchema } from '../model/TeamSchema';

export const TeamProvider = [
    {
        provide: 'TeamModelToken',
        useFactory: (connection: Connection) => connection.model('Team', TeamSchema),
        inject: ['DbConnectionToken'],
    },
];