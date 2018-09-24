import { Connection } from 'mongoose';
import { MatchSchema } from '../model/MatchSchema';

export const MatchProvider = [
    {
        provide: 'MatchModelToken',
        useFactory: (connection: Connection) => connection.model('Match', MatchSchema),
        inject: ['DbConnectionToken'],
    },
];