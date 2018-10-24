import { Connection } from 'mongoose';
import { PlayerInningsSchema } from '../model/PlayerInningsSchema';

export const PlayerInningsProvider = [
    {
        provide: 'PlayerInningsModelToken',
        useFactory: (connection: Connection) => connection.model('PlayerInnings', PlayerInningsSchema),
        inject: ['DbConnectionToken'],
    },
];